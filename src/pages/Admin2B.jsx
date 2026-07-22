import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import PageShell from '../components/PageShell.jsx'
import { getAdminMessages, deleteAdminMessage, loginAdmin, getProjects, deleteAdminProject, getBusinessInfo, updateBusinessInfo } from '../services/dataStore.js'
import * as dataStore from '../services/dataStore.js'
import { API_URL } from '../services/dataStore.js'

function Sidebar({ activeTab, setActiveTab, onLogout, sidebarOpen, setSidebarOpen }) {
  const tabs = [
    { id: 'messages', label: 'Mesazhet', icon: '✉️' },
    { id: 'add-project', label: 'Shto Projekt', icon: '➕' },
    { id: 'portfolio', label: 'Portofoli', icon: '📁' },
    { id: 'settings', label: 'Cilësimet', icon: '⚙️' }
  ]

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <motion.div 
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : '-100%',
          opacity: sidebarOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 bottom-0 w-72 sm:w-80 glass-sidebar z-50 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto sm:translate-x-0"
      >
        <div className="space-y-24">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.8em] text-[#C5A059] uppercase font-bold opacity-60">Control Panel</span>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="sm:hidden text-white/40 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-6 sm:space-y-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSidebarOpen(false)
                }}
                className={`flex items-center gap-6 sm:gap-8 w-full text-left transition-all duration-700 group relative p-3 sm:p-4 rounded-xl border ${
                  activeTab === tab.id ? 'text-[#C5A059] border-[#C5A059]/40 bg-[#C5A059]/5' : 'text-[#A1A1A6] hover:text-[#F5F5F7] border-transparent'
                }`}
              >
                <span className={`text-lg sm:text-xl transition-all duration-700 ${activeTab === tab.id ? 'opacity-100 scale-110' : 'opacity-20 group-hover:opacity-40'}`}>
                  {tab.icon}
                </span>
                <span className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase font-bold">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeGlow" 
                    className="absolute -left-2 w-[2px] h-6 bg-[#C5A059] shadow-[0_0_15px_#C5A059]" 
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="h-[1px] w-full bg-white/5" />
          <button 
            onClick={onLogout}
            className="flex items-center gap-6 text-[#A1A1A6] hover:text-red-500 transition-all duration-700 group"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold">Sign Out</span>
            <div className="h-[1px] w-12 bg-white/5 group-hover:bg-red-500/20 transition-all duration-700" />
          </button>
        </div>
      </motion.div>
    </>
  )
}

