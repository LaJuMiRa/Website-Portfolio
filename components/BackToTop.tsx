'use client'

import { ArrowUp } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function BackToTop() {
  const reducedMotion = useReducedMotion()

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex flex-col items-start gap-2 group cursor-pointer"
    >
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-faint)] group-hover:text-orange-500 transition-colors duration-200">
        Go back
      </span>
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="text-[var(--text-faint)] group-hover:text-orange-500 transition-colors duration-200"
      >
        <ArrowUp size={15} />
      </motion.div>
    </button>
  )
}
