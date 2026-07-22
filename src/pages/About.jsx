import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'

const pillars = [
  {
    title: 'Misioni',
    text: 'Të ripërcaktojmë peizazhin arkitekturor përmes inxhinierisë precize dhe dizajnit që sfidon kohën.',
    id: 'M'
  },
  {
    title: 'Vizioni',
    text: 'Të jemi liderë në inovacionin e hapësirave ku luksi dhe teknologjia bashkohen në një formë të vetme.',
    id: 'V'
  },
  {
    title: 'Ekselenca',
    text: 'Përkushtim i pakompromis ndaj detajeve dhe cilësisë në çdo metër katror që ne krijojmë.',
    id: 'E'
  },
]

export default function About() {
  return (
    <PageShell>
      <section className="min-h-screen bg-[#1A1A1B] text-[#F5F5F7] selection:bg-[#C5A059]/30">
        <div className="mx-auto max-w-[1800px] px-6 pb-64 pt-40 sm:pt-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
            {/* Left Side: Cinematic Title */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="mb-10 flex items-center gap-6"
              >
                <div className="h-[1px] w-16 bg-[#C5A059]" />
                <span className="text-[12px] tracking-[1em] text-[#C5A059] uppercase font-bold">
                  Ekselencë Vizione
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-6xl sm:text-[10vw] font-medium text-[#F5F5F7] uppercase leading-[0.85] tracking-tighter"
              >
                Cali <span className="text-[#C5A059] italic">Ing</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-32 space-y-16 max-w-3xl"
              >
                <h2 className="text-4xl font-light leading-tight text-[#F5F5F7]/90 font-serif italic">
                  "Ne nuk ndërtojmë thjesht struktura; ne skicojmë të ardhmen përmes një harmonie midis dritës, betonit dhe inovacionit."
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-xl font-light text-[#A1A1A6] leading-relaxed">
                  <p>
                    Cali Ing përfaqëson një epokë të re në arkitekturën moderne kosovare. Me një fokus të palëkundur te preciziteti inxhinierik, ne transformojmë konceptet më komplekse në realitete të prekshme që frymëzojnë.
                  </p>
                  <p>
                    Çdo projekt i yni udhëhiqet nga filozofia e "Ekselencës në Vizion", ku funksionaliteti takon estetikën radikale për të krijuar hapësira që jetojnë dhe marrin frymë së bashku me banorët e tyre.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Abstract Visual Element */}
            <div className="lg:col-span-5 relative pt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="relative aspect-[3/4] bg-[#242426] overflow-hidden border border-white/5 shadow-luxury"
              >
                <img
                  src="https://i.pinimg.com/736x/35/ac/9b/35ac9bb4a4582d78243f8c3f124ed308.jpg"
                  alt="Architectural Abstract"
                  className="h-full w-full object-cover transition duration-[3s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1B] via-transparent to-transparent opacity-40" />
                <div className="absolute top-10 right-10 h-36 w-36 border-[1px] border-[#C5A059]/30 rounded-full flex items-center justify-center">
                   <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold rotate-45">Vizioni 2026</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="mt-72 grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border-[1px] border-white/5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1.2 }}
                className="bg-[#1A1A1B] p-20 group hover:bg-white/[0.02] transition-colors duration-1000"
              >
                <span className="font-serif text-8xl font-light text-white/5 group-hover:text-[#C5A059]/10 transition-colors duration-1000 mb-16 block">
                  {p.id}
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F5F5F7] uppercase tracking-tight mb-8 group-hover:text-[#C5A059] transition-colors duration-700">
                  {p.title}
                </h3>
                <p className="text-lg font-light leading-relaxed text-[#A1A1A6] group-hover:text-[#F5F5F7] transition-colors duration-700">
                  {p.text}
                </p>
                <div className="mt-16 h-[1px] w-12 bg-[#C5A059]/20 group-hover:w-24 group-hover:bg-[#C5A059] transition-all duration-1000" />
              </motion.div>
            ))}
          </div>

          <div className="mt-64 flex flex-col items-center">
            <div className="h-32 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent mb-16" />
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center rounded-full border-2 border-[#C5A059] bg-transparent px-20 py-8 transition-all duration-300 hover:bg-[#C5A059] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.6)]"
            >
              <span className="relative z-10 text-[12px] font-bold tracking-[0.6em] text-[#C5A059] uppercase group-hover:text-black transition-colors duration-300">
                Na Kontaktoni
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}