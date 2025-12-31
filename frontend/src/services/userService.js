// 로컬 스토리지를 사용한 간단한 사용자 관리 서비스
const STORAGE_KEY = 'pitchpulse_users'
const CURRENT_USER_KEY = 'pitchpulse_current_user'

export const userService = {
  // 회원가입
  register: (username, email, password) => {
    const users = userService.getAllUsers()
    
    // 중복 체크
    if (users.find(u => u.email === email)) {
      throw new Error('이미 존재하는 이메일입니다.')
    }
    if (users.find(u => u.username === username)) {
      throw new Error('이미 존재하는 사용자명입니다.')
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // 실제로는 해시화해야 함
      favoriteTeams: [],
      notifications: {
        matchStart: false,
        matchEnd: false,
        goal: false
      },
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    return newUser
  },

  // 로그인
  login: (email, password) => {
    const users = userService.getAllUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  // 현재 사용자 가져오기
  getCurrentUser: () => {
    const userStr = localStorage.getItem(CURRENT_USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  // 모든 사용자 가져오기
  getAllUsers: () => {
    const usersStr = localStorage.getItem(STORAGE_KEY)
    return usersStr ? JSON.parse(usersStr) : []
  },

  // 사용자 업데이트
  updateUser: (userId, updates) => {
    const users = userService.getAllUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('사용자를 찾을 수 없습니다.')
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    
    // 현재 사용자도 업데이트
    const currentUser = userService.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]))
    }

    return users[userIndex]
  },

  // 관심팀 추가/제거
  toggleFavoriteTeam: (teamId, teamName, teamLogo) => {
    const currentUser = userService.getCurrentUser()
    if (!currentUser) {
      throw new Error('로그인이 필요합니다.')
    }

    const favoriteTeams = currentUser.favoriteTeams || []
    const teamIndex = favoriteTeams.findIndex(t => t.id === teamId)

    let updatedTeams
    if (teamIndex === -1) {
      // 추가
      updatedTeams = [...favoriteTeams, { id: teamId, name: teamName, logo: teamLogo }]
    } else {
      // 제거
      updatedTeams = favoriteTeams.filter(t => t.id !== teamId)
    }

    return userService.updateUser(currentUser.id, { favoriteTeams: updatedTeams })
  },

  // 알림 설정 업데이트
  updateNotifications: (notifications) => {
    const currentUser = userService.getCurrentUser()
    if (!currentUser) {
      throw new Error('로그인이 필요합니다.')
    }

    return userService.updateUser(currentUser.id, {
      notifications: { ...currentUser.notifications, ...notifications }
    })
  }
}

