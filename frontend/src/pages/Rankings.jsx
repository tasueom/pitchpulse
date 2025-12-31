import React, { useState, useEffect } from 'react'
import { getTeamRankings, getPlayerRankings } from '../api/teams'
import { MAJOR_LEAGUES } from '../data/leagues'
import './Rankings.css'

const Rankings = () => {
  const [selectedLeague, setSelectedLeague] = useState(39) // 기본값: EPL
  const [standings, setStandings] = useState([])
  const [teamStats, setTeamStats] = useState([])
  const [playerStats, setPlayerStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('player') // 'team' or 'player' - 기본값을 선수 랭킹으로 변경
  const [selectedMetric, setSelectedMetric] = useState('passes')

  useEffect(() => {
    loadRankingsData()
  }, [selectedLeague])

  useEffect(() => {
    if (activeTab === 'team' && teamStats.length > 0) {
      calculateTeamRankings()
    } else if (activeTab === 'player' && playerStats.length > 0) {
      calculatePlayerRankings()
    }
  }, [activeTab, selectedMetric])

  const loadRankingsData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 서비스 레이어를 통해 데이터 조회
      const [teamData, playerData] = await Promise.all([
        getTeamRankings(selectedLeague),
        getPlayerRankings(selectedLeague)
      ])
      
      // 초기 정렬: passes 기준
      const sortedTeamStats = [...(teamData || [])].sort((a, b) => {
        return (b.metrics?.passes || 0) - (a.metrics?.passes || 0)
      })
      
      const sortedPlayerStats = [...(playerData || [])].sort((a, b) => {
        return (b.stats?.passes || 0) - (a.stats?.passes || 0)
      })
      
      setTeamStats(sortedTeamStats)
      setPlayerStats(sortedPlayerStats)
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const calculateTeamRankings = () => {
    // 모킹 데이터는 이미 metrics로 계산되어 있으므로 그대로 사용
    // 실제 API에서는 statistics 배열에서 계산해야 함
    if (!teamStats || teamStats.length === 0) {
      return
    }

    // 모킹 데이터인지 확인 (metrics가 이미 있는 경우)
    const isMockData = teamStats[0]?.metrics !== undefined

    let rankings
    if (isMockData) {
      // 모킹 데이터는 이미 계산된 metrics 사용
      rankings = teamStats.map(stat => ({
        team: stat.team,
        metrics: stat.metrics,
        conversionRate: stat.conversionRate
      }))
    } else {
      // 실제 API 데이터인 경우 statistics 배열에서 계산
      rankings = teamStats.map(stat => {
        const stats = stat.statistics || []
        const getStat = (type) => {
          const found = stats.find(s => s.type === type)
          return found?.value || '0'
        }

        return {
          team: stat.team,
          metrics: {
            passes: parseFloat(getStat('Total passes') || 0),
            passAccuracy: parseFloat(getStat('Passes %') || 0),
            dribbles: parseFloat(getStat('Dribbles') || 0),
            shots: parseFloat(getStat('Total Shots') || 0),
            shotsOnGoal: parseFloat(getStat('Shots on Goal') || 0),
            goals: stat.goals?.for?.total?.total || 0,
            keyPasses: parseFloat(getStat('Key passes') || 0),
            longPasses: parseFloat(getStat('Long passes') || 0),
          },
          conversionRate: stat.goals?.for?.total?.total && stat.statistics?.find(s => s.type === 'Total Shots')?.value
            ? ((stat.goals.for.total.total / parseFloat(stat.statistics.find(s => s.type === 'Total Shots').value)) * 100).toFixed(1)
            : '0'
        }
      })
    }

    // 선택된 지표로 정렬
    const sorted = [...rankings].sort((a, b) => {
      const metricMap = {
        passes: 'passes',
        passAccuracy: 'passAccuracy',
        dribbles: 'dribbles',
        shots: 'shots',
        shotsOnGoal: 'shotsOnGoal',
        conversionRate: 'conversionRate',
        keyPasses: 'keyPasses',
        longPasses: 'longPasses'
      }
      const metric = metricMap[selectedMetric] || 'passes'
      const aValue = metric === 'conversionRate' ? parseFloat(a.conversionRate) : a.metrics[metric] || 0
      const bValue = metric === 'conversionRate' ? parseFloat(b.conversionRate) : b.metrics[metric] || 0
      return bValue - aValue
    })

    setTeamStats(sorted)
  }

  const calculatePlayerRankings = () => {
    // 선택된 지표로 정렬
    const sorted = [...playerStats].sort((a, b) => {
      const metricMap = {
        passes: 'passes',
        passAccuracy: 'passAccuracy',
        dribbles: 'dribbles',
        shots: 'shots',
        shotsOnGoal: 'shotsOnGoal',
        conversionRate: 'conversionRate',
        keyPasses: 'keyPasses',
        longPasses: 'longPasses'
      }
      const metric = metricMap[selectedMetric] || 'passes'
      const aValue = metric === 'conversionRate' ? parseFloat(a.conversionRate) : a.stats[metric] || 0
      const bValue = metric === 'conversionRate' ? parseFloat(b.conversionRate) : b.stats[metric] || 0
      return bValue - aValue
    })

    setPlayerStats(sorted)
  }

  const getMetricLabel = (metric) => {
    const labels = {
      passes: '패스',
      passAccuracy: '패스 성공률',
      dribbles: '드리블',
      shots: '슈팅',
      shotsOnGoal: '유효슛',
      conversionRate: '결정력 (골/슛 %)',
      keyPasses: '키패스',
      longPasses: '롱패스'
    }
    return labels[metric] || metric
  }

  if (loading) return <div className="loading">로딩 중...</div>
  if (error) return <div className="error">{error}</div>

  const currentLeague = MAJOR_LEAGUES.find(l => l.id === selectedLeague) || MAJOR_LEAGUES[0]

  return (
    <div className="rankings-page">
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

        <h1 className="page-title">{currentLeague.nameKo} 지표 랭킹</h1>

        {/* 탭 */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'player' ? 'active' : ''}`}
            onClick={() => setActiveTab('player')}
          >
            선수 랭킹
          </button>
          <button 
            className={`tab ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            팀 랭킹
          </button>
        </div>

        {/* 지표 선택 */}
        <div className="metric-selector">
          <label>지표 선택:</label>
          <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
            <option value="passes">패스</option>
            <option value="passAccuracy">패스 성공률</option>
            <option value="keyPasses">키패스</option>
            <option value="longPasses">롱패스</option>
            <option value="dribbles">드리블</option>
            <option value="shots">슈팅</option>
            <option value="shotsOnGoal">유효슛</option>
            <option value="conversionRate">결정력 (골/슛 %)</option>
          </select>
        </div>

        {/* 팀 랭킹 */}
        {activeTab === 'team' && (
          <section className="rankings-section">
            <h2>{getMetricLabel(selectedMetric)} - 팀 랭킹</h2>
            <div className="rankings-table">
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>팀</th>
                    <th>{getMetricLabel(selectedMetric)}</th>
                    {selectedMetric === 'conversionRate' && <th>골</th>}
                    {selectedMetric === 'conversionRate' && <th>슛</th>}
                  </tr>
                </thead>
                <tbody>
                  {teamStats.map((item, index) => (
                    <tr key={item.team.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="team-info">
                          <img src={item.team.logo} alt={item.team.name} className="team-logo-small" />
                          <span>{item.team.name}</span>
                        </div>
                      </td>
                      <td className="metric-value">
                        {selectedMetric === 'conversionRate' 
                          ? `${item.conversionRate}%`
                          : selectedMetric === 'passAccuracy'
                          ? `${item.metrics.passAccuracy}%`
                          : item.metrics[selectedMetric]?.toLocaleString() || '0'}
                      </td>
                      {selectedMetric === 'conversionRate' && (
                        <>
                          <td>{item.metrics.goals}</td>
                          <td>{item.metrics.shots}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 선수 랭킹 */}
        {activeTab === 'player' && (
          <section className="rankings-section">
            <h2>{getMetricLabel(selectedMetric)} - 선수 랭킹</h2>
            <div className="rankings-table">
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>선수</th>
                    <th>팀</th>
                    <th>{getMetricLabel(selectedMetric)}</th>
                    <th>경기 수</th>
                  </tr>
                </thead>
                <tbody>
                  {playerStats.map((item, index) => (
                    <tr key={`${item.player.id}-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="player-info">
                          {item.player.photo ? (
                            <img src={item.player.photo} alt={item.player.name} className="player-photo" />
                          ) : (
                            <div className="player-photo-placeholder">
                              {item.player.name.charAt(0)}
                            </div>
                          )}
                          <span className="player-name">{item.player.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="team-info">
                          <img src={item.team.logo} alt={item.team.name} className="team-logo-small" />
                          <span>{item.team.name}</span>
                        </div>
                      </td>
                      <td className="metric-value">
                        {selectedMetric === 'conversionRate'
                          ? `${item.conversionRate}%`
                          : selectedMetric === 'passAccuracy'
                          ? `${item.stats.passAccuracy}%`
                          : item.stats[selectedMetric]?.toLocaleString() || '0'}
                      </td>
                      <td>{item.games}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Rankings

