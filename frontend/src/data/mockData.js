// 모킹 데이터 - API 없이 UI 구조 확인용

export const mockStandings = [
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
  },
  {
    rank: 6,
    team: { id: 47, name: 'Tottenham', logo: 'https://media.api-sports.io/football/teams/47.png' },
    points: 33,
    goalsDiff: 5,
    all: { played: 20, win: 9, draw: 6, lose: 5 }
  },
  {
    rank: 7,
    team: { id: 51, name: 'Brighton', logo: 'https://media.api-sports.io/football/teams/51.png' },
    points: 31,
    goalsDiff: 3,
    all: { played: 20, win: 8, draw: 7, lose: 5 }
  },
  {
    rank: 8,
    team: { id: 34, name: 'Newcastle', logo: 'https://media.api-sports.io/football/teams/34.png' },
    points: 29,
    goalsDiff: 1,
    all: { played: 20, win: 8, draw: 5, lose: 7 }
  },
  {
    rank: 9,
    team: { id: 48, name: 'West Ham', logo: 'https://media.api-sports.io/football/teams/48.png' },
    points: 28,
    goalsDiff: -2,
    all: { played: 20, win: 8, draw: 4, lose: 8 }
  },
  {
    rank: 10,
    team: { id: 36, name: 'Fulham', logo: 'https://media.api-sports.io/football/teams/36.png' },
    points: 26,
    goalsDiff: -5,
    all: { played: 20, win: 7, draw: 5, lose: 8 }
  }
]

