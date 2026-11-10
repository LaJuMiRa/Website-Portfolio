'use client'

import { useEffect, useState } from 'react'

/** Map symbols from the dungeon crawler: the name is dug out of them. */
const GLYPHS = '@#&*GgJD'
const FRAME_MS = 45

interface ScrambleTextProps {
  text: string
  /** Milliseconds before the first letter settles. */
  delay?: number
  duration?: number
}

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

/**
 * Resolves the text out of dungeon symbols, left to right, once on page load.
 * Every symbol sits in the slot of the letter it stands in for, so the line never changes width.
 */
export default function ScrambleText({ text, delay = 0, duration = 900 }: ScrambleTextProps) {
  // null: show the plain text (before the start, after the end, and without motion).
  const [glyphs, setGlyphs] = useState<readonly (string | null)[] | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now() + delay
    const interval = window.setInterval(() => {
      const progress = Math.min(1, Math.max(0, (performance.now() - start) / duration))
      if (progress === 1) {
        setGlyphs(null)
        window.clearInterval(interval)
        return
      }
      const settled = Math.floor(progress * text.length)
      setGlyphs([...text].map((char, index) => (index < settled || char === ' ' ? null : randomGlyph())))
    }, FRAME_MS)
    return () => window.clearInterval(interval)
  }, [text, delay, duration])

  if (!glyphs) return <span aria-hidden>{text}</span>

  return (
    <span aria-hidden>
      {[...text].map((char, index) => {
        const glyph = glyphs[index]
        return (
          <span key={index} className="relative inline-block">
            <span className={glyph ? 'invisible' : undefined}>{char}</span>
            {glyph && <span className="absolute inset-0 flex justify-center">{glyph}</span>}
          </span>
        )
      })}
    </span>
  )
}
