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
    role:     'Marketing Intern',
    company:  'Gurkerl.at',
    location: 'Vienna, Austria',
    period:   'Jul 2023 – Jan 2025',
    type:     'Full-Time / Part-time / Hybrid',
    bullets: [
      'Building and adapting websites for certain campaigns',
      'Social Media communication and content creation',
      'Campaign creation and management',
    ],
    tech: ['UI/UX', 'Social Media', 'Advertising'],
  },
  {
    role:     'Soccer Coach',
    company:  'ASK Oberwaltersdorf',
    location: 'Oberwaltersdorf',
    period:   'Jul 2023 - Present',
    type:     'Volunteer',
    bullets: [
      'Coaching youth soccer team (currently U16) with a focus on skill development, teamwork, and sportsmanship',
      'Organizing and leading regular training sessions and creating practice plans',
      'Collaborating with parents and club management to ensure a positive and supportive environment for the players',
    ],
    tech: ['Coaching', 'Teamwork', 'Communication'],
  },
]

type Experience = typeof experiences[number]

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="card">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-semibold text-lg leading-snug text-[var(--text-primary)]">{exp.role}</h3>
            <p className="text-orange-400 font-medium text-sm flex items-center gap-1.5 mt-0.5">
              <Briefcase size={12} />{exp.company}
            </p>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0 mt-1">
            {exp.type}
          </span>
        </div>
        <div className="flex items-center justify-between flex-wrap mt-2">
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
            <MapPin size={11} />{exp.location}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
            <Calendar size={11} />{exp.period}
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
  )
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const vis = isInView ? 'visible' : 'hidden'

  return (
    <section id="experience" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">02.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">Experience</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">Where I&apos;ve worked</motion.p>

          <motion.div variants={staggerFast} className="relative">

            {/* Vertical center line — desktop only */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {experiences.map((exp, i) => {
                const isRight = i % 2 !== 0

                return (
                  <motion.div key={exp.role} variants={fadeUpSoft}>

                    {/* ── Desktop: alternating layout ── */}
                    <div className="hidden md:flex items-start">
                      <div className="flex-1 pr-10">
                        {!isRight && <ExperienceCard exp={exp} />}
                      </div>

                      <motion.div
                        className="shrink-0 z-10 w-3.5 h-3.5 rounded-full bg-orange-500 ring-2 ring-orange-500/25 mt-5"
                        style={{ border: '2px solid var(--bg)' }}
                        whileHover={{ scale: 1.4, boxShadow: '0 0 10px rgba(249,115,22,0.6)' }}
                        transition={{ duration: 0.15 }}
                      />

                      <div className="flex-1 pl-10">
                        {isRight && <ExperienceCard exp={exp} />}
                      </div>
                    </div>

                    {/* ── Mobile: single-column with left dot ── */}
                    <div className="md:hidden relative pl-10 timeline-item">
                      <motion.div
                        className="absolute left-0 top-[22px] w-3.5 h-3.5 rounded-full bg-orange-500 ring-2 ring-orange-500/25"
                        style={{ border: '2px solid var(--bg)' }}
                        whileHover={{ scale: 1.4, boxShadow: '0 0 10px rgba(249,115,22,0.6)' }}
                        transition={{ duration: 0.15 }}
                      />
                      <ExperienceCard exp={exp} />
                    </div>

                  </motion.div>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
