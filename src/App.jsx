import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Achievement from './components/Achievement'
import Project from './components/Project'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<><Hero /><About /></>} />
        <Route path="/achievement" element={<Achievement />} />
        <Route path="/project"     element={<Project />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
