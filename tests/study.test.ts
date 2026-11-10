import { describe, expect, it } from 'vitest'
import { studyProgress } from '../lib/study'

describe('studyProgress', () => {
  it('starts in the first semester', () => {
    const progress = studyProgress(new Date(2025, 8, 15))
    expect(progress.semester).toBe(1)
    expect(progress.segments[0]).toBeGreaterThan(0)
    expect(progress.segments[1]).toBe(0)
  })

  it('is in the third semester in November 2026', () => {
    const progress = studyProgress(new Date(2026, 10, 10))
    expect(progress.semester).toBe(3)
    expect(progress.segments.slice(0, 2)).toEqual([1, 1])
    expect(progress.segments[2]).toBeGreaterThan(0)
    expect(progress.segments[2]).toBeLessThan(1)
    expect(progress.segments.slice(3)).toEqual([0, 0, 0])
  })

  it('switches semester in March', () => {
    expect(studyProgress(new Date(2026, 1, 28)).semester).toBe(1)
    expect(studyProgress(new Date(2026, 2, 1)).semester).toBe(2)
  })

  it('clamps before the start and after the end', () => {
    expect(studyProgress(new Date(2024, 0, 1)).semester).toBe(1)
    const done = studyProgress(new Date(2030, 0, 1))
    expect(done.semester).toBe(6)
    expect(done.finished).toBe(true)
    expect(done.segments).toEqual([1, 1, 1, 1, 1, 1])
  })
})
