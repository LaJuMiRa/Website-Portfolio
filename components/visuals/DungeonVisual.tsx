'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type Pos = readonly [row: number, col: number]

const MAP = [
  '#####################',
  '#@....#.......#.....#',
  '#.##..#.###.#.#.###.#',
  '#..#....#...#...#...#',
  '##.####.#.#####.#.###',
  '#..#....#.....#.#...#',
  '#.##.####.###.#.###.#',
  '#....#R.....#.....>.#',
  '#####################',
] as const

const TURN_MS = 420
const RIVAL_SPEED = 0.6
const HOLD_TURNS = 5
const LINE_HEIGHT_EM = 1.3
const NEIGHBOURS: readonly Pos[] = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function find(symbol: string): Pos {
  const row = MAP.findIndex(line => line.includes(symbol))
  return [row, MAP[row].indexOf(symbol)]
}

/** Shortest path on the map grid, both ends included. */
function shortestPath(from: Pos, to: Pos): readonly Pos[] {
  const key = ([r, c]: Pos) => `${r}:${c}`
  const seen = new Set([key(from)])
  let frontier: readonly (readonly Pos[])[] = [[from]]

  while (frontier.length > 0) {
    const next: (readonly Pos[])[] = []
    for (const path of frontier) {
      const [r, c] = path[path.length - 1]
      if (r === to[0] && c === to[1]) return path
      for (const [dr, dc] of NEIGHBOURS) {
        const cell: Pos = [r + dr, c + dc]
        if (MAP[cell[0]]?.[cell[1]] !== '#' && !seen.has(key(cell))) {
          seen.add(key(cell))
          next.push([...path, cell])
        }
      }
    }
    frontier = next
  }
  return [from]
}

const EXIT = find('>')
const PLAYER_PATH = shortestPath(find('@'), EXIT)
const RIVAL_PATH = shortestPath(find('R'), EXIT)
const LAST_TURN = Math.max(PLAYER_PATH.length - 1, Math.ceil((RIVAL_PATH.length - 1) / RIVAL_SPEED))
const CYCLE = LAST_TURN + HOLD_TURNS

const GLYPHS: Record<string, { char: string; className: string }> = {
  '#': { char: '#', className: 'text-line-strong' },
  '>': { char: '>', className: 'font-bold text-accent' },
}
const FLOOR = { char: '·', className: 'text-faint/60' }

const at = (path: readonly Pos[], index: number) => path[Math.min(Math.floor(index), path.length - 1)]

function actorStyle([row, col]: Pos, animate: boolean): CSSProperties {
  return {
    transform: `translate(${col}ch, ${row * LINE_HEIGHT_EM}em)`,
    transition: animate ? `transform ${TURN_MS}ms linear` : undefined,
  }
}

export default function DungeonVisual({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = window.setInterval(() => setTurn(current => (current + 1) % CYCLE), TURN_MS)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion])

  // Without motion, show a frozen mid-race frame instead of the start position.
  const shownTurn = reduceMotion ? Math.floor(LAST_TURN / 2) : turn
  const player = at(PLAYER_PATH, shownTurn)
  const rival = at(RIVAL_PATH, shownTurn * RIVAL_SPEED)
  const animate = !reduceMotion && shownTurn !== 0

  return (
    <div ref={ref} role="img" aria-label={label} className="@container flex h-full w-full items-center justify-center p-6 md:p-8">
      <div aria-hidden className="font-mono text-[min(6.2cqw,1.75rem)]" style={{ lineHeight: LINE_HEIGHT_EM }}>
        <div className="relative">
          <pre className="font-mono">
            {MAP.map((line, row) => (
              <div key={row}>
                {[...line].map((symbol, col) => {
                  const glyph = GLYPHS[symbol] ?? FLOOR
                  return (
                    <span key={col} className={glyph.className}>
                      {glyph.char}
                    </span>
                  )
                })}
              </div>
            ))}
          </pre>
          <span className="absolute left-0 top-0 font-bold text-rival" style={actorStyle(rival, animate)}>
            R
          </span>
          <span className="absolute left-0 top-0 font-bold text-ink" style={actorStyle(player, animate)}>
            @
          </span>
        </div>
        <p className="mt-[1em] flex gap-[2ch] text-[0.6em] text-muted">
          <span>turn {String(Math.min(shownTurn, LAST_TURN)).padStart(2, '0')}</span>
          <span>
            <span className="font-bold text-ink">@</span> you
          </span>
          <span>
            <span className="font-bold text-rival">R</span> rival
          </span>
          <span>
            <span className="font-bold text-accent">&gt;</span> exit
          </span>
        </p>
      </div>
    </div>
  )
}
