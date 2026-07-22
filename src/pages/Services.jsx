import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { getProjects } from "../services/dataStore.js";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staticServices = [
  {
    title: "Arkitektura",
    description:
      "Projektim i avancuar ku çdo strukturë është një monument i modernitetit radikal dhe funksionalitetit të përsosur.",
    image:
      "https://i.pinimg.com/736x/f8/d4/3c/f8d43c3eb898324bcc053a9b2b598d88.jpg",
  },
  {
    title: "Dizajn Interieri",
    description:
      "Krijimi i hapësirave të brendshme ekskluzive ku materialet fisnike dhe ndriçimi krijojnë një luks të heshtur.",
    image:
      "https://i.pinimg.com/1200x/1c/ff/11/1cff11538b1d5edcbf911fb51c32f045.jpg",
  },
  {
    title: "Urbanizëm",
    description:
      "Planifikim strategjik për zhvillimin e qëndrueshëm të qyteteve dhe integrimin harmonik të gjelbërimit.",
    image:
      "https://i.pinimg.com/1200x/86/33/b5/8633b5d816a052f6e5aef4b78548824f.jpg",
  },
  {
    title: "Inxhinieri & Strukturë",
    description:
      "Llogaritje precize dhe zgjidhje inxhinierike sfiduese që garantojnë sigurinë dhe jetëgjatësinë e çdo projekti.",
    image:
      "https://i.pinimg.com/736x/33/03/01/3303018dbdf0fdaad8c610e3caec6722.jpg",
  },
  {
    title: "Menaxhim Projekti",
    description:
      "Mbikëqyrje rigoroze e procesit të ndërtimit për të siguruar saktësinë maksimale dhe cilësinë superiore.",
    image:
      "https://i.pinimg.com/736x/32/21/39/32213931101976e91f09205027f84e5c.jpg",
  },
  {
    title: "Konsulencë Teknike",
    description:
      "Këshillim profesional për optimizimin e kostove, materialeve dhe efikasitetit energjetik të ndërtesave.",
    image:
      "https://i.pinimg.com/736x/c7/41/72/c7417263107c9c955c32f4b5f764236a.jpg",
  },
];

export default function Services() {
  return (
    <PageShell>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
                Ekspertiza Jonë
              </span>
              <div className="h-[1px] w-12 bg-[#C5A059]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-[7vw] font-medium text-[#F5F5F7] uppercase leading-none tracking-tighter"
            >
              Shërbimet <span className="text-[#C5A059] italic">Premium</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-lg font-light text-[#A1A1A6] max-w-2xl font-serif italic"
            >
              "Nga konceptimi fillestar deri te realizimi final, ne krijojmë
              kryevepra arkitekturore përmes inovacionit."
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {staticServices.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative flex flex-col"
              >
                <div className="relative h-[500px] overflow-hidden bg-[#242426] border border-white/5 shadow-luxury transition-all duration-1000 group-hover:shadow-2xl group-hover:border-[#C5A059]/30">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-1000" />

                  <div className="absolute inset-0 p-12 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-serif text-3xl text-white uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-[#A1A1A6] line-clamp-3 italic opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-4 group-hover:translate-y-0">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 p-20 glass-card rounded-[3rem] text-center border border-white/5 hover:border-[#C5A059]/30 transition-all duration-1000"
          >
            <h2 className="font-serif text-4xl text-white mb-8 uppercase tracking-tighter">
              Gati për të filluar projektin tuaj?
            </h2>
            <p className="text-[#A1A1A6] mb-12 max-w-xl mx-auto font-light">
              Na kontaktoni sot për një konsultim privat rreth vizionit tuaj
              arkitekturor.
            </p>
            <button className="border border-[#C5A059] bg-transparent text-[#C5A059] px-16 py-6 rounded-full text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-[#C5A059] hover:text-black transition-all duration-700">
              Na Kontaktoni
            </button>
          </motion.div>
        </div>
      </motion.section>
    </PageShell>
  );
}
