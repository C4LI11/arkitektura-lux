import { motion } from 'framer-motion'

const page = {
  initial: { opacity: 0, filter: 'blur(2px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, filter: 'blur(1px)', transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

export function MotionContent({ children, delay = 0.35 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function PageShell({ children }) {
  return (
    <motion.main
      className="bg-[#1a1a1a] text-white"
      variants={page}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}

