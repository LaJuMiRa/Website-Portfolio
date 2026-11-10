'use client'

import { useState } from 'react'
import Link from 'next/link'
import Section from './Section'
import Reveal from './Reveal'
import { useLanguage } from './LanguageProvider'
import { SKILLS, type Skill } from '@/lib/site'
import { PROJECTS, projectPath } from '@/lib/projects'

const TAG_CLASS =
  'tag text-base font-medium text-ink transition-[color,background-color,scale] duration-200 ease-out hover:scale-110 hover:bg-accent-soft hover:text-accent focus-visible:scale-110 focus-visible:bg-accent-soft focus-visible:text-accent'

const projectTitle = (skill: Skill) => PROJECTS.find(project => project.id === skill.project)?.title

interface SkillGroupProps {
  title: string
  items: readonly Skill[]
  usedIn: string
  onActive: (skill: Skill | null) => void
}

function SkillGroup({ title, items, usedIn, onActive }: SkillGroupProps) {
  return (
    <div className="border-t border-line py-5">
      <h4 className="mb-3 text-[0.95rem] text-muted">{title}</h4>
      <ul className="flex flex-wrap gap-2">
        {items.map(skill => (
          <li key={skill.name} onMouseEnter={() => onActive(skill)} onMouseLeave={() => onActive(null)}>
            {skill.project ? (
              <Link
                href={projectPath(skill.project)}
                aria-label={`${skill.name}: ${usedIn} ${projectTitle(skill)}`}
                onFocus={() => onActive(skill)}
                onBlur={() => onActive(null)}
                className={`${TAG_CLASS} gap-2`}
              >
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {skill.name}
              </Link>
            ) : (
              <span className={TAG_CLASS}>{skill.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const [active, setActive] = useState<Skill | null>(null)
  const activeProject = active ? projectTitle(active) : undefined

  return (
    <Section id="about" heading={t.about.heading}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="max-w-[72ch] space-y-5 text-lg">
          <p>{t.about.bio1}</p>
          <p className="text-muted">{t.about.bio2}</p>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="mb-4 font-display text-xl font-semibold">{t.about.skillsHeading}</h3>
          <SkillGroup title={t.about.primary} items={SKILLS.primary} usedIn={t.about.usedIn} onActive={setActive} />
          <SkillGroup title={t.about.familiar} items={SKILLS.familiar} usedIn={t.about.usedIn} onActive={setActive} />
          {/* Visual echo of the hovered tag; the links themselves carry the same text for screen readers. */}
          <p aria-hidden className="min-h-[1.65em] border-t border-line pt-4 text-[0.95rem] text-faint">
            {active && activeProject ? (
              <>
                <span className="font-medium text-accent">{active.name}</span> · {t.about.usedIn}{' '}
                <span className="font-medium text-ink">{activeProject}</span>
              </>
            ) : (
              t.about.stackHint
            )}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
