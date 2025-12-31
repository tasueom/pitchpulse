import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { apiService } from '../services/api' // API 비활성화 - 모킹 데이터 사용
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { mockStandings, mockRecentFixtures, mockTeamForms } from '../data/mockData'
import { MAJOR_LEAGUES } from '../data/leagues'
import { getMockStandings, getMockFixtures, getMockTeamForms } from '../data/mockDataByLeague'
import './LeagueHome.css'

const LeagueHome = () => {
  const [selectedLeague, setSelectedLeague] = useState(39) // 기본값: EPL
  const [standings, setStandings] = useState([])
  const [recentFixtures, setRecentFixtures] = useState([])
  const [teamForms, setTeamForms] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRound, setSelectedRound] = useState('all')
  const [rounds, setRounds] = useState([])
  const [currentSeason, setCurrentSeason] = useState(null)

  useEffect(() => {
    loadData()
  }, [selectedLeague])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('모킹 데이터 로딩 중...', `리그 ID: ${selectedLeague}`)
      
      // 선택된 리그에 맞는 모킹 데이터 사용
      const standingsData = getMockStandings(selectedLeague)
      const fixturesData = getMockFixtures(selectedLeague)
      const teamFormsData = getMockTeamForms(selectedLeague)
      
      // 현재 시즌 정보 저장 (2025)
      setCurrentSeason(2025)

      setStandings(standingsData)
      setRecentFixtures(fixturesData)

      // 고유한 라운드 추출
      const uniqueRounds = [...new Set(fixturesData.map(f => f.league.round).filter(Boolean))]
      setRounds(uniqueRounds.sort())

      // 리그별 모킹 폼 데이터 사용
      setTeamForms(teamFormsData)
      
    } catch (err) {
      const errorMessage = err.message || '데이터를 불러오는 중 오류가 발생했습니다.'
      setError(errorMessage)
      console.error('데이터 로딩 에러:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredFixtures = selectedRound === 'all' 
    ? recentFixtures 
    : recentFixtures.filter(f => f.league.round === selectedRound)

  if (loading) {
    return (
      <div className="league-home">
        <div className="container">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="league-home">
        <div className="container">
          <div className="error">
            <h2>오류 발생</h2>
            <p>{error}</p>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              브라우저 콘솔(F12)을 열어 자세한 에러 메시지를 확인하세요.
            </p>
            <button 
              onClick={() => {
                setError(null)
                loadData()
              }}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentLeague = MAJOR_LEAGUES.find(l => l.id === selectedLeague) || MAJOR_LEAGUES[0]

  return (
    <div className="league-home">
      <div className="container">
        {/* 리그 선택 탭 */}
        <div className="league-tabs">
          {MAJOR_LEAGUES.map(league => (
            <button
              key={league.id}
              className={`league-tab ${selectedLeague === league.id ? 'active' : ''}`}
              onClick={() => setSelectedLeague(league.id)}
              title={league.nameKo}
            >
              <img 
                src={league.logo} 
                alt={league.nameKo} 
                className="league-logo"
                onError={(e) => {
                  // 로고 로드 실패 시 기본 아이콘 표시
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span className="league-logo-fallback" style={{ display: 'none', fontSize: '24px' }}>
                {league.abbreviation}
              </span>
              <span className="league-name">{league.abbreviation}</span>
            </button>
          ))}
        </div>

        <h1 className="page-title">{currentLeague.nameKo} 리그 홈</h1>

        {/* 순위표 섹션 */}
        <section className="standings-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>순위표</h2>
            {currentSeason && (
              <span style={{ fontSize: '0.875rem', color: '#666' }}>
                {currentSeason}-{currentSeason + 1} 시즌
              </span>
            )}
          </div>
          {standings.length === 0 ? (
            <div className="no-data">순위표 데이터를 불러올 수 없습니다.</div>
          ) : (
          <div className="standings-table">
            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>팀</th>
                  <th>폼</th>
                  <th>경기</th>
                  <th>승</th>
                  <th>무</th>
                  <th>패</th>
                  <th>득실</th>
                  <th>승점</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr key={team.team.id}>
                    <td>{team.rank}</td>
                    <td>
                      <Link to={`/team/${team.team.id}`} className="team-link">
                        <img src={team.team.logo} alt={team.team.name} className="team-logo-small" />
                        <span>{team.team.name}</span>
                      </Link>
                    </td>
                    <td>
                      <div className="form-indicators">
                        {teamForms[team.team.id]?.slice(0, 5).map((result, i) => (
                          <span key={i} className={`form-badge form-${result}`}>
                            {result}
                          </span>
                        )) || <span className="no-form">-</span>}
                      </div>
                    </td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td className={team.goalsDiff > 0 ? 'positive' : team.goalsDiff < 0 ? 'negative' : ''}>
                      {team.goalsDiff > 0 ? '+' : ''}{team.goalsDiff}
                    </td>
                    <td className="points">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </section>

        {/* 최근 경기 결과 섹션 */}
        <section className="recent-fixtures-section">
          <h2>최근 경기 결과</h2>
          {recentFixtures.length === 0 ? (
            <div className="no-data">최근 경기 데이터를 불러올 수 없습니다.</div>
          ) : (
          <>
          <div className="filters">
            <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
              <option value="all">전체 라운드</option>
              {rounds.map(round => (
                <option key={round} value={round}>{round}</option>
              ))}
            </select>
          </div>
          <div className="fixtures-list">
            {filteredFixtures.map(fixture => (
              <div key={fixture.fixture.id} className="fixture-card">
                <div className="fixture-header">
                  <span className="round">{fixture.league.round}</span>
                  <span className="date">
                    {format(new Date(fixture.fixture.date), 'yyyy-MM-dd HH:mm', { locale: ko })}
                  </span>
                </div>
                <div className="fixture-content">
                  <div className="team">
                    <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                  <div className="score">
                    {fixture.goals.home !== null ? (
                      <>
                        <span className="score-number">{fixture.goals.home}</span>
                        <span className="score-separator">-</span>
                        <span className="score-number">{fixture.goals.away}</span>
                      </>
                    ) : (
                      <span className="vs">vs</span>
                    )}
                  </div>
                  <div className="team">
                    <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                    <span>{fixture.teams.away.name}</span>
                  </div>
                </div>
                <div className="fixture-status">
                  <span className={`status ${fixture.fixture.status.short}`}>
                    {fixture.fixture.status.long}
                  </span>
                </div>
              </div>
            ))}
          </div>
          </>
          )}
        </section>
      </div>
    </div>
  )
}

export default LeagueHome

