export type ProjectId = 'dungeon-crawler' | 'dispatcher' | 'browsing-wrapped'

export interface Project {
  id: ProjectId
  title: string
  tech: readonly string[]
  github: string
}

/** First entry is shown as the large, featured project. */
export const PROJECTS: readonly Project[] = [
  {
    id: 'dungeon-crawler',
    title: 'Dungeon-Crawler',
    tech: ['Python'],
    github: 'https://github.com/LaJuMiRa/dungen-crawler',
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
    tech: ['C', 'POSIX', 'IPC', 'Linux'],
    github: 'https://github.com/LaJuMiRa/dispatcher',
  },
  {
    id: 'browsing-wrapped',
    title: 'Browsing-Wrapped',
    tech: ['JavaScript', 'React', 'JSX'],
    github: 'https://github.com/LaJuMiRa/safari-wrapped',
  },
]

export function findProject(id: string): Project | undefined {
  return PROJECTS.find(project => project.id === id)
}

export function projectPath(id: ProjectId): string {
  return `/projects/${id}/`
}

export const DUNGEON_RUN_COMMANDS = [
  'git clone https://github.com/LaJuMiRa/dungen-crawler.git',
  'cd dungen-crawler',
  'pip install readchar colorist',
  'python3 dungeon.py',
] as const

export type Tone = 'player' | 'rival' | 'loot' | 'danger'
export type LegendKey =
  | 'you' | 'rival' | 'door' | 'weapon' | 'armor' | 'spike' | 'poison'
  | 'gnome' | 'gremlin' | 'jelly' | 'dragon'

export interface LegendEntry {
  glyph: string
  tone: Tone
  key: LegendKey
}

/** Same glyphs and colours the game board uses. */
export const LEGEND: readonly LegendEntry[] = [
  { glyph: '@', tone: 'player', key: 'you' },
  { glyph: '*', tone: 'rival', key: 'rival' },
  { glyph: '|', tone: 'player', key: 'door' },
  { glyph: ')', tone: 'loot', key: 'weapon' },
  { glyph: '[', tone: 'loot', key: 'armor' },
  { glyph: '^', tone: 'danger', key: 'spike' },
  { glyph: '&', tone: 'danger', key: 'poison' },
  { glyph: 'G', tone: 'danger', key: 'gnome' },
  { glyph: 'g', tone: 'danger', key: 'gremlin' },
  { glyph: 'J', tone: 'danger', key: 'jelly' },
  { glyph: 'D', tone: 'danger', key: 'dragon' },
]
