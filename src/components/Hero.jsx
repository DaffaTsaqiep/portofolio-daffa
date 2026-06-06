import { Link } from 'react-router-dom'
import './Hero.css'
import heroChar from '../assets/images/hero-character.png'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-diagonal"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span>PORTO</span>
          <span>FOLIO</span>
        </h1>
        <Link to="/achievement" className="hero-cta">Lihat Achievement →</Link>

        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

      </div>
      <div className="hero-image">
        <img src={heroChar} alt="Daffa character" />
      </div>
    </section>
  )
}