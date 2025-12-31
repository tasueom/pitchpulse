import { fetchJson } from './http'

/**
 * 모든 리그 목록 조회
 * @returns {Promise<Array>} 리그 목록
 */
export const getLeagues = async () => {
  return fetchJson('/api/leagues')
}

/**
 * 특정 리그 홈 데이터 조회 (순위표, 최근 경기, 팀 폼)
 * @param {number} leagueId - 리그 ID
 * @returns {Promise<Object>} { standings, recentFixtures, teamForms, currentSeason }
 */
export const getLeagueHome = async (leagueId) => {
  return fetchJson(`/api/leagues/${leagueId}/home`)
}

