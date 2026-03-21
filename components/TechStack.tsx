'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stagger, staggerFast, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'

const technologies: { name: string; level: string; icon: string; color: string; bg: string; border: string }[] = [
  { name: 'Python', level: 'Primary',  icon: 'PY', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.18)'  },
  { name: 'C',      level: 'Primary',  icon: 'C',  color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.18)'  },
  { name: 'C++',    level: 'Primary',  icon: 'C++',color: '#2dd4bf', bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.18)'  },
  // ✏️  Weitere einkommentieren:
  // { name: 'Rust',       level: 'Learning', icon: '🦀', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.18)' },
  // { name: 'TypeScript', level: 'Learning', icon: 'TS',  color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.18)' },
  // { name: 'React',      level: 'Learning', icon: '⚛',  color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.18)' },
  // { name: 'Docker',     level: 'Familiar', icon: '🐳', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.18)' },
  // { name: 'Linux',      level: 'Familiar', icon: '🐧', color: '#a3e635', bg: 'rgba(163,230,53,0.08)', border: 'rgba(163,230,53,0.18)' },
]

const comingSoon = ['Rust', 'TypeScript', 'Docker', 'React', 'Linux']
const levelColor: Record<string, string> = {
  Primary: 'dark:text-orange-400 text-orange-500',
  Learning: 'dark:text-teal-400 text-teal-600',
  Familiar: 'text-[var(--text-secondary)]',
}

export default function TechStack() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const vis = isInView ? 'visible' : 'hidden'

  return (
    <section id="skills" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">02.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">Tech Stack</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">Technologies I work with</motion.p>

          <motion.div variants={staggerFast} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
            {technologies.map((tech) => (
              <motion.div key={tech.name} variants={fadeUpSoft} className="card cursor-default" style={{ borderColor: tech.border }}>
                <div className="flex flex-col items-start gap-3 py-1">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold"
                    style={{ background: tech.bg, color: tech.color }}>
                    {tech.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-primary)]">{tech.name}</p>
                    <p className={`text-xs mt-0.5 font-mono ${levelColor[tech.level] ?? 'text-neutral-400'}`}>
                      {tech.level}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-xs font-mono mb-3 tracking-wider text-[var(--text-faint)]">
              // currently exploring &amp; planning to learn
            </p>
            <div className="flex flex-wrap gap-2">
              {comingSoon.map((tech) => (
                <span key={tech} className="tech-tag opacity-50">{tech}</span>
              ))}
              <span className="tech-tag opacity-30 italic">+ more</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
