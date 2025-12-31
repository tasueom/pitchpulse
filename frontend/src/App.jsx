import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LeagueHome from './pages/LeagueHome'
import Live from './pages/Live'
import Preview from './pages/Preview'
import TeamDetail from './pages/TeamDetail'
import Rankings from './pages/Rankings'
import UserProfile from './pages/UserProfile'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LeagueHome />} />
            <Route path="/live" element={<Live />} />
            <Route path="/preview/:fixtureId" element={<Preview />} />
            <Route path="/team/:teamId" element={<TeamDetail />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

