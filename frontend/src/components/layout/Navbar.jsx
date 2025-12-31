import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ⚽ PitchPulse
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              리그 홈
            </Link>
          </li>
          <li>
            <Link to="/live" className={isActive('/live') ? 'active' : ''}>
              라이브
            </Link>
          </li>
          <li>
            <Link to="/rankings" className={isActive('/rankings') ? 'active' : ''}>
              지표 랭킹
            </Link>
          </li>
          <li>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
              내 프로필
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

