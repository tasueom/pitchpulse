import { fetchJson } from './http'

/**
 * 라이브 경기 목록 조회
 * @returns {Promise<Array>} 라이브 경기 목록
 */
export const getLiveMatches = async () => {
  return fetchJson('/api/live')
}

/**
 * 최근 경기 목록 조회
 * @param {number} leagueId - 리그 ID (선택사항)
 * @returns {Promise<Array>} 최근 경기 목록
 */
export const getRecentMatches = async (leagueId = null) => {
  const url = leagueId 
    ? `/api/matches/recent?leagueId=${leagueId}`
    : '/api/matches/recent'
  return fetchJson(url)
}

/**
 * 특정 경기의 상세 정보 조회 (이벤트, 통계)
 * @param {number} fixtureId - 경기 ID
 * @returns {Promise<Object>} { fixture, events, statistics }
 */
export const getMatchDetails = async (fixtureId) => {
  return fetchJson(`/api/matches/${fixtureId}`)
}

/**
 * 경기 프리뷰 데이터 조회
 * @param {number} fixtureId - 경기 ID
 * @returns {Promise<Object>} { fixture, h2h, injuries, keyPlayers }
 */
export const getPreviewData = async (fixtureId) => {
  return fetchJson(`/api/preview/${fixtureId}`)
}

