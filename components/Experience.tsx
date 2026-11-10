'use client'

import Section from './Section'
import { useLanguage } from './LanguageProvider'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <Section id="experience" heading={t.experience.heading} intro={t.experience.intro}>
      <ol className="border-b border-line">
        {t.experience.items.map(item => (
          <li
            key={`${item.company}-${item.role}`}
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
              <ul className="mt-5 max-w-[65ch] list-disc space-y-2 pl-5 marker:text-faint">
                {item.bullets.map(bullet => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
