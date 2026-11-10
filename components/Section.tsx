'use client'

import Reveal from './Reveal'
import { useReveal } from '@/lib/useReveal'

interface SectionProps {
  id: string
  heading: string
  intro?: string
  children: React.ReactNode
}

export default function Section({ id, heading, intro, children }: SectionProps) {
  const headingId = `${id}-heading`
  const ref = useReveal<HTMLElement>('rule')

  return (
    <section ref={ref} id={id} aria-labelledby={headingId} className="relative py-20 md:py-28">
      <span aria-hidden className="section-rule absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page">
        <header className="mb-10 max-w-2xl md:mb-14">
          <Reveal kind="mask">
            <h2 id={headingId} className="font-display text-[2rem] font-semibold leading-tight md:text-[2.75rem]">
              {heading}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={120}>
              <p className="mt-3 text-lg text-muted">{intro}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