export const mockRecentFixtures = [
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

export const mockTeamForms = {
  42: ['W', 'W', 'D', 'W', 'L'], // Arsenal
  50: ['W', 'D', 'W', 'W', 'W'], // Man City
  49: ['D', 'W', 'L', 'W', 'D'], // Chelsea
  40: ['W', 'W', 'D', 'L', 'W'], // Liverpool
  33: ['W', 'L', 'W', 'D', 'W'], // Man United
  47: ['D', 'W', 'W', 'L', 'D'], // Tottenham
  51: ['W', 'D', 'D', 'W', 'L'], // Brighton
  34: ['L', 'W', 'D', 'W', 'D'], // Newcastle
  48: ['D', 'L', 'W', 'D', 'L'], // West Ham
  36: ['L', 'D', 'L', 'W', 'D']  // Fulham
}

// 라이브 경기 모킹 데이터
export const mockLiveFixtures = [
  {
    fixture: {
      id: 1035200,
      date: new Date().toISOString(),
      status: { short: 'LIVE', long: 'Second Half', elapsed: 67 }
    },
    league: {
      id: 39,
      name: 'Premier League',
      round: 'Regular Season - 22'
    },
    teams: {
      home: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
      away: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' }
    },
    goals: { home: 2, away: 1 }
  },
  {
    fixture: {
      id: 1035201,
      date: new Date().toISOString(),
      status: { short: 'LIVE', long: 'First Half', elapsed: 34 }
    },
    league: {
      id: 140,
      name: 'La Liga',
      round: 'Regular Season - 20'
    },
    teams: {
      home: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
      away: { id: 529, name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' }
    },
    goals: { home: 1, away: 1 }
  },
  {
    fixture: {
      id: 1035202,
      date: new Date().toISOString(),
      status: { short: 'LIVE', long: 'Second Half', elapsed: 78 }
    },
    league: {
      id: 78,
      name: 'Bundesliga',
      round: 'Regular Season - 17'
    },
    teams: {
      home: { id: 157, name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
      away: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' }
    },
    goals: { home: 3, away: 2 }
  }
]

// 라이브 경기 이벤트 모킹 데이터
export const mockLiveEvents = [
  {
    time: { elapsed: 12, extra: null },
    team: { id: 42, name: 'Arsenal' },
    player: { id: 276, name: 'Bukayo Saka' },
    type: 'Goal',
    detail: 'Normal Goal'
  },
  {
    time: { elapsed: 34, extra: null },
    team: { id: 50, name: 'Manchester City' },
    player: { id: 1840, name: 'Erling Haaland' },
    type: 'Goal',
    detail: 'Normal Goal'
  },
  {
    time: { elapsed: 45, extra: 2 },
    team: { id: 42, name: 'Arsenal' },
    player: { id: 276, name: 'Bukayo Saka' },
    type: 'Card',
    detail: 'Yellow Card'
  },
  {
    time: { elapsed: 58, extra: null },
    team: { id: 42, name: 'Arsenal' },
    player: { id: 277, name: 'Gabriel Martinelli' },
    type: 'Goal',
    detail: 'Normal Goal'
  },
  {
    time: { elapsed: 65, extra: null },
    team: { id: 50, name: 'Manchester City' },
    player: { id: 1840, name: 'Erling Haaland' },
    assist: { id: 1841, name: 'Kevin De Bruyne' },
    type: 'subst',
    detail: 'Substitution'
  }
]

// 라이브 경기 통계 모킹 데이터
export const mockLiveStatistics = [
  {
    team: { id: 42, name: 'Arsenal' },
    statistics: [
      { type: 'Ball Possession', value: '58%' },
      { type: 'Total Shots', value: '14' },
      { type: 'Shots on Goal', value: '7' },
      { type: 'Total passes', value: '487' },
      { type: 'Passes accurate', value: '423' },
      { type: 'Passes %', value: '87%' }
    ]
  },
  {
    team: { id: 50, name: 'Manchester City' },
    statistics: [
      { type: 'Ball Possession', value: '42%' },
      { type: 'Total Shots', value: '9' },
      { type: 'Shots on Goal', value: '4' },
      { type: 'Total passes', value: '352' },
      { type: 'Passes accurate', value: '298' },
      { type: 'Passes %', value: '85%' }
    ]
  }
]

// 팀 랭킹 모킹 데이터
export const mockTeamRankings = [
  {
    team: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    metrics: {
      passes: 12450,
      passAccuracy: 87.5,
      dribbles: 342,
      shots: 289,
      shotsOnGoal: 156,
      goals: 45,
      keyPasses: 198,
      longPasses: 456
    },
    conversionRate: '15.6'
  },
  {
    team: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    metrics: {
      passes: 13200,
      passAccuracy: 89.2,
      dribbles: 398,
      shots: 312,
      shotsOnGoal: 178,
      goals: 52,
      keyPasses: 234,
      longPasses: 512
    },
    conversionRate: '16.7'
  },
  {
    team: { id: 49, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
    metrics: {
      passes: 11800,
      passAccuracy: 85.3,
      dribbles: 312,
      shots: 267,
      shotsOnGoal: 142,
      goals: 38,
      keyPasses: 187,
      longPasses: 423
    },
    conversionRate: '14.2'
  },
  {
    team: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    metrics: {
      passes: 12100,
      passAccuracy: 86.8,
      dribbles: 356,
      shots: 298,
      shotsOnGoal: 165,
      goals: 41,
      keyPasses: 201,
      longPasses: 445
    },
    conversionRate: '13.8'
  },
  {
    team: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
    metrics: {
      passes: 11500,
      passAccuracy: 84.1,
      dribbles: 298,
      shots: 245,
      shotsOnGoal: 128,
      goals: 35,
      keyPasses: 165,
      longPasses: 398
    },
    conversionRate: '14.3'
  }
]

// 선수 랭킹 모킹 데이터
export const mockPlayerRankings = [
  {
    player: { id: 276, name: 'Bukayo Saka', photo: 'https://media.api-sports.io/football/players/276.png' },
    team: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    stats: {
      passes: 1245,
      passAccuracy: 88.5,
      dribbles: 89,
      dribblesSuccess: 67,
      shots: 78,
      shotsOnGoal: 42,
      goals: 12,
      assists: 8,
      keyPasses: 34,
      longPasses: 12
    },
    games: 20,
    conversionRate: '15.4'
  },
  {
    player: { id: 1840, name: 'Erling Haaland', photo: 'https://media.api-sports.io/football/players/1840.png' },
    team: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    stats: {
      passes: 456,
      passAccuracy: 82.3,
      dribbles: 34,
      dribblesSuccess: 23,
      shots: 95,
      shotsOnGoal: 58,
      goals: 18,
      assists: 5,
      keyPasses: 12,
      longPasses: 3
    },
    games: 19,
    conversionRate: '18.9'
  },
  {
    player: { id: 1841, name: 'Kevin De Bruyne', photo: 'https://media.api-sports.io/football/players/1841.png' },
    team: { id: 50, name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    stats: {
      passes: 1890,
      passAccuracy: 91.2,
      dribbles: 45,
      dribblesSuccess: 38,
      shots: 42,
      shotsOnGoal: 18,
      goals: 6,
      assists: 14,
      keyPasses: 78,
      longPasses: 89
    },
    games: 18,
    conversionRate: '14.3'
  },
  {
    player: { id: 277, name: 'Gabriel Martinelli', photo: 'https://media.api-sports.io/football/players/277.png' },
    team: { id: 42, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    stats: {
      passes: 987,
      passAccuracy: 86.7,
      dribbles: 102,
      dribblesSuccess: 78,
      shots: 65,
      shotsOnGoal: 34,
      goals: 9,
      assists: 6,
      keyPasses: 28,
      longPasses: 8
    },
    games: 19,
    conversionRate: '13.8'
  },
  {
    player: { id: 1842, name: 'Mohamed Salah', photo: 'https://media.api-sports.io/football/players/1842.png' },
    team: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    stats: {
      passes: 1123,
      passAccuracy: 87.4,
      dribbles: 95,
      dribblesSuccess: 72,
      shots: 88,
      shotsOnGoal: 48,
      goals: 15,
      assists: 7,
      keyPasses: 31,
      longPasses: 15
    },
    games: 20,
    conversionRate: '17.0'
  }
]

