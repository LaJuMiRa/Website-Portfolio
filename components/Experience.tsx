'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import StudyProgress from './experience/StudyProgress'
import { useLanguage } from './LanguageProvider'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <Section id="experience" heading={t.experience.heading} intro={t.experience.intro}>
      <ol className="border-b border-line">
        {t.experience.items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={index * 110}
            className="grid gap-x-16 gap-y-3 border-t border-line py-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]"
          >
            <div>
              <p className="font-medium">{item.period}</p>
              <p className="mt-1 text-[0.95rem] text-muted">{item.type}</p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold">{item.role}</h3>
              <p className="mt-1 text-muted">
                <span className="font-medium text-ink">{item.company}</span>, {item.location}
              </p>
              {item.id === 'study' && <StudyProgress />}
              {item.bullets.length > 0 && (
                <ul className="mt-5 max-w-[65ch] list-disc space-y-2 pl-5 marker:text-faint">
                  {item.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {item.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <p className="mt-10">
        <Link href="/experience/" className="group text-link inline-flex items-center gap-2">
          {t.experience.allLink}
          <ArrowRight
            size={17}
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </Link>
      </p>
    </Section>
  )
}
