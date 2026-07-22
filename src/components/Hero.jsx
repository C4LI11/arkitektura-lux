import { lazy, Suspense } from 'react'

const BlueprintGrid = lazy(() => import('./BlueprintGrid.jsx'))

export default function Hero({ title, subtitle, backgroundUrl, videoUrl, eyebrow, showGrid }) {
  const bg = backgroundUrl || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80`

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0">
        {showGrid ? (
          <Suspense fallback={<div className="h-full w-full bg-[#1a1a1a]" />}>
            <BlueprintGrid />
          </Suspense>
        ) : videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            className="h-full w-full object-cover"
            src={bg}
            alt=""
            loading="eager"
          />
        )}
        {/* Cinematic Overlays */}
        {!showGrid && (
          <>
            <div className="absolute inset-0 bg-[#1a1a1a]/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]" />
          </>
        )}
        {showGrid && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/20 to-[#1a1a1a]" />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow ? (
            <p className="mb-6 text-[10px] tracking-[0.6em] text-white/40 uppercase">
              {eyebrow.highlight} {eyebrow.rest}
            </p>
          ) : null}
          <h1 className="font-sans text-5xl font-black tracking-tight text-white uppercase sm:text-6xl lg:text-8xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {title}
          </h1>
          {subtitle ? (
            <div className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/60">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
