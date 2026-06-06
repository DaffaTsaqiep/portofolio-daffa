import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Achievement.css'
import ach1 from '../assets/images/achievement-1.png'
import ach2 from '../assets/images/achievement-2.png'

const achievements = [
  { id: 1, image: ach1, alt: 'Juara Harapan 3 Cabang Desain Poster' },
  { id: 2, image: ach2, alt: 'Poster Lawan Manipulasi' },
]

const CATEGORIES = ['PKL', 'Freelance', 'Lomba', 'Ekstrakurikuler']
const EMPTY_FORM = { title: '', category: 'PKL', description: '', year: '' }

export default function Achievement() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + achievements.length) % achievements.length)
  const next = () => setActive((a) => (a + 1) % achievements.length)

  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem('daffa-experiences')
    return saved ? JSON.parse(saved) : [
      { id: 2, title: 'Juara Harapan 3 Desain Poster', category: 'Lomba', description: 'Lomba desain poster tingkat Kabupaten/Kota.', year: '2026' },
      { id: 3, title: 'Anggota English Club', category: 'Ekstrakurikuler', description: 'Aktif sebagai anggota English Club', year: '2024-2026' },
    ]
  })

  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filterCat, setFilterCat] = useState('Semua')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    localStorage.setItem('daffa-experiences', JSON.stringify(experiences))
  }, [experiences])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.year) return
    if (editId !== null) {
      setExperiences(experiences.map(ex => ex.id === editId ? { ...form, id: editId } : ex))
      setEditId(null)
    } else {
      setExperiences([...experiences, { ...form, id: Date.now() }])
    }
    setForm(EMPTY_FORM)
    setShowForm(false)
  }

  const handleEdit = (ex) => {
    setForm({ title: ex.title, category: ex.category, description: ex.description, year: ex.year })
    setEditId(ex.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    setExperiences(experiences.filter(ex => ex.id !== id))
    setDeleteConfirm(null)
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setShowForm(false)
  }

  const filtered = filterCat === 'Semua' ? experiences : experiences.filter(ex => ex.category === filterCat)

  const catColors = {
    PKL: '#5C6033',
    Freelance: '#7a6a2e',
    Lomba: '#3a5c40',
    Ekstrakurikuler: '#4a3a6a',
  }

  return (
    <section className="achievement page-section">

      {/* ── ACHIEVEMENT ── */}
      <h2 className="section-title">Achievement?</h2>
      <div className="achievement-carousel">
        {achievements.map((item, i) => (
          <div key={item.id} className={`ach-card ${i === active ? 'ach-card--active' : i === (active + 1) % achievements.length ? 'ach-card--next' : 'ach-card--hidden'}`}>
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

      {/* ── DIVIDER ── */}
      <div className="section-divider" />

      {/* ── EXPERIENCE CRUD ── */}
      <div className="exp-header">
        <h2 className="section-title">Experience</h2>
        <button className="exp-add-btn" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM) }}>
          {showForm && editId === null ? '✕ Batal' : '+ Tambah'}
        </button>
      </div>

      {showForm && (
        <form className="exp-form" onSubmit={handleSubmit}>
          <h3 className="exp-form-title">{editId ? 'Edit Pengalaman' : 'Tambah Pengalaman'}</h3>
          <div className="exp-form-grid">
            <div className="exp-field">
              <label>Judul *</label>
              <input type="text" placeholder="cth: PKL di PT. Telkom" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="exp-field">
              <label>Kategori *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="exp-field">
              <label>Tahun *</label>
              <input type="number" placeholder="cth: 2025" min="2000" max="2099" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
            </div>
            <div className="exp-field exp-field--full">
              <label>Deskripsi *</label>
              <textarea placeholder="Ceritakan pengalamanmu..." rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
          </div>
          <div className="exp-form-actions">
            <button type="submit" className="exp-btn-save">{editId ? 'Simpan Perubahan' : 'Simpan'}</button>
            <button type="button" className="exp-btn-cancel" onClick={handleCancel}>Batal</button>
          </div>
        </form>
      )}

      <div className="exp-filter">
        {['Semua', ...CATEGORIES].map(cat => (
          <button key={cat} className={`exp-filter-btn ${filterCat === cat ? 'active' : ''}`} onClick={() => setFilterCat(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="exp-empty">
          <p>Belum ada pengalaman di kategori ini.</p>
          <button className="exp-add-btn" onClick={() => setShowForm(true)}>+ Tambah Sekarang</button>
        </div>
      ) : (
        <div className="exp-grid">
          {filtered.map(ex => (
            <div key={ex.id} className="exp-card">
              <div className="exp-card-top">
                <span className="exp-badge" style={{ background: catColors[ex.category] }}>{ex.category}</span>
                <span className="exp-year">{ex.year}</span>
              </div>
              <h4 className="exp-card-title">{ex.title}</h4>
              <p className="exp-card-desc">{ex.description}</p>
              <div className="exp-card-actions">
                <button className="exp-btn-edit" onClick={() => handleEdit(ex)}>✏ Edit</button>
                <button className="exp-btn-delete" onClick={() => setDeleteConfirm(ex.id)}>🗑 Hapus</button>
              </div>
              {deleteConfirm === ex.id && (
                <div className="exp-confirm">
                  <p>Yakin hapus pengalaman ini?</p>
                  <div className="exp-confirm-btns">
                    <button className="exp-btn-delete" onClick={() => handleDelete(ex.id)}>Ya, Hapus</button>
                    <button className="exp-btn-cancel-sm" onClick={() => setDeleteConfirm(null)}>Batal</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="page-nav">
        <Link to="/" className="page-nav-btn page-nav-btn--back">← Home</Link>
        <Link to="/project" className="page-nav-btn">Project →</Link>
      </div>
    </section>
  )
}