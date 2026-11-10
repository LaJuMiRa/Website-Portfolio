/** Bachelor's programme: six semesters, each half a year, starting in September 2025. */
export const STUDY = {
  startYear: 2025,
  /** 0-based month, September. */
  startMonth: 8,
  semesters: 6,
  monthsPerSemester: 6,
} as const

export interface StudyProgress {
  /** 1-based semester currently running, capped at the last one. */
  semester: number
  total: number
  /** Fill of each semester segment, 0 to 1. */
  segments: readonly number[]
  finished: boolean
}

export function studyProgress(now: Date): StudyProgress {
  const { startYear, startMonth, semesters, monthsPerSemester } = STUDY
  const elapsed = Math.max(0, (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth))
  const finished = elapsed >= semesters * monthsPerSemester

  const segments = Array.from({ length: semesters }, (_, index) => {
    const into = elapsed - index * monthsPerSemester
    // A running semester always shows a sliver, so month one does not look empty.
    if (into >= 0 && into < monthsPerSemester) return (into + 0.5) / monthsPerSemester
    return into >= monthsPerSemester ? 1 : 0
  })

  return {
    semester: Math.min(semesters, Math.floor(elapsed / monthsPerSemester) + 1),
    total: semesters,
    segments,
    finished,
  }
}
