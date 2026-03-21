'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'
import { stagger, staggerFast, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'

const projects: { title: string; description: string; tech: string[]; github: string | null; live: string | null; featured: boolean }[] = [
  {
    title:       '[PROJEKT NAME 1]',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.',
    tech:        ['Python', '[TECH 2]', '[TECH 3]'],
    github:      '#', live: null, featured: true,
  },
  {
    title:       '[PROJEKT NAME 2]',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident deserunt mollit.',
    tech:        ['C++', '[TECH 2]', '[TECH 3]'],
    github:      '#', live: '#', featured: true,
  },
  {
    title:       '[PROJEKT NAME 3]',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore.',
    tech:        ['C', '[TECH 2]'],
    github:      '#', live: null, featured: false,
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const vis = isInView ? 'visible' : 'hidden'

  return (
    <section id="projects" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">04.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">Projects</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">Things I&apos;ve built</motion.p>

          <motion.div variants={staggerFast} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <motion.div key={project.title} variants={fadeUpSoft} className="card group flex flex-col">
                {project.featured && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400/80 mb-3">
                    <Star size={10} fill="currentColor" /> Featured Project
                  </span>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold leading-snug transition-colors pr-2 text-[var(--text-primary)] group-hover:text-orange-500 dark:group-hover:text-orange-400">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0 mt-0.5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]" aria-label="GitHub">
                        <Github size={17} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="transition-colors text-[var(--text-muted)] hover:text-teal-400" aria-label="Live demo">
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5 text-[var(--text-secondary)]">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
