import { Link } from 'react-router-dom'
import './Project.css'
import projectChar from '../assets/images/project-character.png'

export default function Project() {
  return (
    <section className="project page-section">
      <div className="project-content">
        <h2 className="section-title">Experience &amp; Project</h2>
        <p className="project-desc">
          Pengalaman berharga yang saya dapatkan adalah saya dapat menyelesaikan
          project akhir di kelas 11 ini, saya memilih untuk membuat sebuah machine
          learning klasifikasi yang dapat anda coba pada link berikut ini
        </p>
        <a
          href="https://careercssudentclassification-daffatsaqiifp.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="streamlit-btn"
        >
          Streamlit App
        </a>
        <div className="page-nav">
          <Link to="/achievement" className="page-nav-btn page-nav-btn--back">← Achievement</Link>
          <Link to="/contact"     className="page-nav-btn">About →</Link>
        </div>
      </div>
      <div className="project-image">
        <img src={projectChar} alt="Daffa project character" />
      </div>
    </section>
  )
}
