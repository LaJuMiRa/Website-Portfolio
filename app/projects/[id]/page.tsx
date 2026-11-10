import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectDetail from '@/components/project/ProjectDetail'
import { PROJECTS, findProject } from '@/lib/projects'
import { SITE } from '@/lib/site'
import { de } from '@/lib/translations'

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export function generateStaticParams(): { id: string }[] {
  return PROJECTS.map(project => ({ id: project.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const project = findProject(id)
  if (!project) return {}
  return {
    title: `${project.title} · ${SITE.name}`,
    description: de.detail.projects[project.id].tagline,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = findProject(id)
  if (!project) notFound()

  return (
    <>
      <Header />
      <ProjectDetail project={project} />
      <Footer />
    </>
  )
}
