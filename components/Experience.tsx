'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import { stagger, staggerFast, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'

/* ─────────────────────────────────────────────────────────────
 * ✏️  BERUFSERFAHRUNG — neueste Station zuerst
 * ───────────────────────────────────────────────────────────── */
const experiences = [
  {
    role:     '[JOB TITEL — z.B. "Working Student Software Development"]',
    company:  '[FIRMENNAME]',
    location: '[ORT — z.B. "Wien, Österreich"]',
    period:   '[ZEITRAUM — z.B. "Jan 2025 – Present"]',
    type:     '[TYP — z.B. "Part-time"]',
    bullets: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
    tech: ['Python', 'C', '[TECH 3]'],
  },
  {
    role:     '[JOB TITEL 2 — z.B. "Internship Software Engineering"]',
    company:  '[FIRMENNAME 2]',
    location: '[ORT 2]',
    period:   '[ZEITRAUM 2 — z.B. "Jun 2024 – Aug 2024"]',
    type:     '[TYP 2]',
    bullets: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    ],
    tech: ['[TECH 1]', '[TECH 2]'],
  },
]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const vis = isInView ? 'visible' : 'hidden'

  return (
    <section id="experience" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">03.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">Experience</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">Where I&apos;ve worked</motion.p>

          <motion.div variants={staggerFast} className="space-y-8">
            {experiences.map((exp) => (
              <motion.div key={exp.role} variants={fadeUpSoft} className="relative pl-10 timeline-item">
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-[22px] w-3.5 h-3.5 rounded-full bg-orange-500 ring-2 ring-orange-500/25"
                  style={{ border: '2px solid var(--bg)' }}
                  whileHover={{ scale: 1.4, boxShadow: '0 0 10px rgba(249,115,22,0.6)' }}
                  transition={{ duration: 0.15 }}
                />

                <div className="card">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-lg leading-snug text-[var(--text-primary)]">{exp.role}</h3>
                      <p className="text-orange-400 font-medium text-sm mt-0.5 flex items-center gap-1.5">
                        <Briefcase size={12} />{exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:items-end shrink-0">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <Calendar size={12} />{exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                        <MapPin size={12} />{exp.location}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 w-fit">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {exp.bullets.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        <span className="text-orange-500 mt-[5px] shrink-0 text-[7px]">◆</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
