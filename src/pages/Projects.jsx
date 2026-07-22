import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { getProjects } from "../services/dataStore.js";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        // Prioritize image_url from database
        const mappedData = data.map(p => {
          let displayImage = p.image_url || p.image || p.imageUrl || PLACEHOLDER_IMAGE;
          
          // If the image is a local path, prepend the API URL if it's not already absolute
          if (displayImage && typeof displayImage === 'string' && displayImage.startsWith('/images/')) {
            const API_BASE = import.meta.env.VITE_API_URL
              ? import.meta.env.VITE_API_URL.replace("/api", "")
              : "https://arkitektura-backend.onrender.com";
            displayImage = `${API_BASE}${displayImage}`;
          }
          
          return {
            ...p,
            displayImage
          };
        });
        setProjects(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-[#1A1A1B] text-[#F5F5F7] min-h-screen selection:bg-[#C5A059]/30"
      >
        <div className="mx-auto max-w-[1800px] px-6 pt-40 sm:pt-56 pb-32">
          <div className="flex flex-col items-center text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-6"
            >
              <div className="h-[1px] w-12 bg-[#C5A059]" />
              <span className="text-[10px] tracking-[0.8em] text-[#C5A059] uppercase font-bold">
                Portfolio Ekskluzive
              </span>
              <div className="h-[1px] w-12 bg-[#C5A059]" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-[7vw] font-medium text-[#F5F5F7] uppercase leading-none tracking-tighter"
            >
              Veprat <span className="text-[#C5A059] italic">Tona</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-lg font-light text-[#A1A1A6] max-w-2xl font-serif italic"
            >
              "Një koleksion i hapësirave ku inxhinieria precize takon vizionin modern."
            </motion.p>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="h-[1px] w-32 bg-white/5 overflow-hidden rounded-full">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-full bg-[#C5A059]" 
                />
              </div>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {projects.map((project, idx) => (
                <motion.article
                  key={project.id || idx}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex flex-col"
                >
                  <Link
                    to={`/projects/${project.id || idx}`}
                    className="relative h-[400px] overflow-hidden bg-[#242426] border border-white/5 shadow-luxury transition-all duration-1000 group-hover:shadow-2xl group-hover:border-[#C5A059]/30"
                  >
                    <motion.img
                      src={project.displayImage}
                      alt={project.title}
                      crossOrigin="anonymous"
                      onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                      className="h-full w-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-1000" />
                    
                    {/* Hover Info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold mb-2">{project.category}</span>
                        <h3 className="font-serif text-2xl text-white uppercase">{project.title}</h3>
                    </div>
                  </Link>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">
                        {project.category}
                      </span>
                      <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    
                    <Link
                      to={`/projects/${project.id || idx}`}
                    >
                      <h2 className="font-serif text-2xl font-medium text-[#F5F5F7] uppercase tracking-tight transition-colors duration-500 group-hover:text-[#C5A059]">
                        {project.title}
                      </h2>
                    </Link>
                    
                    <p className="text-sm font-light leading-relaxed text-[#A1A1A6] line-clamp-2 italic">
                      {project.description || project.desc}
                    </p>
                    
                    <div className="pt-6 flex items-center justify-between gap-4">
                      <span className="text-[10px] tracking-[0.2em] text-[#666] uppercase font-medium">
                        {project.location || 'Kosovo'}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          <div className="mt-48 flex flex-col items-center">
            <div className="h-24 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent mb-12" />
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center rounded-full border-2 border-[#C5A059] bg-transparent px-20 py-8 transition-all duration-300 hover:bg-[#C5A059] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.6)]"
            >
              <span className="relative z-10 text-[11px] font-bold tracking-[0.6em] text-[#C5A059] uppercase group-hover:text-black transition-colors duration-300">
                Na Kontaktoni
              </span>
            </Link>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}