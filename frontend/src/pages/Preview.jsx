import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getPreviewData } from '../api/matches'
import './Preview.css'

const Preview = () => {
  const { fixtureId } = useParams()
  const [fixture, setFixture] = useState(null)
  const [h2h, setH2h] = useState([])
  const [injuries, setInjuries] = useState([])
  const [keyPlayers, setKeyPlayers] = useState({ home: [], away: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPreviewData()
  }, [fixtureId])

  const loadPreviewData = async () => {
    try {
      setLoading(true)
      setError(null)
      // 서비스 레이어를 통해 데이터 조회
      const data = await getPreviewData(fixtureId)
      
      setFixture(data.fixture)
      setH2h(data.h2h || [])
      setInjuries(data.injuries || [])
      setKeyPlayers(data.keyPlayers || { home: [], away: [] })
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // API 비활성화로 인해 함수 제거됨

  if (loading) return <div className="loading">로딩 중...</div>
  if (error) return <div className="error">{error}</div>
  if (!fixture) return <div className="error">경기 정보를 찾을 수 없습니다.</div>

  return (
    <div className="preview-page">
      <div className="container">
        <Link to="/" className="back-link">← 뒤로 가기</Link>
        
        <div className="preview-header">
          <h1>경기 프리뷰</h1>
          <div className="fixture-matchup">
            <div className="team">
              <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
              <h2>{fixture.teams.home.name}</h2>
            </div>
            <div className="vs">vs</div>
            <div className="team">
              <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
              <h2>{fixture.teams.away.name}</h2>
            </div>
          </div>
          <div className="fixture-date">
            {format(new Date(fixture.fixture.date), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
          </div>
        </div>

        {/* H2H 섹션 */}
        <section className="preview-section">
          <h2>맞대결 전적 (H2H)</h2>
          {h2h.length > 0 ? (
            <div className="h2h-list">
              {h2h.map((match, index) => (
                <div key={index} className="h2h-item">
                  <div className="h2h-date">
                    {format(new Date(match.fixture.date), 'yyyy-MM-dd')}
                  </div>
                  <div className="h2h-teams">
                    <span className={match.teams.home.id === fixture.teams.home.id ? 'home-team' : ''}>
                      {match.teams.home.name}
                    </span>
                    <span className="h2h-score">
                      {match.goals.home !== null ? `${match.goals.home} - ${match.goals.away}` : 'vs'}
                    </span>
                    <span className={match.teams.away.id === fixture.teams.away.id ? 'away-team' : ''}>
                      {match.teams.away.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">맞대결 전적이 없습니다.</div>
          )}
        </section>

        {/* 부상/결장 섹션 */}
        <section className="preview-section">
          <h2>부상/결장 리스트</h2>
          {injuries.length > 0 ? (
            <div className="injuries-list">
              {injuries.map((injury, index) => (
                <div key={index} className="injury-item">
                  <div className="injury-team">
                    <img 
                      src={injury.team.id === fixture.teams.home.id 
                        ? fixture.teams.home.logo 
                        : fixture.teams.away.logo} 
                      alt={injury.team.name}
                      className="team-logo-small"
                    />
                    <span>{injury.team.name}</span>
                  </div>
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

        {/* 키 플레이어 섹션 */}
        <section className="preview-section">
          <h2>키 플레이어</h2>
          <div className="key-players-grid">
            <div className="key-players-team">
              <h3>{fixture.teams.home.name}</h3>
              {keyPlayers.home.length > 0 ? (
                <div className="players-list">
                  {keyPlayers.home.map((item, index) => (
                    <div key={index} className="key-player-card">
                      <div className="player-name">{item.player.name}</div>
                      <div className="player-stats">
                        <span>골: {item.stats.goals}</span>
                        <span>어시스트: {item.stats.assists}</span>
                        <span>평점: {item.stats.rating}</span>
                        <span>경기: {item.stats.games}</span>
                      </div>
                      <div className="player-score">점수: {item.score.toFixed(1)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">데이터 없음</div>
              )}
            </div>
            <div className="key-players-team">
              <h3>{fixture.teams.away.name}</h3>
              {keyPlayers.away.length > 0 ? (
                <div className="players-list">
                  {keyPlayers.away.map((item, index) => (
                    <div key={index} className="key-player-card">
                      <div className="player-name">{item.player.name}</div>
                      <div className="player-stats">
                        <span>골: {item.stats.goals}</span>
                        <span>어시스트: {item.stats.assists}</span>
                        <span>평점: {item.stats.rating}</span>
                        <span>경기: {item.stats.games}</span>
                      </div>
                      <div className="player-score">점수: {item.score.toFixed(1)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">데이터 없음</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Preview

