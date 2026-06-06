import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Achievement.css'
import ach1 from '../assets/images/achievement-1.png'
import ach2 from '../assets/images/achievement-2.png'

const achievements = [
  { id: 1, image: ach1, alt: 'Juara Harapan 3 Cabang Desain Poster' },
  { id: 2, image: ach2, alt: 'Poster Lawan Manipulasi' },
]

export default function Achievement() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + achievements.length) % achievements.length)
  const next = () => setActive((a) => (a + 1) % achievements.length)

  return (
    <section className="achievement page-section">
      <h2 className="section-title">Achievement?</h2>
      <div className="achievement-carousel">
        {achievements.map((item, i) => (
          <div
            key={item.id}
            className={`ach-card ${i === active ? 'ach-card--active' : i === (active + 1) % achievements.length ? 'ach-card--next' : 'ach-card--hidden'}`}
          >
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
        <button className="ach-arrow ach-arrow--left"  onClick={prev}>&#8592;</button>
        <button className="ach-arrow ach-arrow--right" onClick={next}>&#8594;</button>
      </div>
      <div className="ach-dots">
        {achievements.map((_, i) => (
          <span key={i} className={`dot ${i === active ? 'dot--active' : ''}`} onClick={() => setActive(i)} />
        ))}
      </div>
      <div className="page-nav">
        <Link to="/" className="page-nav-btn page-nav-btn--back">← Home</Link>
        <Link to="/project" className="page-nav-btn">Project →</Link>
      </div>
    </section>
  )
}
