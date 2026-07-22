import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageShell from '../components/PageShell.jsx'
import { getProjects } from '../services/dataStore.js'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80'

const getGalleryImages = (project) => {
  const API_BASE = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "https://arkitektura-backend.onrender.com";
  
  const defaults = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
  ]
  
  const getImageUrl = (index) => {
    const key = `gallery_${index + 1}_url`;
    const dbUrl = project[key];
    if (dbUrl) {
      if (dbUrl.startsWith('/images/')) {
        return API_BASE + dbUrl;
      }
      return dbUrl;
    }
    return null;
  };
  
  const getCaption = (index) => {
    const key = `gallery_${index + 1}_caption`;
    return project[key] || '';
  };
  
  const sizes = ['wide', 'medium', 'medium', 'medium', 'medium', 'wide'];
  
  return [0,1,2,3,4,5].map((index) => {
    const dbUrl = getImageUrl(index);
    const caption = getCaption(index);
    return {
      src: dbUrl || defaults[index],
      fallback: defaults[index],
      caption: caption,
      size: sizes[index]
    };
  });
}

const getAreaFromProject = (proj) => {
  const raw = proj?.siperfaqja || proj?.surface || proj?.area
  if (!raw) return null
  const parsed = Number(raw)
  return (!isNaN(parsed) && parsed > 0) ? parsed : null
}

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then((data) => {
        const mappedData = data.map(p => {
          let displayImage = p.image_url || p.image || p.imageUrl || PLACEHOLDER_IMAGE;
          
          if (displayImage && typeof displayImage === 'string' && displayImage.startsWith('/images/')) {
            const API_BASE = import.meta.env.VITE_API_URL
              ? import.meta.env.VITE_API_URL.replace("/api", "")
              : "https://arkitektura-backend.onrender.com";
            displayImage = `${API_BASE}${displayImage}`;
          }
          
          return {
            ...p,
            image_url: displayImage
          };
        });
        
        const numericId = parseInt(id, 10)
        const foundProject = mappedData.find(p => p.id === numericId) || mappedData[0]
        setProject(foundProject)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching projects:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center min-h-[85vh] bg-[#050505]">
          <div className="text-[#F5F5DC]/30 text-lg font-light tracking-[0.6em] uppercase">Loading</div>
        </div>
      </PageShell>
    )
  }

  if (!project) {
    return (
      <PageShell>
        <div className="flex items-center justify-center min-h-[85vh] bg-[#050505]">
          <div className="text-[#F5F5DC]/30 text-lg font-light">Project not found</div>
        </div>
      </PageShell>
    )
  }

  const area = getAreaFromProject(project)
  const galleryImages = getGalleryImages(project)

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="min-h-[85vh] w-full bg-[#050505]"
      >
        {/* Cinematic Hero Section */}
        <div className="relative min-h-[85vh] flex items-end">
          <div className="absolute inset-0">
            <motion.img
              src={project.image_url}
              alt={project.title}
              crossOrigin="anonymous"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="h-full w-full object-cover rounded-b-[40px] md:rounded-b-[60px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent rounded-b-[40px] md:rounded-b-[60px]" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-12 md:px-24 lg:px-32 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-[#D4AF37] leading-[0.95] tracking-tighter mb-8">
                {project.title.toUpperCase()}
              </h1>

              <div className="flex items-center gap-8">
                {area !== null && (
                  <div className="flex items-center gap-3">
                    <span className="text-[#F5F5DC]/40 text-[10px] tracking-[0.6em] uppercase font-light">Area</span>
                    <span className="text-[#F5F5DC]/70 text-lg font-light tracking-[0.2em]">{area} m²</span>
                  </div>
                )}
                {area !== null && project.category && (
                  <div className="w-px h-4 bg-[#D4AF37]/30" />
                )}
                {project.category && (
                  <div className="flex items-center gap-3">
                    <span className="text-[#F5F5DC]/40 text-[10px] tracking-[0.6em] uppercase font-light">Category</span>
                    <span className="text-[#F5F5DC]/70 text-lg font-light tracking-[0.2em]">{project.category}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Description Section */}
        <div className="max-w-7xl mx-auto px-12 md:px-24 lg:px-32 py-24">
          <div className="bg-[#050505]/90 backdrop-blur-xl border border-[#F5F5DC]/5 rounded-[40px] p-12 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <p className="text-[#F5F5DC]/60 text-xl md:text-2xl font-light leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="space-y-8">
                  {project.year && (
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-px bg-[#D4AF37]/50" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#F5F5DC]/30 text-[10px] tracking-[0.6em] uppercase font-light">Year</span>
                        <span className="text-[#D4AF37] text-lg font-light tracking-[0.2em]">{project.year}</span>
                      </div>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-px bg-[#D4AF37]/50" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#F5F5DC]/30 text-[10px] tracking-[0.6em] uppercase font-light">Location</span>
                        <span className="text-[#D4AF37] text-lg font-light tracking-[0.2em]">{project.location}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-px bg-[#D4AF37]/50" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[#F5F5DC]/30 text-[10px] tracking-[0.6em] uppercase font-light">Client</span>
                      <span className="text-[#D4AF37] text-lg font-light tracking-[0.2em]">Private</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Advanced Bento Gallery */}
        <div className="max-w-7xl mx-auto px-12 md:px-24 lg:px-32 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Photo 1: Main (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-2 lg:col-span-2 row-span-2 aspect-square lg:aspect-auto"
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[0].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[0].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm md:text-base font-light tracking-[0.6em] uppercase">
                      {galleryImages[0].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Photo 2: Vertical Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-1 lg:col-span-1 aspect-[3/4]"
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[1].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[1].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm font-light tracking-[0.6em] uppercase">
                      {galleryImages[1].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Photo 3: Vertical Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-1 lg:col-span-1 aspect-[3/4]"
            >
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[2].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[2].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm font-light tracking-[0.6em] uppercase">
                      {galleryImages[2].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Photo 4: Bottom Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]"
            >
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[3].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[3].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm font-light tracking-[0.6em] uppercase">
                      {galleryImages[3].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Photo 5: Bottom Middle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]"
            >
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[4].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[4].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm font-light tracking-[0.6em] uppercase">
                      {galleryImages[4].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Photo 6: Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="relative group overflow-hidden rounded-[40px] col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]"
            >
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].caption || 'Gallery photo'}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.src = galleryImages[5].fallback
                }}
                className="h-full w-full object-cover transition-all duration-800 ease-out group-hover:scale-105"
              />
              {galleryImages[5].caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out">
                    <span className="text-[#D4AF37] text-sm font-light tracking-[0.6em] uppercase">
                      {galleryImages[5].caption}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PageShell>
  )
}
