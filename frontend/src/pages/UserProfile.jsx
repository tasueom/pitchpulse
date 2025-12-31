import React, { useState, useEffect } from 'react'
import { userService } from '../services/userService'
// import { apiService } from '../services/api' // API 비활성화 - 모킹 데이터 사용
import './UserProfile.css'

const UserProfile = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const currentUser = userService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setIsLogin(true)
    }
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const newUser = userService.register(
        formData.username,
        formData.email,
        formData.password
      )
      setUser(newUser)
      setIsLogin(true)
      setShowRegister(false)
      setSuccess('회원가입이 완료되었습니다!')
      setFormData({ username: '', email: '', password: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const loggedInUser = userService.login(loginData.email, loginData.password)
      setUser(loggedInUser)
      setIsLogin(true)
      setSuccess('로그인되었습니다!')
      setLoginData({ email: '', password: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    userService.logout()
    setUser(null)
    setIsLogin(false)
    setSuccess('로그아웃되었습니다.')
  }

  const handleToggleFavoriteTeam = async (teamId, teamName, teamLogo) => {
    try {
      const updatedUser = userService.toggleFavoriteTeam(teamId, teamName, teamLogo)
      setUser(updatedUser)
      setSuccess('관심팀이 업데이트되었습니다.')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleNotificationChange = (type, value) => {
    try {
      const updatedUser = userService.updateNotifications({ [type]: value })
      setUser(updatedUser)
      setSuccess('알림 설정이 업데이트되었습니다.')
    } catch (err) {
      setError(err.message)
    }
  }

  // EPL 팀 목록 가져오기 (모킹 데이터)
  const [eplTeams, setEplTeams] = useState([])
  useEffect(() => {
    if (isLogin) {
      // 모킹 데이터 사용 (API 비활성화)
      const mockTeams = [
        { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
        { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
        { id: 49, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
        { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
        { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' }
      ]
      setEplTeams(mockTeams)
    }
  }, [isLogin])

  if (!isLogin) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <h1 className="page-title">로그인 / 회원가입</h1>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {!showRegister ? (
            <div className="auth-form">
              <h2>로그인</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">로그인</button>
              </form>
              <p className="switch-form">
                계정이 없으신가요?{' '}
                <button onClick={() => setShowRegister(true)} className="link-button">
                  회원가입
                </button>
              </p>
            </div>
          ) : (
            <div className="auth-form">
              <h2>회원가입</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>사용자명</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>비밀번호 확인</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">회원가입</button>
              </form>
              <p className="switch-form">
                이미 계정이 있으신가요?{' '}
                <button onClick={() => setShowRegister(false)} className="link-button">
                  로그인
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <h1 className="page-title">내 프로필</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* 사용자 정보 */}
        <section className="profile-section">
          <h2>사용자 정보</h2>
          <div className="user-info">
            <p><strong>사용자명:</strong> {user.username}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <button onClick={handleLogout} className="btn-secondary">로그아웃</button>
          </div>
        </section>

        {/* 관심팀 설정 */}
        <section className="profile-section">
          <h2>관심팀 설정</h2>
          <div className="favorite-teams">
            {user.favoriteTeams && user.favoriteTeams.length > 0 ? (
              <div className="favorite-teams-list">
                {user.favoriteTeams.map(team => (
                  <div key={team.id} className="favorite-team-item">
                    <img src={team.logo} alt={team.name} className="team-logo-small" />
                    <span>{team.name}</span>
                    <button
                      onClick={() => handleToggleFavoriteTeam(team.id, team.name, team.logo)}
                      className="btn-remove"
                    >
                      제거
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">관심팀이 없습니다.</p>
            )}
          </div>
          <div className="team-selector">
            <h3>팀 추가</h3>
            <div className="teams-grid">
              {eplTeams.map(team => {
                const isFavorite = user.favoriteTeams?.some(t => t.id === team.id)
                return (
                  <button
                    key={team.id}
                    onClick={() => handleToggleFavoriteTeam(team.id, team.name, team.logo)}
                    className={`team-card ${isFavorite ? 'favorite' : ''}`}
                  >
                    <img src={team.logo} alt={team.name} className="team-logo-small" />
                    <span>{team.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 알림 설정 */}
        <section className="profile-section">
          <h2>알림 설정</h2>
          <div className="notifications">
            <div className="notification-item">
              <label>
                <input
                  type="checkbox"
                  checked={user.notifications?.matchStart || false}
                  onChange={(e) => handleNotificationChange('matchStart', e.target.checked)}
                />
                관심팀 경기 시작 알림
              </label>
            </div>
            <div className="notification-item">
              <label>
                <input
                  type="checkbox"
                  checked={user.notifications?.matchEnd || false}
                  onChange={(e) => handleNotificationChange('matchEnd', e.target.checked)}
                />
                관심팀 경기 종료 알림
              </label>
            </div>
            <div className="notification-item">
              <label>
                <input
                  type="checkbox"
                  checked={user.notifications?.goal || false}
                  onChange={(e) => handleNotificationChange('goal', e.target.checked)}
                />
                관심팀 득점 알림
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserProfile

