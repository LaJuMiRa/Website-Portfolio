'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stagger, staggerFast, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'
import { useLanguage } from './LanguageProvider'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const vis = isInView ? 'visible' : 'hidden'

  return (
    <section id="about" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          {/* ── Section header — LN-style ── */}
          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">01.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">{t.about.sectionHeading}</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">{t.about.subtitle}</motion.p>

          <div className="grid md:grid-cols-5 gap-14 items-start">

            {/* ── Text ── */}
            <motion.div variants={stagger} className="md:col-span-3 space-y-5 leading-relaxed text-[0.95rem] text-[var(--text-secondary)]">
              <motion.p variants={fadeUpSoft}>{t.about.bio1}</motion.p>
              <motion.p variants={fadeUpSoft}>{t.about.bio2}</motion.p>

              <motion.div variants={staggerFast} className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { label: t.about.facts.basedIn,   value: t.about.factValues.basedIn },
                  { label: t.about.facts.education,  value: t.about.factValues.education },
                  { label: t.about.facts.available,  value: t.about.factValues.available },
                  { label: t.about.facts.languages,  value: t.about.factValues.languages },
                ].map((fact) => (
                  <motion.div key={fact.label} variants={fadeUpSoft} className="card py-3 px-4">
                    <p className="text-teal-400 text-xs font-mono mb-0.5">{fact.label}</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{fact.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Avatar ── */}
            <motion.div variants={fadeUp} className="md:col-span-2 order-first md:order-none">
              <div className="relative max-w-xs">
                <div className="card aspect-square flex flex-col items-center justify-center gap-5 text-center">
                  {/*
                   * ✏️  PROFILFOTO:
                   *   1. Lege dein Foto als public/profile.jpg ab
                   *   2. Ersetze diesen Block durch:
                   *      <img src="/profile.jpg" alt="Laurenz Rauscher"
                   *           className="w-32 h-32 rounded-full object-cover
                   *                      border-2 border-orange-500/30" />
                   */}
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500/25 to-teal-500/25 border border-orange-500/20 flex items-center justify-center">
                    <span className="gradient-text text-4xl font-extrabold font-mono">LR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-[var(--text-primary)]">Laurenz Rauscher</p>
                    <p className="text-sm mt-1 text-[var(--text-muted)]">CS Student</p>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-orange-500/5 rounded-3xl blur-2xl -z-10" />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
