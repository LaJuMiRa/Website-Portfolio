'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../Reveal'
import { useLanguage } from '../LanguageProvider'
import type { Translations } from '@/lib/translations'

type Entry = Translations['career']['jobs'][number]

const SUBHEADING = 'font-display text-2xl font-semibold'
const step = (i: number) => ({ '--i': i }) as CSSProperties

function Timeline({ title, entries, present }: { title: string; entries: readonly Entry[]; present: string }) {
  const id = `career-${title.toLowerCase()}`
  return (
    <section aria-labelledby={id} className="mt-14 first:mt-0">
      <Reveal>
        <h2 id={id} className={SUBHEADING}>
          {title}
        </h2>
      </Reveal>
      <ol className="mt-5 border-b border-line">
        {entries.map((entry, index) => (
          <Reveal
            as="li"
            key={`${entry.period}-${entry.role}`}
            delay={Math.min(index, 3) * 80}
            className="grid gap-x-10 gap-y-1.5 border-t border-line py-6 sm:grid-cols-[11rem_minmax(0,1fr)]"
          >
            <p className="font-medium tabular-nums">{entry.period}</p>
            <div>
              <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold">
                {entry.role}
                {entry.current && <span className="tag bg-accent-soft font-medium text-accent">{present}</span>}
              </h3>
              <p className="text-muted">{entry.place}</p>
              {entry.text && <p className="mt-2.5 max-w-[65ch]">{entry.text}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default function CareerPage() {
  const { t } = useLanguage()
  const text = t.career

  return (
    <main id="main">
      <div id="top" className="container-page pt-8 pb-20 md:pt-12 md:pb-28">
        <Link href="/#experience" className="group text-link inline-flex items-center gap-2 text-[0.95rem]">
          <ArrowLeft
            size={16}
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
          />
          {text.back}
        </Link>

        <header className="mt-8 border-b border-line pb-10 md:mt-10 md:pb-14">
          <h1
            style={step(0)}
            className="rise font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-bold leading-[1] tracking-[-0.04em]"
          >
            {text.title}
          </h1>
          <p style={step(1)} className="rise mt-5 max-w-2xl text-xl font-medium text-muted md:text-[1.375rem]">
            {text.intro}
          </p>
        </header>

        <div className="mt-10 grid gap-14 md:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
          <div style={step(2)} className="rise">
            <Timeline title={text.education} entries={text.schools} present={text.present} />
            <Timeline title={text.work} entries={text.jobs} present={text.present} />
            <Timeline title={text.volunteering} entries={text.volunteer} present={text.present} />
          </div>

          <aside style={step(3)} className="rise">
            <h2 className={SUBHEADING}>{text.languages}</h2>
            <ul className="mt-5 border-b border-line">
              {text.languageList.map(language => (
                <li key={language.name} className="flex items-baseline justify-between border-t border-line py-3.5">
                  <span>{language.name}</span>
                  <span className="font-medium tabular-nums text-muted">{language.level}</span>
                </li>
              ))}
            </ul>

            <h2 className={`${SUBHEADING} mt-14`}>{text.certificates}</h2>
            <ul className="mt-5 border-b border-line">
              {text.certificateList.map(certificate => (
                <li key={certificate} className="border-t border-line py-3.5">
                  {certificate}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  )
}
