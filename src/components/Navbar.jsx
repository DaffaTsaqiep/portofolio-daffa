import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'
import logoIcon from '../assets/images/icon.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reset scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
         <NavLink to="/" className="nav-brand">
  <img src={logoIcon} alt="icon" className="nav-icon" />
  Daffa
</NavLink>
      <ul className="nav-links">
        <li><NavLink to="/"            className={({isActive}) => isActive ? 'active' : ''} end>Home</NavLink></li>
        <li><NavLink to="/achievement" className={({isActive}) => isActive ? 'active' : ''}>Experience</NavLink></li>
        <li><NavLink to="/project"     className={({isActive}) => isActive ? 'active' : ''}>Project</NavLink></li>
        <li><NavLink to="/contact"     className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
        
      </ul>
    </nav>
  )
}
