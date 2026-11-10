'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { START_STATS, createGame, demoStep, step } from '@/lib/game'
import type { Dir, Fighter, GameState } from '@/lib/game'
import { GAME_TEXT, type GameText } from '@/lib/translations/game'
import { useLanguage } from '../LanguageProvider'
import { useBoardCanvas } from './useBoardCanvas'
import { useBoardSize } from './useBoardSize'
import './game.css'

const TICK_MS = 170
const RESTART_MS = 3200
const KEYS: Record<string, Dir> = {
  ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left',
  w: 'up', d: 'right', s: 'down', a: 'left',
}
const PAD: readonly { dir: Dir; arrow: string }[] = [
  { dir: 'up', arrow: '↑' }, { dir: 'left', arrow: '←' }, { dir: 'down', arrow: '↓' }, { dir: 'right', arrow: '→' },
]
const newSeed = () => Math.floor(Math.random() * 2 ** 31)

type Mode = 'demo' | 'play'

interface StatsProps {
  glyph: string
  tone: 'player' | 'rival'
  name: string
  fighter: Fighter | undefined
  text: GameText
}

function Stats({ glyph, tone, name, fighter, text }: StatsProps) {
  const hp = Math.max(0, fighter?.hp ?? START_STATS.hp)
  const maxHp = fighter?.maxHp ?? START_STATS.hp
  return (
    <div className={`game-stats game-stats--${tone}`}>
      <span className="game-stats__who"><b aria-hidden="true">{glyph}</b> {name}</span>
      <span className="game-stats__bar" aria-hidden="true"><i style={{ width: `${(hp / maxHp) * 100}%` }} /></span>
      <span>{text.hp} {hp}/{maxHp}</span>
      <span>{text.atk} {fighter?.atk ?? START_STATS.atk}</span>
      <span>{text.def} {fighter?.def ?? START_STATS.def}</span>
      <span>{text.level} {fighter?.level ?? 1}</span>
    </div>
  )
}

export default function DungeonGame() {
  const { lang } = useLanguage()
  const text = GAME_TEXT[lang]
  const boardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = useBoardSize(boardRef)
  const [game, setGame] = useState<GameState | null>(null)
  const [mode, setMode] = useState<Mode>('demo')
  const [visible, setVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  const cols = size?.cols
  const rows = size?.rows
  const restart = useCallback(() => {
    if (cols && rows) setGame(createGame(cols, rows, newSeed()))
  }, [cols, rows])

  // A new dungeon whenever the grid that fits the window changes.
  useEffect(restart, [restart])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stop steering when the board scrolls away, so the arrow keys scroll the page again.
  useEffect(() => {
    if (!visible) setMode('demo')
  }, [visible])

  const running = game?.status === 'running'
  useEffect(() => {
    if (mode !== 'demo' || !visible || reducedMotion) return
    if (!running) {
      const timeout = window.setTimeout(restart, RESTART_MS)
      return () => window.clearTimeout(timeout)
    }
    const tick = () => { if (!document.hidden) setGame(g => (g ? demoStep(g) : g)) }
    const interval = window.setInterval(tick, TICK_MS)
    return () => window.clearInterval(interval)
  }, [mode, visible, reducedMotion, running, restart])

  const move = useCallback((dir: Dir) => setGame(g => (g ? step(g, dir) : g)), [])

  useEffect(() => {
    if (mode !== 'play') return
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === 'Escape') return setMode('demo')
      const dir = KEYS[event.key.length === 1 ? event.key.toLowerCase() : event.key]
      if (!dir) return
      event.preventDefault()
      move(dir)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, move])

  useBoardCanvas(canvasRef, game, size, reducedMotion)

  const takeControl = () => {
    if (!running) restart()
    setMode('play')
    boardRef.current?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const over = game && !running
  const message = over
    ? text.summary(game.turn, game.player.kills + game.rival.kills, game.player.loot + game.rival.loot)
    : game?.lastEvent ? text.event(game.lastEvent) : text.idle

  return (
    <div className="game" data-mode={mode}>
      <div ref={boardRef} className="game-board">
        <canvas ref={canvasRef} role="img" aria-label={text.board} />
        {over && (
          <p className="game-result" data-status={game.status}>
            {game.status === 'won' ? text.won : text.lost}
          </p>
        )}
      </div>

      <div className="game-hud">
        <Stats glyph="@" tone="player" name={mode === 'play' ? text.you : text.demoPilot} fighter={game?.player} text={text} />
        <Stats glyph="*" tone="rival" name={text.rival} fighter={game?.rival} text={text} />
      </div>
      <p className="game-log" aria-live={mode === 'play' ? 'polite' : 'off'}>{message}</p>

      <div className="game-controls">
        {mode === 'demo' ? (
          <button type="button" className="btn btn-primary" onClick={takeControl}>{text.takeControl}</button>
        ) : (
          <>
            {over && <button type="button" className="btn btn-primary" onClick={restart}>{text.playAgain}</button>}
            <button type="button" className="btn btn-ghost" onClick={() => setMode('demo')}>{text.backToDemo}</button>
          </>
        )}
        <button type="button" className="btn btn-ghost" onClick={restart}>{text.newDungeon}</button>
        <p className="game-hint">{mode === 'play' ? text.hintPlay : text.hintDemo}</p>
      </div>

      {mode === 'play' && (
        <div className="game-pad">
          {PAD.map(({ dir, arrow }) => (
            <button key={dir} type="button" className={`game-pad__key game-pad__key--${dir}`} aria-label={text.moves[dir]} onClick={() => move(dir)}>
              <span aria-hidden="true">{arrow}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
