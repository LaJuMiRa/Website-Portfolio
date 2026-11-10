'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useLanguage } from '../LanguageProvider'
import { studyProgress } from '@/lib/study'

/** One segment per semester; the running one is partly filled. */
export default function StudyProgress() {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(() => studyProgress(new Date()))

  // The page is exported at build time; recompute on the visitor's clock.
  useEffect(() => setProgress(studyProgress(new Date())), [])

  const label = t.experience.semester
    .replace('{n}', String(progress.semester))
    .replace('{total}', String(progress.total))

  return (
    <div className="mt-6 max-w-md">
      <div className="flex items-baseline justify-between gap-4 text-[0.95rem]">
        <span className="text-muted">{t.experience.progressLabel}</span>
        <span className="font-medium">{label}</span>
      </div>
      <div
        role="progressbar"
        aria-label={t.experience.progressLabel}
        aria-valuemin={0}
        aria-valuemax={progress.total}
        aria-valuenow={progress.semester}
        aria-valuetext={label}
        className="mt-2.5 flex gap-1.5"
      >
        {progress.segments.map((fill, index) => (
          <span key={index} className="h-2 flex-1 overflow-hidden rounded-full bg-well">
            <span
              style={{ '--seg': index, width: `${fill * 100}%` } as CSSProperties}
              className="progress-fill block h-full rounded-full bg-accent"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
