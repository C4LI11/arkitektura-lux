import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinkBase =
  'text-[10px] tracking-[0.4em] uppercase font-black transition-all duration-500'

function navLinkClass({ isActive }) {
  return [
    navLinkBase,
    isActive ? 'text-[#C5A059]' : 'text-white/40 hover:text-white',
  ].join(' ')
}

const mobilePanel = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-700">
      <div className={`transition-all duration-700 ${scrolled ? 'bg-[#1a1a1a]/80 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="mx-auto max-w-[1800px] px-6 sm:px-12">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <NavLink to="/" className="group flex items-center gap-4">
                <span className="font-sans text-2xl font-black tracking-tighter text-white uppercase transition group-hover:text-white/70">
                  Cali <span className="text-white/10 italic">Ing</span>
                </span>
              </NavLink>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex items-center gap-12"
            >
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/projects" className={navLinkClass}>Portfolio</NavLink>
              <NavLink to="/services" className={navLinkClass}>Sherbimet</NavLink>
              <NavLink to="/contact" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] text-white uppercase font-black border border-white/10 rounded-full px-8 py-3 hover:border-[#C5A059] transition-all duration-500">
                 Contact
                 <div className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
              </NavLink>
            </motion.nav>

            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              onClick={() => setOpen(true)}
            >
              <div className="h-0.5 w-6 bg-white transition-all group-hover:w-8" />
              <div className="h-0.5 w-8 bg-white transition-all" />
              <div className="h-0.5 w-4 bg-white transition-all group-hover:w-8" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobilePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-[#1a1a1a] flex flex-col items-center justify-center p-8 sm:p-12"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 sm:top-12 sm:right-12 text-[10px] tracking-[0.4em] text-white/40 uppercase font-black hover:text-white transition-colors z-10"
            >
              Close [X]
            </button>
            
            <div className="flex flex-col items-center gap-8 sm:gap-12 text-center">
              <NavLink to="/" onClick={() => setOpen(false)} className="text-3xl sm:text-5xl font-black text-white hover:text-[#C5A059] transition-colors uppercase tracking-tighter">Home</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className="text-3xl sm:text-5xl font-black text-white hover:text-[#C5A059] transition-colors uppercase tracking-tighter">About</NavLink>
              <NavLink to="/projects" onClick={() => setOpen(false)} className="text-3xl sm:text-5xl font-black text-white hover:text-[#C5A059] transition-colors uppercase tracking-tighter">Portfolio</NavLink>
              <NavLink to="/services" onClick={() => setOpen(false)} className="text-3xl sm:text-5xl font-black text-white hover:text-[#C5A059] transition-colors uppercase tracking-tighter">Sherbimet</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="text-3xl sm:text-5xl font-black text-white hover:text-[#C5A059] transition-colors uppercase tracking-tighter">Contact</NavLink>
            </div>
            
            <div className="absolute bottom-8 sm:bottom-12 text-[8px] sm:text-[10px] tracking-[0.8em] text-white/10 uppercase font-black">
              2B ING — Architectural Mastery
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
