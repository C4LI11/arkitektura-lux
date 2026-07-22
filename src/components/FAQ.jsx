import { motion } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: "Kush është arkitekti dhe inxhinieri kryesor?",
    answer: "Arkitekti dhe inxhinieri kryesor i studios sonë është Bardhyl Halitjaha, një profesionist me përvojë të gjerë në projektim dhe menaxhim projektesh."
  },
  {
    question: "Çfarë shërbimesh ofroni?",
    answer: "Ne ofrojmë shërbime të plota në Arkitekturë (projektim rezidencial dhe komercial), Dizajn Interieri, dhe Menaxhim Projekti (mbikëqyrje dhe ekzekutim)."
  },
  {
    question: "Si mund të kërkoj një ofertë?",
    answer: "Ju mund të na kontaktoni përmes formës së kontaktit në faqen tonë ose duke na dërguar një email me detajet e projektit tuaj."
  },
  {
    question: "Sa kohë zgjat një projekt mesatar?",
    answer: "Kohëzgjatja varet nga kompleksiteti i projektit, por mesatarisht faza e projektimit zgjat 4-8 javë, ndërsa ekzekutimi varet nga specifikat e ndërtimit."
  }
]

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="border-b border-white/5 group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-8 text-left focus:outline-none"
      >
        <span className="text-xl font-light tracking-wide text-white/80 transition-colors group-hover:text-white sm:text-2xl">
          {faq.question}
        </span>
        <div className="relative flex h-6 w-6 items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="absolute h-px w-full bg-white/40"
          />
          <motion.div
            animate={{ rotate: isOpen ? 90 : 90, scaleY: isOpen ? 0 : 1 }}
            className="absolute h-full w-px bg-white/40"
          />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-lg font-light leading-relaxed text-white/40 max-w-2xl">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="bg-black py-32 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-[10px] tracking-[0.6em] text-white/30 uppercase mb-6">Informacione</h2>
          <h3 className="font-serif text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pyetje të Shpeshta
          </h3>
          <div className="mx-auto mt-12 h-px w-16 bg-white/10" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
