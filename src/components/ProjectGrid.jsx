import { motion } from 'framer-motion'

const defaultProjects = [
  {
    title: 'Concrete Museum',
    meta: 'MINIMALIST — 2026',
    query: 'modern minimalist concrete museum architecture',
  },
  {
    title: 'Glass Pavilion',
    meta: 'RESIDENCE — CURATED',
    query: 'modern luxury glass villa architecture',
  },
  {
    title: 'Noir Interior',
    meta: 'INTERIOR — NIGHT',
    query: 'luxury dark modern interior design',
  },
  {
    title: 'Monolith House',
    meta: 'PRIVATE — ARCHITECTURE',
    query: 'brutalist concrete house modern',
  },
  {
    title: 'Urban Oasis',
    meta: 'URBAN — PLANNING',
    query: 'modern urban architecture city park',
  },
  {
    title: 'Skyline Tower',
    meta: 'COMMERCIAL — SKYSCRAPER',
    query: 'modern glass skyscraper architecture',
  },
]

function imageUrl(query) {
  return `https://source.unsplash.com/2400x1600/?${encodeURIComponent(query)}`
}

export default function ProjectGrid({ title = 'PROJECTS', subtitle, projects = defaultProjects }) {
  return (
    <section className="bg-pitch">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/55">PORTFOLIO</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl">
              {title.split(' ').map((w, i) =>
                i === title.split(' ').length - 1 ? (
                  <span key={w} className="text-gold">
                    {w}
                  </span>
                ) : (
                  <span key={`${w}-${i}`}>{w} </span>
                ),
              )}
            </h2>
          </div>
          {subtitle ? (
            <p className="hidden sm:block max-w-lg text-sm leading-relaxed text-white/60">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition hover:bg-white/[0.04]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5">
                <div className="absolute inset-0 animate-pulse-slow bg-white/10" />
                <img
                  className="relative z-10 h-full w-full object-cover transition duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110"
                  src={imageUrl(p.query)}
                  alt=""
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-xs tracking-[0.35em] text-white/55">
                  {p.meta.split('—')[0].trim()} <span className="text-gold">—</span>{' '}
                  {p.meta.split('—')[1]?.trim() ?? ''}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-white/95">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Clean geometry, controlled light, and premium restraint — composed for a quiet,
                  expensive feel.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

