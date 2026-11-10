'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import Section from './Section'
import { useLanguage } from './LanguageProvider'
import ProjectVisual from './visuals/ProjectVisual'
import { PROJECTS, projectPath, type Project } from '@/lib/projects'
import { SITE } from '@/lib/site'
import type { Translations } from '@/lib/translations'

function ProjectText({ project, t, large = false }: { project: Project; t: Translations; large?: boolean }) {
  const detailLabel = project.id === 'dungeon-crawler' ? t.detail.playInBrowser : t.detail.viewProject
  return (
    <div className="flex flex-col items-start">
      <h3 className={`font-display font-semibold ${large ? 'text-[1.75rem] md:text-[2rem]' : 'text-2xl'}`}>
        <Link href={projectPath(project.id)} className="transition-colors hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className={`mt-3 text-muted ${large ? 'text-lg' : ''}`}>{t.projects.descriptions[project.id]}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map(tech => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={projectPath(project.id)} className="text-link inline-flex items-center gap-2">
          {detailLabel}
          <ArrowRight size={17} aria-hidden />
          <span className="sr-only">: {project.title}</span>
        </Link>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
          <Github size={17} aria-hidden />
          {t.projects.codeLink}
          <span className="sr-only">: {project.title}</span>
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [featured, ...rest] = PROJECTS
  const github = SITE.socials.find(social => social.id === 'github')

  return (
    <Section id="projects" heading={t.projects.heading} intro={t.projects.intro}>
      <article className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="min-h-64 border-b border-line bg-well lg:border-r lg:border-b-0">
          <ProjectVisual id={featured.id} />
        </div>
        <div className="flex items-center p-7 md:p-10">
          <ProjectText project={featured} t={t} large />
        </div>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map(project => (
          <article key={project.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex min-h-64 border-b border-line bg-well md:h-72">
              <ProjectVisual id={project.id} />
            </div>
            <div className="p-7 md:p-8">
              <ProjectText project={project} t={t} />
            </div>
          </article>
        ))}
      </div>

      {github && (
        <p className="mt-10">
          <a href={github.href} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
            {t.projects.more}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </p>
      )}
    </Section>
  )
}
