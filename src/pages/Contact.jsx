import { useState, lazy, Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell.jsx'
import { saveContactMessage, getPublicBusinessInfo } from '../services/dataStore.js'

const Contact3D = lazy(() => import('../components/Contact3D.jsx'))

const defaultBusinessInfo = {
  businessEmail: 'info@caliing.com',
  phoneNumber: '+383 44 123 456',
  officeAddress: 'Prishtinë, Kosovë',
  instagramUrl: 'https://instagram.com/caliing'
}

function Field({ label, children }) {
  return (
    <label className="block group">
      <span className="block text-[10px] tracking-[0.5em] text-[#A1A1A6] uppercase font-bold group-focus-within:text-[#C5A059] transition-colors duration-500">
        {label}
      </span>
      <div className="mt-4 relative">
        {children}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-1000 group-focus-within:w-full shadow-[0_0_10px_rgba(197,160,89,0.2)]" />
      </div>
    </label>
  )
}

const inputClass =
  'w-full border-b border-white/5 bg-transparent px-0 py-6 text-lg text-[#F5F5F7] font-light placeholder:text-white/5 outline-none transition-all duration-700 focus:border-transparent'

export default function Contact() {
  const [form, setForm] = useState({ emri: '', email: '', mesazhi: '' })
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState({ type: '', text: '' })
  const [businessInfo, setBusinessInfo] = useState(defaultBusinessInfo)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await getPublicBusinessInfo()
        setBusinessInfo({ ...defaultBusinessInfo, ...data })
      } catch (err) {
        console.error('Failed to load business info:', err)
      }
    }
    loadInfo()
  }, [])

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (notice.text) setNotice({ type: '', text: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emri = form.emri.trim()
    const email = form.email.trim()
    const mesazhi = form.mesazhi.trim()

    if (!emri || !email || !mesazhi) {
      setNotice({ type: 'error', text: 'Ju lutem plotësoni të gjitha fushat.' })
      return
    }
    if (!emailValid) {
      setNotice({ type: 'error', text: 'Email-i nuk është valid.' })
      return
    }

    setLoading(true)
    try {
      await saveContactMessage({ emri, email, mesazhi })
      setForm({ emri: '', email: '', mesazhi: '' })
      setNotice({
        type: 'success',
        text: 'Mesazhi u dërgua me sukses. Arkitekti do t’ju kontaktojë.',
      })
    } catch {
      setNotice({
        type: 'error',
        text: 'Ndodhi një problem gjatë dërgimit. Ju lutem provoni përsëri.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <section className="relative min-h-screen bg-[#1A1A1B] pt-28 pb-20 sm:pt-48 sm:pb-32 lg:pt-72 lg:pb-64 overflow-x-hidden overflow-y-visible selection:bg-[#C5A059]/30">
        {/* Background Sophistication */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#242426] via-[#1A1A1B] to-[#1A1A1B]" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        </div>
        
        {/* Subtle Accents */}
        <div className="absolute top-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-[#C5A059]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1800px] px-6">
          <div className="grid grid-cols-1 gap-12 sm:gap-20 lg:gap-32 lg:grid-cols-12">
            
            {/* Left Side: Information */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className="mb-12 flex items-center gap-6">
                  <div className="h-[1px] w-16 bg-[#C5A059]" />
                  <span className="text-[12px] tracking-[1em] text-[#C5A059] uppercase font-bold">
                    Kontakti
                  </span>
                </div>
                
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-light text-[#F5F5F7] uppercase leading-[0.85] tracking-tighter mb-10 sm:mb-16">
                  Le të <span className="text-[#C5A059] italic">Fillojmë</span>.
                </h1>
                
                <p className="mt-8 sm:mt-16 text-base sm:text-xl font-light leading-relaxed text-[#A1A1A6] max-w-lg font-serif italic">
                  "Çdo bashkëpunim i suksesshëm fillon me një bisedë të sinqertë. Ne jemi këtu për t'ju dëgjuar dhe për t'i dhënë formë ideve tuaja më guximtare."
                </p>

                <div className="mt-16 sm:mt-32 space-y-8 sm:space-y-16">
                  <div className="group flex items-center gap-6 sm:gap-10">
                    <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.01] transition-all duration-700 group-hover:border-[#C5A059]/30 group-hover:bg-white/[0.03] shadow-sm shrink-0">
                      <span className="text-base sm:text-xl opacity-40 group-hover:opacity-100 transition-opacity">📍</span>
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0">
                      <p className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">Lokacioni</p>
                      <p className="text-base sm:text-xl font-light text-[#A1A1A6] break-words">{businessInfo.officeAddress}</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 sm:gap-10">
                    <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.01] transition-all duration-700 group-hover:border-[#C5A059]/30 group-hover:bg-white/[0.03] shadow-sm shrink-0">
                      <span className="text-base sm:text-xl opacity-40 group-hover:opacity-100 transition-opacity">✉️</span>
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0">
                      <p className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">Email</p>
                      <p className="text-base sm:text-xl font-light text-[#A1A1A6] break-words">{businessInfo.businessEmail}</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 sm:gap-10">
                    <div className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.01] transition-all duration-700 group-hover:border-[#C5A059]/30 group-hover:bg-white/[0.03] shadow-sm shrink-0">
                      <span className="text-base sm:text-xl opacity-40 group-hover:opacity-100 transition-opacity">📞</span>
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0">
                      <p className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">Telefon</p>
                      <p className="text-base sm:text-xl font-light text-[#A1A1A6] break-words">{businessInfo.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Glassmorphism Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-8 sm:p-16 lg:p-24 shadow-luxury overflow-hidden"
              >
                {/* Decorative glow inside card */}
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none" />
                
                <form onSubmit={handleSubmit} className="relative z-10 space-y-10 sm:space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
                    <Field label="Emri i Plotë">
                      <input
                        className={inputClass}
                        placeholder="Emri juaj..."
                        value={form.emri}
                        onChange={onChange('emri')}
                      />
                    </Field>

                    <Field label="Adresa Email">
                      <input
                        className={inputClass}
                        type="email"
                        placeholder="email@shembull.com"
                        value={form.email}
                        onChange={onChange('email')}
                      />
                    </Field>
                  </div>

                  <Field label="Mesazhi Juaj">
                    <textarea
                      rows={4}
                      className={inputClass}
                      placeholder="Përshkruani vizionin tuaj shkurtimisht..."
                      value={form.mesazhi}
                      onChange={onChange('mesazhi')}
                    />
                  </Field>

                  {notice.text && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={[
                        'rounded-3xl p-8 text-[11px] font-bold tracking-widest uppercase',
                        notice.type === 'error'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 shadow-sm',
                      ].join(' ')}
                    >
                      {notice.text}
                    </motion.div>
                  )}

                  <div className="pt-10">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-full bg-[#C5A059] py-6 sm:py-8 text-[10px] sm:text-[11px] font-bold tracking-[0.6em] sm:tracking-[0.8em] text-black uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.6)] disabled:opacity-50"
                    >
                      <span className="relative z-10">
                        {loading ? 'Duke u dërguar...' : 'Dërgo Mesazhin'}
                      </span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
        
        {/* Bottom Decorative Element */}
        <div className="mt-32 sm:mt-48 lg:mt-72 flex flex-col items-center">
          <div className="h-20 sm:h-40 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent" />
        </div>
      </section>
    </PageShell>
  )
}