'use client'

import { useEffect, useState } from 'react'

/** Map symbols from the dungeon crawler, limited to ones that stay inside the line box at display size. */
const GLYPHS = '@#&*GgJD'
const FRAME_MS = 45

interface ScrambleTextProps {
  text: string
  /** Milliseconds before the first letter settles. */
  delay?: number
  duration?: number
}

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

/** Resolves the text out of dungeon symbols, left to right, once on page load. */
export default function ScrambleText({ text, delay = 0, duration = 900 }: ScrambleTextProps) {
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now() + delay
    const interval = window.setInterval(() => {
      const progress = Math.min(1, Math.max(0, (performance.now() - start) / duration))
      const settled = Math.floor(progress * text.length)
      setShown(
        [...text].map((char, index) => (index < settled || char === ' ' ? char : randomGlyph())).join(''),
      )
      if (progress === 1) window.clearInterval(interval)
    }, FRAME_MS)
    return () => window.clearInterval(interval)
  }, [text, delay, duration])

  return <span aria-hidden>{shown}</span>
}
