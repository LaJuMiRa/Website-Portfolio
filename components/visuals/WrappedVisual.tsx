'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Illustrative sample data, labelled as such in the UI.
const SITES = [
  { name: 'github.com', time: '6 h 10 min', share: 100 },
  { name: 'stackoverflow.com', time: '3 h 45 min', share: 61 },
  { name: 'wikipedia.org', time: '2 h 20 min', share: 38 },
  { name: 'youtube.com', time: '1 h 30 min', share: 24 },
]

interface WrappedVisualProps {
  label: string
  title: string
  note: string
}

export default function WrappedVisual({ label, title, note }: WrappedVisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const filled = inView || reduceMotion

  return (
    <div ref={ref} role="img" aria-label={label} className="flex h-full w-full items-center justify-center p-6 md:p-8">
      <div aria-hidden className="w-full max-w-[24rem]">
        <div className="mb-5 flex items-baseline justify-between">
          <p className="font-display text-xl font-semibold">{title}</p>
          <p className="text-sm text-muted">{note}</p>
        </div>
        <ul className="space-y-3.5">
          {SITES.map((site, index) => (
            <li key={site.name}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium">{site.name}</span>
                <span className="text-muted">{site.time}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full origin-left rounded-full bg-accent"
                  style={{
                    width: `${site.share}%`,
                    transform: `scaleX(${filled ? 1 : 0})`,
                    transition: reduceMotion ? undefined : `transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 90}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
