import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useRef, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Admin2B from './pages/Admin2B.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import Footer from './components/Footer.jsx'
import AiChat from './components/AiChat.jsx'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#1a1a1a]">
      <div className="mb-8 text-[12px] font-bold tracking-[1em] text-[#C5A059] uppercase">
        Cali Ing
      </div>
      <div className="h-[1px] w-48 overflow-hidden bg-[#EAEAEA]">
        <div className="h-full w-full bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]" />
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans font-light antialiased selection:bg-white/20 selection:text-white overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <div className="fixed inset-0 z-0 bg-black pointer-events-none" />

        {!location.pathname.startsWith('/admin') && <Navbar />}

        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin2B />} />
          <Route path="/admin-2b" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {!location.pathname.startsWith('/admin') && <Footer />}
        <AiChat />
      </Suspense>
    </div>
  )
}