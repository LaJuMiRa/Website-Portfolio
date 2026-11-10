'use client'

import type { CSSProperties } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { SITE } from '@/lib/site'

const step = (i: number) => ({ '--i': i }) as CSSProperties

export default function Hero() {
  const { t } = useLanguage()

  const facts = [
    { label: t.facts.basedIn, value: t.facts.values.basedIn },
    { label: t.facts.education, value: t.facts.values.education },
    { label: t.facts.available, value: t.facts.values.available, live: true },
    { label: t.facts.languages, value: t.facts.values.languages },
  ]

  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <h1
            id="hero-heading"
            style={step(0)}
            className="rise font-display text-[clamp(3.25rem,11vw,7.25rem)] font-extrabold leading-[0.95] tracking-[-0.06em]"
          >
            <span className="block">Laurenz</span>
            <span className="block">Rauscher</span>
          </h1>

          <p
            style={step(1)}
            className="rise mt-8 max-w-xl text-[1.375rem] font-medium leading-snug md:text-[1.625rem]"
          >
            {t.hero.role} <span className="text-accent">{t.hero.tagline}</span>
          </p>

          <p style={step(2)} className="rise mt-5 max-w-xl text-lg text-muted">
            {t.hero.lead}
          </p>

          <div style={step(3)} className="rise mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn btn-primary">
              {t.hero.viewProjects}
              <ArrowDown size={17} aria-hidden />
            </a>
            <a href={SITE.cvFile} download className="btn btn-ghost">
              <Download size={17} aria-hidden />
              {t.hero.downloadResume}
            </a>
          </div>
        </div>

        <dl style={step(4)} className="rise border-t border-line-strong lg:mb-1.5">
          {facts.map(fact => (
            <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
              <dt className="text-[0.95rem] text-muted">{fact.label}</dt>
              <dd className="flex items-baseline gap-2.5 font-medium">
                {fact.live && (
                  <span aria-hidden className="relative top-[-1px] inline-block size-2 shrink-0 rounded-full bg-accent" />
                )}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
