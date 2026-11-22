'use client'

import DungeonVisual from './DungeonVisual'
import DispatcherVisual from './DispatcherVisual'
import WrappedVisual from './WrappedVisual'
import SeasonsVisual from './SeasonsVisual'
import VsLikeVisual from './VsLikeVisual'
import { useLanguage } from '../LanguageProvider'
import type { ProjectId } from '@/lib/projects'

export default function ProjectVisual({ id }: { id: ProjectId }) {
  const { t } = useLanguage()
  const labels = t.projects.visuals
  switch (id) {
    case 'dungeon-crawler':
      return <DungeonVisual label={labels.dungeon} />
    case 'vslike':
      return <VsLikeVisual label={labels.vslike} />
    case 'seasons':
      return <SeasonsVisual label={labels.seasons} />
    case 'dispatcher':
      return <DispatcherVisual label={labels.dispatcher} />
    case 'browsing-wrapped':
      return <WrappedVisual label={labels.wrapped} title={labels.wrappedTitle} note={labels.wrappedNote} />
  }
}
