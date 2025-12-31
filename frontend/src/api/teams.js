import { fetchJson } from './http'

/**
 * 팀 상세 정보 조회
 * @param {number} teamId - 팀 ID
 * @returns {Promise<Object>} 팀 정보, 통계, 최근 경기, 부상/결장 정보
 */
export const getTeamDetail = async (teamId) => {
  return fetchJson(`/api/teams/${teamId}`)
}

/**
 * 팀 목록 조회
 * @param {number} leagueId - 리그 ID (선택사항)
 * @returns {Promise<Array>} 팀 목록
 */
export const getTeams = async (leagueId = null) => {
  const url = leagueId 
    ? `/api/teams?leagueId=${leagueId}`
    : '/api/teams'
  return fetchJson(url)
}

/**
 * 팀 랭킹 조회
 * @param {number} leagueId - 리그 ID
 * @returns {Promise<Array>} 팀 랭킹 목록
 */
export const getTeamRankings = async (leagueId) => {
  return fetchJson(`/api/rankings/teams?leagueId=${leagueId}`)
}

/**
 * 선수 랭킹 조회
 * @param {number} leagueId - 리그 ID
 * @returns {Promise<Array>} 선수 랭킹 목록
 */
export const getPlayerRankings = async (leagueId) => {
  return fetchJson(`/api/rankings/players?leagueId=${leagueId}`)
}

