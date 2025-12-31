/**
 * 공통 HTTP 유틸리티 함수
 * alert 금지, 에러는 그냥 throw
 */

/**
 * JSON 응답을 받는 fetch 래퍼
 * @param {string} url - 요청 URL (상대 경로 '/api/...')
 * @param {RequestInit} options - fetch 옵션
 * @returns {Promise<any>} JSON 응답 데이터
 * @throws {Error} 에러 객체
 */
export const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    // HTTP 에러 상태 체크 (401 포함 모든 에러는 그냥 throw)
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
      error.status = response.status
      throw error
    }

    // JSON 파싱
    try {
      return await response.json()
    } catch (err) {
      throw new Error('응답을 파싱할 수 없습니다.')
    }
  } catch (error) {
    // 네트워크 에러 처리 (브라우저 기본 alert 방지)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new Error('API 서버에 연결할 수 없습니다.')
      networkError.isNetworkError = true
      throw networkError
    }
    // 기타 에러는 그대로 throw
    throw error
  }
}

