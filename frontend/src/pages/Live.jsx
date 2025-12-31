import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { apiService } from '../services/api' // API 비활성화 - 모킹 데이터 사용
import { mockLiveFixtures, mockLiveEvents, mockLiveStatistics } from '../data/mockData'
import './Live.css'

const Live = () => {
  const [liveFixtures, setLiveFixtures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFixture, setSelectedFixture] = useState(null)
  const [fixtureDetails, setFixtureDetails] = useState(null)
  const [events, setEvents] = useState([])
  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    loadLiveFixtures()
    // 15초마다 업데이트
    const interval = setInterval(loadLiveFixtures, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedFixture) {
      loadFixtureDetails(selectedFixture)
      // 모킹 모드에서는 업데이트 비활성화
      // const interval = setInterval(() => loadFixtureDetails(selectedFixture), 15000)
      // return () => clearInterval(interval)
    }
  }, [selectedFixture])

  const loadLiveFixtures = async () => {
    try {
      // 모킹 데이터 사용 (API 비활성화)
      const data = mockLiveFixtures
      setLiveFixtures(data)
      if (data.length === 0 && !loading) {
        setError('현재 진행 중인 경기가 없습니다. (모킹 모드)')
      } else {
        setError(null)
      }
    } catch (err) {
      setError('라이브 경기 데이터를 불러오는 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadFixtureDetails = async (fixtureId) => {
    try {
      // 모킹 데이터 사용 (API 비활성화)
      const mockFixture = mockLiveFixtures.find(f => f.fixture.id === fixtureId) || mockLiveFixtures[0]
      setFixtureDetails(mockFixture)
      setEvents(mockLiveEvents)
      setStatistics(mockLiveStatistics)
    } catch (err) {
      console.error('경기 상세 정보 로딩 실패:', err)
    }
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'Goal':
        return '⚽'
      case 'Card':
        return '🟨'
      case 'subst':
        return '🔄'
      default:
        return '•'
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'Goal':
        return '#4caf50'
      case 'Card':
        return '#ff9800'
      case 'subst':
        return '#2196f3'
      default:
        return '#666'
    }
  }

  if (loading) return <div className="loading">로딩 중...</div>

  return (
    <div className="live-page">
      <div className="container">
        <h1 className="page-title">라이브 경기</h1>

        {error && liveFixtures.length === 0 ? (
          <div className="error">{error}</div>
        ) : (
          <div className="live-content">
            {/* 진행중 경기 목록 */}
            <section className="live-fixtures-section">
              <h2>진행중 경기 ({liveFixtures.length})</h2>
              <div className="live-fixtures-list">
                {liveFixtures.map(fixture => (
                  <div
                    key={fixture.fixture.id}
                    className={`live-fixture-card ${selectedFixture === fixture.fixture.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFixture(fixture.fixture.id)}
                  >
                    <div className="fixture-league">
                      {fixture.league.name} - {fixture.league.round}
                    </div>
                    <div className="fixture-teams">
                      <div className="team">
                        <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                        <span>{fixture.teams.home.name}</span>
                      </div>
                      <div className="live-score">
                        {fixture.goals.home !== null ? (
                          <>
                            <span className="score">{fixture.goals.home}</span>
                            <span className="separator">-</span>
                            <span className="score">{fixture.goals.away}</span>
                          </>
                        ) : (
                          <span className="vs">vs</span>
                        )}
                        <span className="live-badge">LIVE</span>
                      </div>
                      <div className="team">
                        <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                        <span>{fixture.teams.away.name}</span>
                      </div>
                    </div>
                    <div className="fixture-time">
                      {fixture.fixture.status.elapsed ? `${fixture.fixture.status.elapsed}'` : fixture.fixture.status.long}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 경기 상세 정보 */}
            {selectedFixture && fixtureDetails && (
              <section className="fixture-details-section">
                <h2>경기 상세</h2>
                <div className="fixture-details-card">
                  {/* 스코어보드 */}
                  <div className="scoreboard">
                    <div className="team-detail">
                      <img src={fixtureDetails.teams.home.logo} alt={fixtureDetails.teams.home.name} />
                      <h3>{fixtureDetails.teams.home.name}</h3>
                      <div className="team-score">{fixtureDetails.goals.home ?? 0}</div>
                    </div>
                    <div className="match-info">
                      <div className="match-status">
                        {fixtureDetails.fixture.status.elapsed ? (
                          <span className="elapsed">{fixtureDetails.fixture.status.elapsed}'</span>
                        ) : (
                          <span>{fixtureDetails.fixture.status.long}</span>
                        )}
                      </div>
                      <div className="match-date">
                        {new Date(fixtureDetails.fixture.date).toLocaleString('ko-KR')}
                      </div>
                    </div>
                    <div className="team-detail">
                      <img src={fixtureDetails.teams.away.logo} alt={fixtureDetails.teams.away.name} />
                      <h3>{fixtureDetails.teams.away.name}</h3>
                      <div className="team-score">{fixtureDetails.goals.away ?? 0}</div>
                    </div>
                  </div>

                  {/* 이벤트 타임라인 */}
                  <div className="events-timeline">
                    <h3>이벤트 타임라인</h3>
                    {events.length > 0 ? (
                      <div className="timeline">
                        {events.map((event, index) => (
                          <div key={index} className="timeline-event">
                            <div className="event-time">{event.time.elapsed}'{event.time.extra ? `+${event.time.extra}` : ''}</div>
                            <div className="event-icon" style={{ color: getEventColor(event.type) }}>
                              {getEventIcon(event.type)}
                            </div>
                            <div className="event-details">
                              <div className="event-team">
                                {event.team.id === fixtureDetails.teams.home.id 
                                  ? fixtureDetails.teams.home.name 
                                  : fixtureDetails.teams.away.name}
                              </div>
                              <div className="event-description">
                                {event.type === 'Goal' && (
                                  <>
                                    {event.player.name} {event.assist?.name ? `(어시스트: ${event.assist.name})` : ''}
                                  </>
                                )}
                                {event.type === 'Card' && (
                                  <>
                                    {event.player.name} - {event.detail === 'Yellow Card' ? '경고' : '퇴장'}
                                  </>
                                )}
                                {event.type === 'subst' && (
                                  <>
                                    {event.player.name} ↔ {event.assist?.name}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-events">아직 이벤트가 없습니다.</div>
                    )}
                  </div>

                  {/* 통계 요약 */}
                  {statistics.length > 0 && (
                    <div className="statistics-summary">
                      <h3>경기 통계</h3>
                      <div className="stats-grid">
                        {statistics.map((stat, index) => (
                          <div key={index} className="stat-group">
                            <h4>{stat.team.name}</h4>
                            <div className="stat-items">
                              {stat.statistics.map((item, idx) => {
                                // 주요 지표만 표시
                                const keyStats = ['Ball Possession', 'Total Shots', 'Shots on Goal', 'Total passes', 'Passes accurate']
                                if (!keyStats.includes(item.type)) return null
                                
                                return (
                                  <div key={idx} className="stat-item">
                                    <span className="stat-label">{item.type === 'Ball Possession' ? '점유율' : 
                                                                   item.type === 'Total Shots' ? '슈팅' :
                                                                   item.type === 'Shots on Goal' ? '유효슛' :
                                                                   item.type === 'Total passes' ? '패스' :
                                                                   item.type === 'Passes accurate' ? '정확한 패스' : item.type}</span>
                                    <span className="stat-value">{item.value}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Live

