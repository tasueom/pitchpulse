import axios from 'axios'
import { API_CONFIG, getApiHeaders } from '../config/api'

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: getApiHeaders()
})

// 요청 인터셉터 - 디버깅용
apiClient.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url, config.params)
    return config
  },
  (error) => {
    console.error('API 요청 에러:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.config.url, response.data)
    // API-Football은 에러도 200으로 반환하므로 여기서 체크
    if (response.data.errors && Object.keys(response.data.errors).length > 0) {
      console.error('API 에러 객체:', response.data.errors)
      
      // errors가 객체인 경우 - 플랜 제한 등
      if (typeof response.data.errors === 'object') {
        const errorKeys = Object.keys(response.data.errors)
        const errorValues = Object.values(response.data.errors)
        
        // 플랜 관련 에러인 경우 특별 처리
        if (errorKeys.includes('plan') || errorKeys.includes('rateLimit')) {
          console.warn('API 플랜 제한:', response.data.errors)
          // 플랜 제한 에러는 예외를 던지지 않고 빈 결과 반환
          // (호출하는 쪽에서 빈 배열로 처리)
          return {
            ...response,
            data: {
              ...response.data,
              response: [],
              results: 0
            }
          }
        }
        
        // 다른 에러는 예외 던지기
        const errorMsg = errorValues.length > 0 
          ? errorValues.join(', ')
          : errorKeys.join(', ')
        throw new Error(`API 에러: ${errorMsg}`)
      }
    }
    // results가 0인 경우도 확인
    if (response.data.results === 0 && (!response.data.response || response.data.response.length === 0)) {
      console.warn('API 응답에 데이터가 없습니다:', {
        url: response.config.url,
        params: response.config.params,
        results: response.data.results
      })
    }
    return response
  },
  (error) => {
    console.error('API 응답 에러:', error.response?.data || error.message)
    if (error.response?.status === 401) {
      throw new Error('API 키가 유효하지 않습니다. API 키를 확인해주세요.')
    } else if (error.response?.status === 429) {
      throw new Error('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
    } else if (error.response?.status === 404) {
      throw new Error('요청한 데이터를 찾을 수 없습니다.')
    }
    throw new Error(error.response?.data?.message || error.message || 'API 호출 중 오류가 발생했습니다.')
  }
)

// 현재 시즌 자동 계산 (8월~5월이 한 시즌)
const getCurrentSeason = () => {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const year = now.getFullYear()
  // 8월 이후면 현재 연도가 시즌 시작, 그 전이면 전년도가 시즌 시작
  // 예: 2025년 1월 = 2024-25 시즌 (2024), 2025년 8월 = 2025-26 시즌 (2025)
  const calculatedSeason = month >= 8 ? year : year - 1
  console.log(`현재 날짜: ${year}년 ${month}월, 계산된 시즌: ${calculatedSeason}`)
  return calculatedSeason
}

// 리그의 사용 가능한 시즌 가져오기
const getAvailableSeasons = async (leagueId = API_CONFIG.EPL_LEAGUE_ID) => {
  try {
    const response = await apiClient.get('/leagues', {
      params: { id: leagueId }
    })
    console.log('리그 정보 응답:', response.data)
    if (response.data.response && response.data.response.length > 0) {
      const league = response.data.response[0]
      console.log('리그 데이터:', league)
      const seasons = league.seasons || []
      console.log('사용 가능한 시즌:', seasons)
      if (seasons.length > 0) {
        // 최신 시즌부터 정렬
        const seasonYears = seasons.sort((a, b) => b.year - a.year).map(s => s.year)
        console.log('시즌 연도 목록:', seasonYears)
        return seasonYears
      }
    }
  } catch (err) {
    console.warn('시즌 정보 가져오기 실패:', err)
  }
  return []
}

// API 호출 함수들
export const apiService = {
  // 현재 시즌 가져오기
  getCurrentSeason: getCurrentSeason,
  
  // 사용 가능한 시즌 목록 가져오기
  getAvailableSeasons: getAvailableSeasons,

  // 리그 순위표 (시즌 자동 감지)
  getStandings: async (leagueId = API_CONFIG.EPL_LEAGUE_ID, season = null) => {
    try {
      // 시즌이 지정되지 않았으면 현재 시즌 사용
      if (!season) {
        season = getCurrentSeason()
        console.log(`현재 시즌 ${season} 사용`)
      }
      
      // 먼저 현재 시즌으로 시도
      console.log(`순위표 요청: 리그 ${leagueId}, 시즌 ${season}`)
      let response = await apiClient.get('/standings', {
        params: { league: leagueId, season }
      })
      
      // 현재 시즌에 데이터가 없으면 사용 가능한 시즌 목록 확인
      if (!response.data.response || response.data.response.length === 0 || 
          response.data.errors || response.data.results === 0) {
        console.log(`시즌 ${season} 데이터 없음, 사용 가능한 시즌 확인 중...`)
        const availableSeasons = await getAvailableSeasons(leagueId)
        
        if (availableSeasons.length > 0) {
          // 사용 가능한 최신 시즌 사용
          season = availableSeasons[0]
          console.log(`사용 가능한 최신 시즌 ${season}으로 재시도`)
          response = await apiClient.get('/standings', {
            params: { league: leagueId, season }
          })
        }
      }
      
      console.log('순위표 응답 구조:', {
        results: response.data?.results,
        hasResponse: !!response.data?.response,
        responseLength: response.data?.response?.length,
        errors: response.data?.errors,
        firstItem: response.data?.response?.[0],
        standings: response.data?.response?.[0]?.league?.standings
      })
      
      // 응답 구조 확인 및 처리
      if (!response.data || !response.data.response || response.data.response.length === 0) {
        console.warn('순위표 데이터가 비어있습니다:', {
          results: response.data?.results,
          errors: response.data?.errors
        })
        return []
      }
      
      const leagueData = response.data.response[0]
      if (!leagueData || !leagueData.league || !leagueData.league.standings) {
        console.warn('순위표 구조가 예상과 다릅니다:', leagueData)
        return []
      }
      
      const standings = leagueData.league.standings[0] || []
      console.log(`시즌 ${season} 순위표 파싱 결과:`, standings.length, '개 팀')
      return standings
    } catch (err) {
      console.error('순위표 가져오기 실패:', err)
      // 플랜 제한 에러는 빈 배열 반환
      return []
    }
  },

  // 팀별 최근 경기 (폼)
  getTeamFixtures: async (teamId, last = 5) => {
    const response = await apiClient.get('/fixtures', {
      params: { team: teamId, last }
    })
    return response.data.response || []
  },

  // 최근 경기 결과 (시즌 자동 감지)
  getRecentFixtures: async (leagueId = API_CONFIG.EPL_LEAGUE_ID, last = 10) => {
    try {
      // 현재 시즌 사용
      let season = getCurrentSeason()
      console.log(`최근 경기 요청: 리그 ${leagueId}, 시즌 ${season}`)
      
      // 먼저 현재 시즌으로 시도
      let response = await apiClient.get('/fixtures', {
        params: { league: leagueId, last, season }
      })
      
      console.log('최근 경기 응답:', {
        results: response.data?.results,
        hasResponse: !!response.data?.response,
        responseLength: response.data?.response?.length,
        errors: response.data?.errors,
        parameters: response.data?.parameters,
        firstFixture: response.data?.response?.[0]
      })
      
      // 현재 시즌에 데이터가 없으면 사용 가능한 시즌 확인
      if (!response.data.response || response.data.response.length === 0 || 
          response.data.errors || response.data.results === 0) {
        console.log(`시즌 ${season} 데이터 없음, 사용 가능한 시즌 확인 중...`)
        const availableSeasons = await getAvailableSeasons(leagueId)
        
        if (availableSeasons.length > 0) {
          season = availableSeasons[0]
          console.log(`사용 가능한 최신 시즌 ${season}으로 재시도`)
          response = await apiClient.get('/fixtures', {
            params: { league: leagueId, last, season }
          })
        } else {
          // 시즌 목록도 없으면 시즌 필터 없이 시도
          console.log('시즌 필터 없이 최근 경기 가져오기')
          response = await apiClient.get('/fixtures', {
            params: { league: leagueId, last }
          })
        }
        
        console.log('재시도 응답:', {
          results: response.data?.results,
          hasResponse: !!response.data?.response,
          responseLength: response.data?.response?.length,
          errors: response.data?.errors
        })
      }
      
      const fixtures = response.data.response || []
      console.log('최근 경기 파싱 결과:', fixtures.length, '개 경기')
      
      if (fixtures.length === 0 && response.data.errors) {
        console.warn('경기 데이터가 없고 에러가 있습니다:', response.data.errors)
      }
      
      return fixtures
    } catch (err) {
      console.error('최근 경기 가져오기 실패:', err)
      return []
    }
  },

  // 라이브 경기
  getLiveFixtures: async () => {
    const response = await apiClient.get('/fixtures', {
      params: { live: 'all' }
    })
    return response.data.response || []
  },

  // 경기 상세 정보
  getFixtureDetails: async (fixtureId) => {
    const response = await apiClient.get('/fixtures', {
      params: { id: fixtureId }
    })
    return response.data.response[0] || null
  },

  // 경기 이벤트
  getFixtureEvents: async (fixtureId) => {
    const response = await apiClient.get('/fixtures/events', {
      params: { fixture: fixtureId }
    })
    return response.data.response || []
  },

  // 경기 통계
  getFixtureStatistics: async (fixtureId) => {
    const response = await apiClient.get('/fixtures/statistics', {
      params: { fixture: fixtureId }
    })
    return response.data.response || []
  },

  // H2H (맞대결 전적)
  getH2H: async (team1Id, team2Id) => {
    const response = await apiClient.get('/fixtures/headtohead', {
      params: { h2h: `${team1Id}-${team2Id}` }
    })
    return response.data.response || []
  },

  // 부상/결장 정보
  getInjuries: async (fixtureId) => {
    const response = await apiClient.get('/injuries', {
      params: { fixture: fixtureId }
    })
    return response.data.response || []
  },

  // 팀 정보
  getTeamInfo: async (teamId) => {
    const response = await apiClient.get('/teams', {
      params: { id: teamId }
    })
    return response.data.response[0] || null
  },

  // 팀 통계 (시즌 자동 감지)
  getTeamStatistics: async (teamId, leagueId = API_CONFIG.EPL_LEAGUE_ID, season = null) => {
    if (!season) {
      season = getCurrentSeason()
    }
    const response = await apiClient.get('/teams/statistics', {
      params: { team: teamId, league: leagueId, season }
    })
    return response.data.response || null
  },

  // 선수 통계 (시즌 자동 감지)
  getPlayerStatistics: async (playerId, teamId, leagueId = API_CONFIG.EPL_LEAGUE_ID, season = null) => {
    if (!season) {
      season = getCurrentSeason()
    }
    const response = await apiClient.get('/players', {
      params: { id: playerId, team: teamId, league: leagueId, season }
    })
    return response.data.response[0] || null
  },

  // 팀 선수 목록
  getTeamPlayers: async (teamId, season = API_CONFIG.CURRENT_SEASON) => {
    const response = await apiClient.get('/players/squads', {
      params: { team: teamId }
    })
    return response.data.response[0]?.players || []
  },

  // 예정 경기
  getUpcomingFixtures: async (leagueId = API_CONFIG.EPL_LEAGUE_ID, next = 10) => {
    const response = await apiClient.get('/fixtures', {
      params: { league: leagueId, next }
    })
    return response.data.response || []
  }
}

