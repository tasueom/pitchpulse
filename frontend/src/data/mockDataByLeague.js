// 리그별 모킹 데이터

// EPL (39) - 완전한 데이터 (상위 5개 팀만)
export const mockEPLStandings = [
  {
    rank: 1,
    team: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    points: 45,
    goalsDiff: 29,
    all: { played: 20, win: 14, draw: 3, lose: 3 }
  },
  {
    rank: 2,
    team: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    points: 43,
    goalsDiff: 25,
    all: { played: 20, win: 13, draw: 4, lose: 3 }
  },
  {
    rank: 3,
    team: { id: 49, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
    points: 39,
    goalsDiff: 18,
    all: { played: 20, win: 11, draw: 6, lose: 3 }
  },
  {
    rank: 4,
    team: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    points: 38,
    goalsDiff: 15,
    all: { played: 20, win: 11, draw: 5, lose: 4 }
  },
  {
    rank: 5,
    team: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
    points: 35,
    goalsDiff: 8,
    all: { played: 20, win: 10, draw: 5, lose: 5 }
  }
]

export const mockEPLFixtures = [
  {
    fixture: {
      id: 1035120,
      date: '2025-01-15T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 21' },
    teams: {
      home: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
      away: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' }
    },
    goals: { home: 2, away: 1 }
  },
  {
    fixture: {
      id: 1035121,
      date: '2025-01-14T15:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 21' },
    teams: {
      home: { id: 49, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
      away: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' }
    },
    goals: { home: 1, away: 1 }
  },
  {
    fixture: {
      id: 1035122,
      date: '2025-01-13T17:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 20' },
    teams: {
      home: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
      away: { id: 47, name: 'Tottenham', logo: 'https://media.api-sports.io/football/teams/47.png' }
    },
    goals: { home: 3, away: 2 }
  },
  {
    fixture: {
      id: 1035123,
      date: '2025-01-12T15:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 20' },
    teams: {
      home: { id: 51, name: 'Brighton', logo: 'https://media.api-sports.io/football/teams/51.png' },
      away: { id: 34, name: 'Newcastle', logo: 'https://media.api-sports.io/football/teams/34.png' }
    },
    goals: { home: 2, away: 0 }
  },
  {
    fixture: {
      id: 1035124,
      date: '2025-01-11T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 20' },
    teams: {
      home: { id: 48, name: 'West Ham', logo: 'https://media.api-sports.io/football/teams/48.png' },
      away: { id: 36, name: 'Fulham', logo: 'https://media.api-sports.io/football/teams/36.png' }
    },
    goals: { home: 1, away: 1 }
  }
]

export const mockEPLTeamForms = {
  42: ['W', 'W', 'D', 'W', 'L'], // Arsenal
  50: ['W', 'D', 'W', 'W', 'W'], // Man City
  49: ['D', 'W', 'L', 'W', 'D'], // Chelsea
  40: ['W', 'W', 'D', 'L', 'W'], // Liverpool
  33: ['W', 'L', 'W', 'D', 'W']  // Man United
}

// 라리가 (140) - 완전한 데이터 (상위 5개 팀만)
export const mockLaLigaStandings = [
  {
    rank: 1,
    team: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
    points: 48,
    goalsDiff: 32,
    all: { played: 20, win: 15, draw: 3, lose: 2 }
  },
  {
    rank: 2,
    team: { id: 529, name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
    points: 44,
    goalsDiff: 28,
    all: { played: 20, win: 13, draw: 5, lose: 2 }
  },
  {
    rank: 3,
    team: { id: 530, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png' },
    points: 40,
    goalsDiff: 18,
    all: { played: 20, win: 12, draw: 4, lose: 4 }
  },
  {
    rank: 4,
    team: { id: 532, name: 'Valencia', logo: 'https://media.api-sports.io/football/teams/532.png' },
    points: 36,
    goalsDiff: 12,
    all: { played: 20, win: 10, draw: 6, lose: 4 }
  },
  {
    rank: 5,
    team: { id: 536, name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png' },
    points: 34,
    goalsDiff: 8,
    all: { played: 20, win: 9, draw: 7, lose: 4 }
  }
]

export const mockLaLigaFixtures = [
  {
    fixture: {
      id: 1035200,
      date: '2025-01-14T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 20' },
    teams: {
      home: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
      away: { id: 529, name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' }
    },
    goals: { home: 3, away: 2 }
  },
  {
    fixture: {
      id: 1035201,
      date: '2025-01-13T18:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 20' },
    teams: {
      home: { id: 530, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png' },
      away: { id: 536, name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png' }
    },
    goals: { home: 2, away: 0 }
  },
  {
    fixture: {
      id: 1035202,
      date: '2025-01-12T16:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 532, name: 'Valencia', logo: 'https://media.api-sports.io/football/teams/532.png' },
      away: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' }
    },
    goals: { home: 1, away: 1 }
  },
  {
    fixture: {
      id: 1035203,
      date: '2025-01-11T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 529, name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
      away: { id: 530, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png' }
    },
    goals: { home: 2, away: 1 }
  },
  {
    fixture: {
      id: 1035204,
      date: '2025-01-10T18:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 536, name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png' },
      away: { id: 532, name: 'Valencia', logo: 'https://media.api-sports.io/football/teams/532.png' }
    },
    goals: { home: 0, away: 0 }
  }
]

export const mockLaLigaTeamForms = {
  541: ['W', 'W', 'W', 'D', 'W'], // Real Madrid
  529: ['W', 'D', 'W', 'W', 'D'], // Barcelona
  530: ['W', 'W', 'D', 'L', 'W'], // Atletico Madrid
  532: ['D', 'W', 'L', 'W', 'D'], // Valencia
  536: ['W', 'D', 'D', 'W', 'L']  // Sevilla
}

// 분데스리가 (78) - 완전한 데이터 (상위 5개 팀만)
export const mockBundesligaStandings = [
  {
    rank: 1,
    team: { id: 157, name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
    points: 46,
    goalsDiff: 35,
    all: { played: 18, win: 14, draw: 4, lose: 0 }
  },
  {
    rank: 2,
    team: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
    points: 38,
    goalsDiff: 22,
    all: { played: 18, win: 11, draw: 5, lose: 2 }
  },
  {
    rank: 3,
    team: { id: 173, name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png' },
    points: 35,
    goalsDiff: 18,
    all: { played: 18, win: 10, draw: 5, lose: 3 }
  },
  {
    rank: 4,
    team: { id: 168, name: 'Bayer Leverkusen', logo: 'https://media.api-sports.io/football/teams/168.png' },
    points: 33,
    goalsDiff: 15,
    all: { played: 18, win: 9, draw: 6, lose: 3 }
  },
  {
    rank: 5,
    team: { id: 172, name: 'Eintracht Frankfurt', logo: 'https://media.api-sports.io/football/teams/172.png' },
    points: 30,
    goalsDiff: 8,
    all: { played: 18, win: 8, draw: 6, lose: 4 }
  }
]

export const mockBundesligaFixtures = [
  {
    fixture: {
      id: 1035300,
      date: '2025-01-13T17:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 17' },
    teams: {
      home: { id: 157, name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
      away: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' }
    },
    goals: { home: 4, away: 1 }
  },
  {
    fixture: {
      id: 1035301,
      date: '2025-01-12T15:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 17' },
    teams: {
      home: { id: 173, name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png' },
      away: { id: 168, name: 'Bayer Leverkusen', logo: 'https://media.api-sports.io/football/teams/168.png' }
    },
    goals: { home: 2, away: 2 }
  },
  {
    fixture: {
      id: 1035302,
      date: '2025-01-11T14:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 16' },
    teams: {
      home: { id: 172, name: 'Eintracht Frankfurt', logo: 'https://media.api-sports.io/football/teams/172.png' },
      away: { id: 157, name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' }
    },
    goals: { home: 3, away: 1 }
  },
  {
    fixture: {
      id: 1035303,
      date: '2025-01-10T19:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 16' },
    teams: {
      home: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
      away: { id: 173, name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png' }
    },
    goals: { home: 1, away: 0 }
  },
  {
    fixture: {
      id: 1035304,
      date: '2025-01-09T16:30:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 16' },
    teams: {
      home: { id: 168, name: 'Bayer Leverkusen', logo: 'https://media.api-sports.io/football/teams/168.png' },
      away: { id: 172, name: 'Eintracht Frankfurt', logo: 'https://media.api-sports.io/football/teams/172.png' }
    },
    goals: { home: 2, away: 2 }
  }
]

export const mockBundesligaTeamForms = {
  157: ['W', 'W', 'W', 'D', 'W'], // Bayern Munich
  165: ['W', 'D', 'W', 'W', 'D'], // Borussia Dortmund
  173: ['W', 'W', 'D', 'L', 'W'], // RB Leipzig
  168: ['D', 'W', 'D', 'W', 'D'], // Bayer Leverkusen
  172: ['W', 'L', 'W', 'D', 'W']  // Eintracht Frankfurt
}

// 세리에A (135) - 완전한 데이터 (상위 5개 팀만)
export const mockSerieAStandings = [
  {
    rank: 1,
    team: { id: 108, name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/108.png' },
    points: 47,
    goalsDiff: 30,
    all: { played: 19, win: 14, draw: 5, lose: 0 }
  },
  {
    rank: 2,
    team: { id: 98, name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/98.png' },
    points: 42,
    goalsDiff: 24,
    all: { played: 19, win: 13, draw: 3, lose: 3 }
  },
  {
    rank: 3,
    team: { id: 109, name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/109.png' },
    points: 40,
    goalsDiff: 20,
    all: { played: 19, win: 12, draw: 4, lose: 3 }
  },
  {
    rank: 4,
    team: { id: 113, name: 'Napoli', logo: 'https://media.api-sports.io/football/teams/113.png' },
    points: 36,
    goalsDiff: 15,
    all: { played: 19, win: 10, draw: 6, lose: 3 }
  },
  {
    rank: 5,
    team: { id: 100, name: 'Roma', logo: 'https://media.api-sports.io/football/teams/100.png' },
    points: 34,
    goalsDiff: 12,
    all: { played: 19, win: 10, draw: 4, lose: 5 }
  }
]

export const mockSerieAFixtures = [
  {
    fixture: {
      id: 1035400,
      date: '2025-01-14T20:45:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 108, name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/108.png' },
      away: { id: 98, name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/98.png' }
    },
    goals: { home: 2, away: 1 }
  },
  {
    fixture: {
      id: 1035401,
      date: '2025-01-13T18:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 109, name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/109.png' },
      away: { id: 113, name: 'Napoli', logo: 'https://media.api-sports.io/football/teams/113.png' }
    },
    goals: { home: 3, away: 2 }
  },
  {
    fixture: {
      id: 1035402,
      date: '2025-01-12T15:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 100, name: 'Roma', logo: 'https://media.api-sports.io/football/teams/100.png' },
      away: { id: 108, name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/108.png' }
    },
    goals: { home: 1, away: 0 }
  },
  {
    fixture: {
      id: 1035403,
      date: '2025-01-11T20:45:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 98, name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/98.png' },
      away: { id: 109, name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/109.png' }
    },
    goals: { home: 2, away: 2 }
  },
  {
    fixture: {
      id: 1035404,
      date: '2025-01-10T18:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 113, name: 'Napoli', logo: 'https://media.api-sports.io/football/teams/113.png' },
      away: { id: 100, name: 'Roma', logo: 'https://media.api-sports.io/football/teams/100.png' }
    },
    goals: { home: 1, away: 1 }
  }
]

export const mockSerieATeamForms = {
  108: ['W', 'W', 'D', 'W', 'W'], // Inter Milan
  98: ['W', 'D', 'W', 'W', 'L'], // AC Milan
  109: ['W', 'W', 'D', 'L', 'W'], // Juventus
  113: ['D', 'W', 'W', 'D', 'W'], // Napoli
  100: ['W', 'L', 'W', 'D', 'W']  // Roma
}

// 리그앙 (61) - 완전한 데이터 (상위 5개 팀만)
export const mockLigue1Standings = [
  {
    rank: 1,
    team: { id: 85, name: 'Paris Saint Germain', logo: 'https://media.api-sports.io/football/teams/85.png' },
    points: 45,
    goalsDiff: 28,
    all: { played: 19, win: 13, draw: 6, lose: 0 }
  },
  {
    rank: 2,
    team: { id: 81, name: 'Marseille', logo: 'https://media.api-sports.io/football/teams/81.png' },
    points: 40,
    goalsDiff: 22,
    all: { played: 19, win: 12, draw: 4, lose: 3 }
  },
  {
    rank: 3,
    team: { id: 91, name: 'Monaco', logo: 'https://media.api-sports.io/football/teams/91.png' },
    points: 38,
    goalsDiff: 18,
    all: { played: 19, win: 11, draw: 5, lose: 3 }
  },
  {
    rank: 4,
    team: { id: 80, name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png' },
    points: 35,
    goalsDiff: 15,
    all: { played: 19, win: 10, draw: 5, lose: 4 }
  },
  {
    rank: 5,
    team: { id: 79, name: 'Lille', logo: 'https://media.api-sports.io/football/teams/79.png' },
    points: 33,
    goalsDiff: 12,
    all: { played: 19, win: 9, draw: 6, lose: 4 }
  }
]

export const mockLigue1Fixtures = [
  {
    fixture: {
      id: 1035500,
      date: '2025-01-14T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 85, name: 'Paris Saint Germain', logo: 'https://media.api-sports.io/football/teams/85.png' },
      away: { id: 81, name: 'Marseille', logo: 'https://media.api-sports.io/football/teams/81.png' }
    },
    goals: { home: 3, away: 1 }
  },
  {
    fixture: {
      id: 1035501,
      date: '2025-01-13T17:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 19' },
    teams: {
      home: { id: 91, name: 'Monaco', logo: 'https://media.api-sports.io/football/teams/91.png' },
      away: { id: 80, name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png' }
    },
    goals: { home: 2, away: 2 }
  },
  {
    fixture: {
      id: 1035502,
      date: '2025-01-12T20:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 79, name: 'Lille', logo: 'https://media.api-sports.io/football/teams/79.png' },
      away: { id: 85, name: 'Paris Saint Germain', logo: 'https://media.api-sports.io/football/teams/85.png' }
    },
    goals: { home: 1, away: 0 }
  },
  {
    fixture: {
      id: 1035503,
      date: '2025-01-11T19:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 81, name: 'Marseille', logo: 'https://media.api-sports.io/football/teams/81.png' },
      away: { id: 91, name: 'Monaco', logo: 'https://media.api-sports.io/football/teams/91.png' }
    },
    goals: { home: 2, away: 1 }
  },
  {
    fixture: {
      id: 1035504,
      date: '2025-01-10T17:00:00+00:00',
      status: { short: 'FT', long: 'Match Finished' }
    },
    league: { round: 'Regular Season - 18' },
    teams: {
      home: { id: 80, name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png' },
      away: { id: 79, name: 'Lille', logo: 'https://media.api-sports.io/football/teams/79.png' }
    },
    goals: { home: 0, away: 0 }
  }
]

export const mockLigue1TeamForms = {
  85: ['W', 'W', 'D', 'W', 'W'], // PSG
  81: ['W', 'D', 'W', 'W', 'L'], // Marseille
  91: ['W', 'W', 'D', 'L', 'W'], // Monaco
  80: ['D', 'W', 'W', 'D', 'W'], // Lyon
  79: ['W', 'L', 'W', 'D', 'W']  // Lille
}

// 리그별 모킹 데이터 매핑 함수
export const getMockStandings = (leagueId) => {
  switch(leagueId) {
    case 39: return mockEPLStandings
    case 140: return mockLaLigaStandings
    case 78: return mockBundesligaStandings
    case 135: return mockSerieAStandings
    case 61: return mockLigue1Standings
    default: return mockEPLStandings
  }
}

export const getMockFixtures = (leagueId) => {
  switch(leagueId) {
    case 39: return mockEPLFixtures
    case 140: return mockLaLigaFixtures
    case 78: return mockBundesligaFixtures
    case 135: return mockSerieAFixtures
    case 61: return mockLigue1Fixtures
    default: return mockEPLFixtures
  }
}

export const getMockTeamForms = (leagueId) => {
  switch(leagueId) {
    case 39: return mockEPLTeamForms
    case 140: return mockLaLigaTeamForms
    case 78: return mockBundesligaTeamForms
    case 135: return mockSerieATeamForms
    case 61: return mockLigue1TeamForms
    default: return mockEPLTeamForms
  }
}
