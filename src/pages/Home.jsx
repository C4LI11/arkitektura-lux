import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, lazy, Suspense } from "react";
import PageShell from "../components/PageShell.jsx";

const BlueprintGrid = lazy(() => import("../components/BlueprintGrid.jsx"));

const easeOut = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    quote:
      "Transformimi i hapësirës sonë tejkaloi çdo pritshmëri. Një saktësi e rrallë.",
    author: "Familja Krasniqi",
    role: "Rezidenca Luna",
  },
  {
    quote: "Arkitekturë që nuk ndjek trendet, por krijon trashëgimi.",
    author: "Dr. Agon Selimi",
    role: "Kulla 2B",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <PageShell>
      <div ref={containerRef} className="relative">
        {/* —— Hero Section (Single Cinematic Video from Public Folder) —— */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1B]">
          <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover" 
            >
              <source src="/images/caliing.mp4" type="video/mp4" />
    
            </video>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1B]/80 via-transparent to-[#1A1A1B]" />
          </motion.div>

          <div className="relative z-10 w-full max-w-[1800px] px-6 sm:px-12">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeOut }}
                className="mb-12 flex items-center gap-8"
              >
                <div className="h-[1px] w-20 bg-[#C5A059]" />
                <span className="text-[12px] tracking-[1em] text-[#C5A059] uppercase font-bold">
                  Moderniteti • Inovacioni • Inxhinieria Precize
                </span>
                <div className="h-[1px] w-20 bg-[#C5A059]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: easeOut }}
                className="font-serif text-[15vw] sm:text-[12vw] font-medium leading-[0.8] tracking-tighter text-[#F5F5F7] uppercase"
              >
                Cali <span className="text-[#C5A059] italic">Ing</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: easeOut }}
                className="mt-24"
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="relative overflow-hidden rounded-full border-2 border-[#C5A059] bg-transparent px-20 py-8 text-[12px] font-bold tracking-[0.6em] text-[#C5A059] uppercase transition-all duration-300 hover:bg-[#C5A059] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.6)]"
                >
                  Eksploro Vizionin
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* —— Reveal Section (Biography) —— */}
        <section
          id="about"
          className="relative py-72 bg-[#1A1A1B] overflow-hidden border-t border-white/5"
        >
          <div className="mx-auto max-w-[1600px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: easeOut }}
                className="relative group"
              >
                <div className="absolute -inset-6 border-[1px] border-[#C5A059]/10 translate-x-12 translate-y-12 transition-transform duration-1000 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative aspect-[4/5] overflow-hidden bg-[#242426] border-premium shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
                    alt="Architectural Vision"
                    className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1B] via-transparent to-transparent opacity-40" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: 0.2, ease: easeOut }}
                className="space-y-20"
              >
                <div className="space-y-8">
                  <span className="text-[10px] tracking-[1em] text-[#C5A059] uppercase font-bold">
                    Moderniteti & Inovacioni
                  </span>
                  <h2 className="font-serif text-6xl sm:text-8xl font-light text-[#F5F5F7] uppercase leading-[0.85] tracking-tighter">
                    Inxhinieria{" "}
                    <span className="text-[#C5A059] italic">Precize</span>.
                  </h2>
                </div>

                <div className="space-y-12 text-xl font-light leading-relaxed text-[#A1A1A6]">
                  <p className="max-w-xl font-serif italic text-white/90">
                    Në Cali Ing, arkitektura është një bashkim i guximshëm midis
                    modernitetit radikal dhe inxhinierisë më precize në rajon.
                  </p>
                  <p className="max-w-xl">
                    Çdo strukturë që ne projektojmë është një dëshmi e
                    inovacionit teknologjik, ku materialet e fundit ndërthuren
                    me një estetikë minimale për të krijuar hapësira që
                    frymëzojnë brezat e ardhshëm.
                  </p>
                </div>

                <div className="pt-16">
                  <div className="h-[1px] w-48 bg-gradient-to-r from-[#C5A059] to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* —— Testimonials —— */}
        <section className="bg-[#1A1A1B] py-72 border-t border-white/5">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-white/5 border-[1px] border-white/5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1.2, ease: easeOut }}
                  className="relative p-24 bg-[#1A1A1B] group hover:bg-white/[0.02] transition-all duration-1000"
                >
                  <p className="font-serif text-4xl leading-tight text-[#F5F5F7]/80 font-light mb-20 italic text-balance">
                    «{t.quote}»
                  </p>
                  <div className="flex items-center gap-10">
                    <div className="h-[1px] w-16 bg-[#C5A059]" />
                    <div className="space-y-3">
                      <p className="text-[12px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">
                        {t.author}
                      </p>
                      <p className="text-[10px] tracking-[0.2em] text-[#A1A1A6] uppercase font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
