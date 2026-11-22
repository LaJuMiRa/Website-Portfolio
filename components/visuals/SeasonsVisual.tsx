'use client'

import { useReducedMotion } from 'framer-motion'

const HEIGHT = 260
// Deterministic flakes: x position, radius, fall duration (s) and start offset (0-1 of the fall).
const FLAKES = [
  { x: 24, r: 2.5, dur: 7.5, offset: 0.1 },
  { x: 62, r: 2, dur: 9, offset: 0.55 },
  { x: 98, r: 3, dur: 6.8, offset: 0.3 },
  { x: 141, r: 2, dur: 8.4, offset: 0.8 },
  { x: 176, r: 2.5, dur: 7.2, offset: 0.05 },
  { x: 214, r: 2, dur: 9.6, offset: 0.45 },
  { x: 268, r: 3, dur: 7, offset: 0.7 },
  { x: 301, r: 2, dur: 8.8, offset: 0.2 },
  { x: 337, r: 2.5, dur: 6.6, offset: 0.9 },
  { x: 372, r: 2, dur: 9.2, offset: 0.35 },
  { x: 408, r: 3, dur: 7.8, offset: 0.62 },
  { x: 446, r: 2, dur: 8.2, offset: 0.15 },
]
const WINDOW = { x: 48, y: 58, width: 196, height: 112 }
const DOCK = { x: 150, y: 214, width: 180, height: 30 }
const DOCK_ICONS = [0, 1, 2, 3, 4]

/** Bumpy snow pile sitting on a ledge from x1 to x2 at height y. */
const pile = (x1: number, x2: number, y: number, depth: number) => {
  const mid = (x1 + x2) / 2
  return `M${x1} ${y} C ${x1 + 10} ${y - depth}, ${mid - 30} ${y - depth - 2}, ${mid} ${y - depth + 1} S ${x2 - 10} ${y - depth}, ${x2} ${y} Z`
}

export default function SeasonsVisual({ label }: { label: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex h-full w-full items-center justify-center p-5 md:p-6">
      <svg viewBox={`0 0 480 ${HEIGHT}`} role="img" aria-label={label} className="h-auto w-full max-w-[30rem]">
        <g fill="var(--faint)">
          {FLAKES.map(flake =>
            reduceMotion ? (
              <circle key={flake.x} cx={flake.x} cy={20 + flake.offset * 180} r={flake.r} />
            ) : (
              <circle key={flake.x} cx={flake.x} r={flake.r}>
                <animate
                  attributeName="cy"
                  from="-6"
                  to={HEIGHT}
                  dur={`${flake.dur}s`}
                  begin={`${-flake.offset * flake.dur}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${flake.x};${flake.x + 7};${flake.x}`}
                  dur={`${flake.dur / 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ),
          )}
        </g>

        <rect
          x={WINDOW.x}
          y={WINDOW.y}
          width={WINDOW.width}
          height={WINDOW.height}
          rx="8"
          fill="var(--surface)"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
        />
        <line
          x1={WINDOW.x}
          y1={WINDOW.y + 22}
          x2={WINDOW.x + WINDOW.width}
          y2={WINDOW.y + 22}
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        {[0, 1, 2].map(index => (
          <circle key={index} cx={WINDOW.x + 14 + index * 12} cy={WINDOW.y + 11} r="3.5" fill="var(--line-strong)" />
        ))}
        <path d={pile(WINDOW.x + 4, WINDOW.x + WINDOW.width - 4, WINDOW.y, 12)} fill="var(--faint)" fillOpacity="0.5" stroke="var(--faint)" strokeWidth="1.5" />

        <rect
          x={DOCK.x}
          y={DOCK.y}
          width={DOCK.width}
          height={DOCK.height}
          rx="10"
          fill="var(--surface)"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
        />
        {DOCK_ICONS.map(index => (
          <rect key={index} x={DOCK.x + 14 + index * 32} y={DOCK.y + 6} width="24" height="18" rx="5" fill="var(--accent-soft)" />
        ))}
        <path d={pile(DOCK.x + 6, DOCK.x + 92, DOCK.y, 11)} fill="var(--faint)" fillOpacity="0.5" stroke="var(--faint)" strokeWidth="1.5" />
        <path d={pile(DOCK.x + 120, DOCK.x + DOCK.width - 6, DOCK.y, 10)} fill="var(--faint)" fillOpacity="0.5" stroke="var(--faint)" strokeWidth="1.5" />

        <path
          d={`M0 ${HEIGHT} L0 ${HEIGHT - 6} C 40 ${HEIGHT - 11}, 90 ${HEIGHT - 9}, ${DOCK.x - 6} ${HEIGHT - 8} L${DOCK.x + DOCK.width + 6} ${HEIGHT - 8} C 400 ${HEIGHT - 10}, 450 ${HEIGHT - 12}, 480 ${HEIGHT - 7} L480 ${HEIGHT} Z`}
          fill="var(--faint)"
          fillOpacity="0.5"
          stroke="var(--faint)"
          strokeWidth="1.5"
        />

        {/* Pointer that has just swept the gap into the Dock pile. */}
        <path
          d={`M${DOCK.x + 104} ${DOCK.y - 24} l0 17 l4.5 -4 l3 7 l3 -1.4 l-3 -6.8 l6 -0.3 Z`}
          fill="var(--ink)"
          stroke="var(--surface)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
