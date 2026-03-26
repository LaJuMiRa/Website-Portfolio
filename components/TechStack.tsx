'use client'

import { useState } from 'react'

const technologies = [
    { name: 'Python',     icon: 'PY',  color: '#087b00' },
    { name: 'C',         icon: 'C',   color: '#2dd4bf' },
    { name: 'C++',       icon: 'C++', color: '#fb923c' },
    { name: 'JavaScript',       icon: 'JS', color: '#fbbf24' },
    { name: 'PHP',       icon: 'PHP', color: '#777BB4' },
    { name: 'SQL',       icon: 'SQL', color: '#2c60d1' },
    { name: 'C#',       icon: 'C#', color: '#512BD4' },
  // ✏️  Weitere einkommentieren:
  // { name: 'Rust',       icon: 'RS', color: '#f97316' },
  // { name: 'TypeScript', icon: 'TS', color: '#38bdf8' },
  // { name: 'React',      icon: '⚛',  color: '#22d3ee' },
  // { name: 'Docker',     icon: '🐳', color: '#0ea5e9' },
  // { name: 'Linux',      icon: '🐧', color: '#a3e635' },
]

// Duplicate 4x for a seamless loop with enough content at all widths
const items = [...technologies, ...technologies, ...technologies, ...technologies]


export default function TechStack() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="skills" className="relative z-10 overflow-hidden border-y border-[var(--border)] py-5 my-4">
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <div
        className="flex gap-12 w-max"
        style={{
          animation: 'tech-marquee 22s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-3 shrink-0 group cursor-default select-none"
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-transform duration-200 group-hover:scale-110"
              style={{
                color: tech.color,
                background: `${tech.color}18`,
                border: `1px solid ${tech.color}30`,
              }}
            >
              {tech.icon}
            </span>
            <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
