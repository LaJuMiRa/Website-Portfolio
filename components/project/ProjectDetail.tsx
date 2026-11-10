'use client'

import Link from 'next/link'
import { ArrowLeft, Github } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'
import ProjectVisual from '../visuals/ProjectVisual'
import DungeonDetail from './DungeonDetail'
import type { Project } from '@/lib/projects'

export default function ProjectDetail({ project }: { project: Project }) {
  const { t } = useLanguage()
  const text = t.detail.projects[project.id]
  const isDungeon = project.id === 'dungeon-crawler'

  return (
    <main id="main">
      <article id="top" className="container-page pt-8 pb-20 md:pt-12 md:pb-28">
        <Link href="/#projects" className="text-link inline-flex items-center gap-2 text-[0.95rem]">
          <ArrowLeft size={16} aria-hidden />
          {t.detail.back}
        </Link>

        <header className="mt-8 grid gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16 md:mt-10 md:pb-14">
          <div>
            <h1 className="rise font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.06em] break-words">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-medium text-muted md:text-[1.375rem]">{text.tagline}</p>
          </div>

          <div className="lg:mb-1.5">
            <h2 className="text-[0.95rem] text-muted">{t.detail.tech}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <li key={tech} className="tag text-base font-medium text-ink">
                  {tech}
                </li>
              ))}
            </ul>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-6"
            >
              <Github size={17} aria-hidden />
              {t.projects.codeLink}
            </a>
          </div>
        </header>

        {isDungeon ? (
          <DungeonDetail paragraphs={text.paragraphs} />
        ) : (
          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex min-h-80 overflow-hidden rounded-2xl border border-line bg-well lg:min-h-[28rem]">
              <ProjectVisual id={project.id} />
            </div>

            <div>
              <div className="space-y-4 text-lg">
                {text.paragraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <h2 className="mt-10 font-display text-xl font-semibold">{t.detail.highlights}</h2>
              <ul className="mt-4 border-b border-line">
                {text.highlights.map(highlight => (
                  <li key={highlight} className="border-t border-line py-4 text-muted">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
