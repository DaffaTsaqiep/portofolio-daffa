import { Link } from 'react-router-dom'
import './About.css'
import aboutChar from '../assets/images/about-character.png'

const skills = ['Ui/Ux Design', 'Menggambar', 'Python', 'Design Poster']

export default function About() {
  return (
    <section className="about">
      <h2 className="section-title">Siapa Saya?</h2>
      <div className="about-body">
        <div className="about-image">
          <img src={aboutChar} alt="Daffa about character" />
        </div>
        <div className="about-text">
          <p>
            Nama saya <strong>Daffa Tsaqiif Pratama</strong>, saya adalah seorang
            murid jurusan RPL (Pengembangan Perangkat Lunak) di{' '}
            <strong>SMK N 1 PURBALINGGA</strong>. Selain itu saya juga adalah
            seorang seniman tradisional dan digital.
          </p>
          <h3 className="skills-title">Skills?</h3>
          <div className="skills-list">
            {skills.map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
          <Link to="/achievement" className="about-next">Lihat Achievement →</Link>
        </div>
      </div>
    </section>
  )
}
