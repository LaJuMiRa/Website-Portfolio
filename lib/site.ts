import type { ProjectId } from './projects'

export const SITE = {
  name: 'Laurenz Rauscher',
  url: 'https://laurenz-rauscher.at',
  email: 'laurenz.rauscher@gmail.com',
  cvFile: '/Lebenslauf_Rauscher.pdf',
  socials: [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@LaJuMiRa',
      href: 'https://github.com/LaJuMiRa',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Laurenz Rauscher',
      href: 'https://www.linkedin.com/in/laurenz-rauscher-299931234',
    },
  ],
} as const

export const SECTION_IDS = ['projects', 'about', 'experience', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export interface Skill {
  name: string
  /** Project that shows this technology in use, if there is one on the site. */
  project?: ProjectId
}

export const SKILLS: Record<'primary' | 'familiar', readonly Skill[]> = {
  primary: [
    { name: 'C', project: 'dispatcher' },
    { name: 'Python', project: 'dungeon-crawler' },
    { name: 'Linux', project: 'dispatcher' },
    { name: 'C#' },
  ],
  familiar: [
    { name: 'C++' },
    { name: 'SQL' },
    { name: 'JavaScript', project: 'browsing-wrapped' },
    { name: 'TypeScript' },
    { name: 'PHP' },
  ],
}