function MessageCard({ message, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-8 sm:p-14 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 hover:border-[#C5A059]/50 transition-all duration-1000 group relative overflow-hidden shadow-luxury"
    >
      <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <button 
          onClick={() => onDelete(message.id)}
          className="h-12 w-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 text-red-500/40 hover:text-red-500 transition-all duration-500"
        >
          <span className="text-sm">✕</span>
        </button>
      </div>

      <div className="space-y-10">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059]" />
              <span className="text-[10px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">New Lead</span>
            </div>
            <h3 className="font-serif text-3xl text-[#F5F5F7] font-light tracking-tight">{message.name}</h3>
            <p className="text-[11px] text-[#A1A1A6] font-medium tracking-[0.1em]">{message.email}</p>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/10 uppercase font-black pt-2">{message.created_at?.split('T')[0]}</span>
        </div>

        <div className="pt-10 border-t border-white/5 relative">
          <div className="absolute -top-[0.5px] left-0 w-20 h-[1px] bg-[#C5A059]/30" />
          <p className="text-lg text-[#A1A1A6] font-light leading-relaxed italic font-serif">
            "{message.message}"
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCardAdmin({ project, onDelete }) {
  const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'https://arkitektura-backend.onrender.com';
  const displayImage = (project.image_url && project.image_url.startsWith('/images/')) 
    ? `${API_BASE}${project.image_url}` 
    : (project.image_url || project.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl overflow-hidden group border border-white/5 hover:border-[#C5A059]/30 transition-all duration-700 bg-[#0A0A0B] shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={displayImage} 
          className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-70" />
        
        <button 
          onClick={() => onDelete(project.id)}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/30 hover:text-red-500 hover:bg-red-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100 border border-white/10"
        >
          ✕
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-6 bg-[#C5A059]" />
          <span className="text-[9px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">{project.category}</span>
        </div>
        <h3 className="font-serif text-xl text-[#F5F5F7] font-light">{project.title}</h3>
        <div className="flex justify-between items-center text-[9px] text-[#A1A1A6] uppercase font-bold tracking-[0.25em] pt-4 border-t border-white/5">
          <span className="flex items-center gap-2">
            <span className="opacity-40">LOC.</span> {project.location}
          </span>
          <span>{project.year}</span>
        </div>
      </div>
    </motion.div>
  )
}

function AddProjectForm({ onProjectAdded }) {
  const [form, setForm] = useState({ 
    title: '', category: '', location: '', year: '', area: '', description: '',
    gallery_1_caption: '', gallery_2_caption: '', gallery_3_caption: '',
    gallery_4_caption: '', gallery_5_caption: '', gallery_6_caption: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([null, null, null, null, null, null])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('category', form.category)
    formData.append('description', form.description)
    formData.append('location', form.location)
    formData.append('year', form.year)
    formData.append('area', form.area)
    formData.append('gallery_1_caption', form.gallery_1_caption)
    formData.append('gallery_2_caption', form.gallery_2_caption)
    formData.append('gallery_3_caption', form.gallery_3_caption)
    formData.append('gallery_4_caption', form.gallery_4_caption)
    formData.append('gallery_5_caption', form.gallery_5_caption)
    formData.append('gallery_6_caption', form.gallery_6_caption)
    
    if (imageFile) formData.append('image', imageFile)
    
    galleryFiles.forEach((file, index) => {
      if (file) formData.append(`gallery_${index + 1}`, file)
    })

    try {
      const response = await axios.post(`${API_URL}/projects`, formData)
      
      console.log('Projekti u shtua me sukses:', response.data)
      
      setSuccess(true)
      onProjectAdded()
      setForm({ 
        title: '', category: '', location: '', year: '', area: '', description: ''
      })
      setImageFile(null)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Frontend Upload Error:', err)
      alert('Error: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-[#F5F5F7] outline-none focus:border-[#C5A059] focus:bg-white/[0.05] transition-all duration-700 font-light placeholder:text-white/10"

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-[#C5A059]/20 bg-[#0A0A0B] shadow-lg transition-all duration-1000 relative overflow-hidden"
    >
      <div className="mb-8 sm:mb-12 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 sm:w-10 bg-[#C5A059]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.6em] text-[#C5A059] uppercase font-bold">New Creation</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F7] tracking-tight">Arkivoni një <span className="text-[#C5A059] italic">Vepër</span></h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Titulli i Projektit</label>
            <input 
              className={inputClass} 
              placeholder="p.sh. Vila Noir"
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Kategoria</label>
            <input 
              className={inputClass} 
              placeholder="p.sh. Arkitekturë Rezidenciale"
              value={form.category} 
              onChange={e => setForm({...form, category: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Ngarko Imazhin (Lokal)</label>
            <div className="relative group">
              <input 
                id="project-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setImageFile(e.target.files[0])}
                required 
              />
              <label 
                htmlFor="project-image-upload"
                className={`${inputClass} flex items-center justify-between cursor-pointer group-hover:border-[#C5A059]/50`}
              >
                <span className={imageFile ? 'text-[#F5F5F7]' : 'text-white/10'}>
                  {imageFile ? imageFile.name : 'Zgjidhni një foto...'}
                </span>
                <span className="text-[#C5A059] text-xs">Upload</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Lokacioni</label>
              <input className={inputClass} value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Viti</label>
              <input type="number" className={inputClass} value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Sipërfaqja (m²)</label>
              <input type="number" className={inputClass} value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Përshkrimi Arkitektonik</label>
          <textarea 
            rows={4} 
            className={`${inputClass} resize-none`} 
            placeholder="Përshkruani vizionin, materialet dhe esencën e projektit..."
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            required 
          />
        </div>

        <div className="space-y-4 sm:space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-6 bg-[#C5A059]" />
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">Galeria (6 Foto)</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[0,1,2,3,4,5].map((index) => (
                <div key={index} className="space-y-2 sm:space-y-3">
                  <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">
                    Foto {index + 1}
                  </label>
                  <div className="relative group">
                    <input 
                      id={`gallery-${index}-upload`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const newGalleryFiles = [...galleryFiles]
                        newGalleryFiles[index] = e.target.files[0]
                        setGalleryFiles(newGalleryFiles)
                      }}
                    />
                    <label 
                      htmlFor={`gallery-${index}-upload`}
                      className={`${inputClass} flex items-center justify-between cursor-pointer group-hover:border-[#C5A059]/50`}
                    >
                      <span className={galleryFiles[index] ? 'text-[#F5F5F7]' : 'text-white/10'}>
                        {galleryFiles[index]?.name || 'Zgjidhni një foto...'}
                      </span>
                      <span className="text-[#C5A059] text-xs">Upload</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-3">
                      Përshkrimi i Fotos
                    </label>
                    <input 
                      className={inputClass} 
                      placeholder={`Përshkrim për Foto ${index + 1}...`}
                      value={form[`gallery_${index + 1}_caption`]} 
                      onChange={e => setForm({...form, [`gallery_${index + 1}_caption`]: e.target.value})} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        <div className="pt-4 flex flex-col gap-4 sm:gap-5">
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-4"
              >
                <span className="text-[#C5A059] text-sm">✓</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold">Projekt u shtua me sukses në arkivë</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={loading}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#C5A059] px-8 sm:px-10 py-3 sm:py-4 transition-all duration-700 hover:bg-[#D5B069] shadow-lg disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.5em] sm:tracking-[0.6em] text-white uppercase">
                {loading ? 'Duke u dërguar...' : 'Publiko Projektin'}
              </span>
              {!loading && <div className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white transition-all duration-700" />}
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

const defaultBusinessInfo = {
  businessEmail: 'info@caliing.com',
  phoneNumber: '+383 44 123 456',
  officeAddress: 'Prishtinë, Kosovë',
  instagramUrl: 'https://instagram.com/caliing'
}

function SettingsForm() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [businessForm, setBusinessForm] = useState(defaultBusinessInfo)
  const [businessSuccess, setBusinessSuccess] = useState(false)
  const [businessLoading, setBusinessLoading] = useState(false)
  const [fetchingBusinessInfo, setFetchingBusinessInfo] = useState(true)

  const loadBusinessInfo = async () => {
    try {
      const data = await getBusinessInfo()
      setBusinessForm({ ...defaultBusinessInfo, ...data })
    } catch (err) {
      console.error('Failed to load business info:', err)
    } finally {
      setFetchingBusinessInfo(false)
    }
  }

  useEffect(() => {
    loadBusinessInfo()
  }, [])

  const handlePasswordUpdate = async (e) => { 
    e.preventDefault(); 
    if (!newPassword) return alert('Shkruaj fjalëkalimin e ri!'); 
    try { 
        await dataStore.updatePassword(null, newPassword); 
        alert('Fjalëkalimi u ndryshua me sukses!'); 
        setNewPassword(''); 
    } catch (err) { 
        alert('Gabim: ' + err.message); 
    } 
};

  const handleSaveBusiness = async (e) => {
    e.preventDefault()
    setBusinessLoading(true)
    setBusinessSuccess(false)

    try {
      await updateBusinessInfo(businessForm)
      setBusinessSuccess(true)
      alert('Të dhënat u ruajtën me sukses!')
      await loadBusinessInfo()
      setTimeout(() => setBusinessSuccess(false), 5000)
    } catch (err) {
      alert('Gabim gjatë ruajtjes së të dhënave.')
    } finally {
      setBusinessLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-[#F5F5F7] outline-none focus:border-[#C5A059] focus:bg-white/[0.05] transition-all duration-700 font-light placeholder:text-white/10"

  return (
    <motion.div 
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 sm:space-y-12"
    >
      <div className="mb-10 sm:mb-16 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 sm:w-12 bg-[#C5A059]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.6em] text-[#C5A059] uppercase font-bold">Cilësimet</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F7] tracking-tight">Menaxhoni <span className="text-[#C5A059] italic">Llogarinë</span></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* SECTION 1: SIGURIA (Security) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 sm:p-8 lg:p-12 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-luxury border border-[#C5A059]/30"
        >
          <div className="mb-6 sm:mb-10 space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-6 sm:w-8 bg-[#C5A059]" />
              <span className="text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">Siguria</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">Siguria e Llogarisë</h4>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Fjalëkalimi Aktual</label>
              <input 
                type="password" 
                className={inputClass} 
                placeholder="••••••••"
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Fjalëkalimi i Ri</label>
              <input 
                type="password" 
                className={inputClass} 
                placeholder="••••••••"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Konfirmo Fjalëkalimin</label>
              <input 
                type="password" 
                className={inputClass} 
                placeholder="••••••••"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>

            <div className="pt-4 flex flex-col gap-4 sm:gap-6">
              <button 
                type="submit" 
                className="group relative w-full overflow-hidden rounded-full bg-[#C5A059] py-6 sm:py-8 transition-all duration-1000 hover:bg-[#D5B069] shadow-2xl"
              >
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.6em] sm:tracking-[0.8em] text-white uppercase">
                    Përditëso Fjalëkalimin
                  </span>
                  <div className="h-2 w-2 rounded-full bg-white/40 group-hover:bg-white transition-all duration-700" />
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* SECTION 2: KONFIGURIMET E BIZNESIT (Business Info) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 sm:p-8 lg:p-12 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-luxury border border-[#C5A059]/30"
        >
          <div className="mb-6 sm:mb-10 space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-6 sm:w-8 bg-[#C5A059]" />
              <span className="text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">Biznesi</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">Informatat e Cali Ing</h4>
          </div>

          <form onSubmit={handleSaveBusiness} className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Email-i i Biznesit</label>
              <input 
                type="email" 
                className={inputClass} 
                placeholder="info@caliing.com"
                value={businessForm.businessEmail} 
                onChange={e => setBusinessForm({...businessForm, businessEmail: e.target.value})} 
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Numri i Telefonit</label>
              <input 
                type="tel" 
                className={inputClass} 
                placeholder="+383 44 123 456"
                value={businessForm.phoneNumber} 
                onChange={e => setBusinessForm({...businessForm, phoneNumber: e.target.value})} 
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Adresa</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="Prishtinë, Kosovë"
                value={businessForm.officeAddress} 
                onChange={e => setBusinessForm({...businessForm, officeAddress: e.target.value})} 
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Linku i Instagram-it</label>
              <input 
                type="url" 
                className={inputClass} 
                placeholder="https://instagram.com/caliing"
                value={businessForm.instagramUrl} 
                onChange={e => setBusinessForm({...businessForm, instagramUrl: e.target.value})} 
              />
            </div>

            <div className="pt-4 flex flex-col gap-4 sm:gap-6">
              <AnimatePresence>
                {businessSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center gap-4"
                  >
                    <span className="text-[#C5A059] text-sm">✓</span>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold">Të dhënat u ruajtën me sukses!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={businessLoading}
                className="group relative w-full overflow-hidden rounded-full bg-[#C5A059] py-6 sm:py-8 transition-all duration-1000 hover:bg-[#D5B069] shadow-2xl disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.6em] sm:tracking-[0.8em] text-white uppercase">
                    {businessLoading ? 'Duke u ruajtur...' : 'Ruaj Ndryshimet'}
                  </span>
                  {!businessLoading && <div className="h-2 w-2 rounded-full bg-white/40 group-hover:bg-white transition-all duration-700" />}
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Admin2B() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('messages')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    checkAuth()
    if (isLoggedIn) {
      loadMessages()
      loadProjects()
    }
  }, [isLoggedIn])

  const loadMessages = async () => {
    try {
      const data = await getAdminMessages()
      setMessages(data)
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  }

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Failed to load projects:', err)
    }
  }

  const handleDeleteMessage = async (id) => {
    try {
      await deleteAdminMessage(id)
      loadMessages()
    } catch (err) {
      console.error('Failed to delete message:', err)
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      await deleteAdminProject(id)
      loadProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
    setActiveTab('messages')
  }

  const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')

      try {
        const data = await loginAdmin(username, password)
        localStorage.setItem('admin_token', data.token)
        setIsLoggedIn(true)
        loadMessages()
        loadProjects()
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-16 rounded-[3.5rem] shadow-luxury border border-white/5 max-w-lg w-full"
          >
            <div className="mb-16 space-y-6 text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-[#C5A059]" />
                <span className="text-[10px] tracking-[0.6em] text-[#C5A059] uppercase font-bold">Control Panel</span>
                <div className="h-[1px] w-12 bg-[#C5A059]" />
              </div>
              <h1 className="font-serif text-5xl text-[#F5F5F7] tracking-tighter">
                Cali Ing<span className="text-[#C5A059]">.</span>
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Përdoruesi</label>
                <input 
                  type="text" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-[#F5F5F7] outline-none focus:border-[#C5A059] focus:bg-white/[0.05] transition-all duration-700 font-light placeholder:text-white/10"
                  placeholder="admin"
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[9px] tracking-[0.4em] text-[#A1A1A6] uppercase font-bold ml-4">Fjalëkalimi</label>
                <input 
                  type="password" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-[#F5F5F7] outline-none focus:border-[#C5A059] focus:bg-white/[0.05] transition-all duration-700 font-light placeholder:text-white/10"
                  placeholder="••••••••"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center justify-center gap-4"
                >
                  <span className="text-red-500 text-sm">✕</span>
                  <span className="text-[10px] tracking-[0.3em] text-red-500 uppercase font-bold">{error}</span>
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-full bg-[#C5A059] py-8 transition-all duration-1000 hover:bg-[#D5B069] shadow-2xl disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <span className="text-[11px] font-bold tracking-[0.8em] text-white uppercase">
                    {loading ? 'Duke u loguar...' : 'Hyr në Admin'}
                  </span>
                  {!loading && <div className="h-2 w-2 rounded-full bg-white/40 group-hover:bg-white transition-all duration-700" />}
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </form>
          </motion.div>
        </div>
      </PageShell>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <PageShell>
      <div className="min-h-screen sm:ml-80">
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-6 left-6 z-40 sm:hidden flex flex-col gap-1.5 p-2 bg-[#1A1A1B]/80 backdrop-blur-md rounded-xl border border-white/5"
        >
          <div className="h-0.5 w-5 bg-white" />
          <div className="h-0.5 w-5 bg-white" />
          <div className="h-0.5 w-5 bg-white" />
        </button>
        
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="p-4 sm:p-8 lg:p-12 pt-20 sm:pt-20">
          <AnimatePresence mode="wait">
            {activeTab === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="mb-16 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#C5A059]" />
                    <span className="text-[10px] tracking-[0.6em] text-[#C5A059] uppercase font-bold">Inbox</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F7] tracking-tight">Menaxhoni <span className="text-[#C5A059] italic">Mesazhet</span></h3>
                </div>

                <div className="space-y-8">
                  {messages.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card p-10 sm:p-20 rounded-[2rem] sm:rounded-[3.5rem] border border-white/5 text-center"
                    >
                      <span className="text-6xl opacity-20">📭</span>
                      <p className="text-[#A1A1A6] font-light mt-8">Asnjë mesazh i ri</p>
                    </motion.div>
                  ) : (
                    messages.map((message) => (
                      <MessageCard key={message.id} message={message} onDelete={handleDeleteMessage} />
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'add-project' && (
              <AddProjectForm onProjectAdded={loadProjects} />
            )}

            {activeTab === 'portfolio' && (
              <motion.div 
                key="portfolio"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="mb-16 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#C5A059]" />
                    <span className="text-[10px] tracking-[0.6em] text-[#C5A059] uppercase font-bold">Arkivi</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F7] tracking-tight">Menaxhoni <span className="text-[#C5A059] italic">Portofolin</span></h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {projects.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full p-16 rounded-3xl border border-white/5 text-center bg-[#0A0A0B]"
                    >
                      <span className="text-5xl opacity-20">🏗️</span>
                      <p className="text-[#A1A1A6] font-light mt-6">Asnjë projekt në arkiv</p>
                    </motion.div>
                  ) : (
                    projects.map((project) => (
                      <ProjectCardAdmin key={project.id} project={project} onDelete={handleDeleteProject} />
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <SettingsForm />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  )
}
