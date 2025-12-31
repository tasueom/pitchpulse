// API-Football 설정
// 사용 전에 https://dashboard.api-football.com 에서 API 키를 발급받아야 합니다
export const API_CONFIG = {
  BASE_URL: 'https://v3.football.api-sports.io',
  
  API_KEY: import.meta.env.VITE_API_FOOTBALL_KEY,
  // EPL 리그 ID
  EPL_LEAGUE_ID: 39,
  // 시즌 (현재 시즌) - 2023-24 시즌
  CURRENT_SEASON: 2023
}

// API 헤더
export const getApiHeaders = () => ({
  'x-rapidapi-key': API_CONFIG.API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io'
})

