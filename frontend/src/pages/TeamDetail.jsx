import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { getTeamDetail } from '../api/teams'
import './TeamDetail.css'

const TeamDetail = () => {
  const { teamId } = useParams()
  const [team, setTeam] = useState(null)
  const [statistics, setStatistics] = useState(null)
  const [recentFixtures, setRecentFixtures] = useState([])
  const [injuries, setInjuries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTeamData()
  }, [teamId])

  const loadTeamData = async () => {
    try {
      setLoading(true)
      setError(null)
      // 서비스 레이어를 통해 데이터 조회
      const data = await getTeamDetail(teamId)
      
      setTeam(data.team)
      setStatistics(data.statistics || null)
      setRecentFixtures(data.recentFixtures || [])
      setInjuries(data.injuries || [])
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatValue = (statType) => {
    if (!statistics?.statistics) return '-'
    const stat = statistics.statistics.find(s => s.type === statType)
    return stat?.value || '-'
  }

  if (loading) return <div className="loading">로딩 중...</div>
  if (error) return <div className="error">{error}</div>
  if (!team) return <div className="error">팀 정보를 찾을 수 없습니다.</div>

  return (
    <div className="team-detail-page">
      <div className="container">
        <Link to="/" className="back-link">← 뒤로 가기</Link>

        {/* 팀 헤더 */}
        <div className="team-header">
          <img src={team.team.logo} alt={team.team.name} className="team-logo-large" />
          <h1>{team.team.name}</h1>
          <div className="team-info">
            {team.team.founded && <span>창단: {team.team.founded}</span>}
            {team.venue?.name && <span>홈구장: {team.venue.name}</span>}
            {team.venue?.city && <span>도시: {team.venue.city}</span>}
          </div>
        </div>

        {/* 시즌 팀 스탯 요약 */}
        {statistics && (
          <section className="team-section">
            <h2>시즌 통계 요약</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">경기 수</div>
                <div className="stat-value">{statistics.fixtures?.played?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">승</div>
                <div className="stat-value win">{statistics.fixtures?.wins?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">무</div>
                <div className="stat-value draw">{statistics.fixtures?.draws?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">패</div>
                <div className="stat-value lose">{statistics.fixtures?.loses?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">득점</div>
                <div className="stat-value">{statistics.goals?.for?.total?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">실점</div>
                <div className="stat-value">{statistics.goals?.against?.total?.total || '-'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">평균 점유율</div>
                <div className="stat-value">{getStatValue('Ball Possession')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">평균 슈팅</div>
                <div className="stat-value">{getStatValue('Total Shots')}</div>
              </div>
            </div>
          </section>
        )}

        {/* 최근 경기 */}
        <section className="team-section">
          <h2>최근 경기</h2>
          <div className="fixtures-list">
            {recentFixtures.map(fixture => (
              <div key={fixture.fixture.id} className="fixture-item">
                <div className="fixture-date">
                  {format(new Date(fixture.fixture.date), 'MM-dd HH:mm')}
                </div>
                <div className="fixture-teams">
                  <div className="team">
                    <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                    <span className={fixture.teams.home.id === parseInt(teamId) ? 'current-team' : ''}>
                      {fixture.teams.home.name}
                    </span>
                  </div>
                  <div className="score">
                    {fixture.goals.home !== null ? (
                      <>
                        <span className={fixture.teams.home.id === parseInt(teamId) ? 'current-team-score' : ''}>
                          {fixture.goals.home}
                        </span>
                        <span>-</span>
                        <span className={fixture.teams.away.id === parseInt(teamId) ? 'current-team-score' : ''}>
                          {fixture.goals.away}
                        </span>
                      </>
                    ) : (
                      <span className="vs">vs</span>
                    )}
                  </div>
                  <div className="team">
                    <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                    <span className={fixture.teams.away.id === parseInt(teamId) ? 'current-team' : ''}>
                      {fixture.teams.away.name}
                    </span>
                  </div>
                </div>
                <div className="fixture-actions">
                  <Link to={`/preview/${fixture.fixture.id}`} className="preview-link">
                    프리뷰
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 부상/결장 요약 */}
        <section className="team-section">
          <h2>부상/결장 요약</h2>
          {injuries.length > 0 ? (
            <div className="injuries-list">
              {injuries.map((injury, index) => (
                <div key={index} className="injury-item">
                  <div className="injury-player">
                    <strong>{injury.player.name}</strong>
                    <span className="injury-type">{injury.player.type}</span>
                  </div>
                  <div className="injury-reason">{injury.player.reason}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">부상/결장 정보가 없습니다.</div>
          )}
        </section>
      </div>
    </div>
  )
}

export default TeamDetail

