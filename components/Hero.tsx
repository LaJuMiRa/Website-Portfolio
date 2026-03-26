'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import Link from 'next/link'
import { stagger, fadeUp, fadeIn, lnEase } from '@/lib/animations'

/* ── Looping typewriter ── */
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [chars,    setChars]    = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started,  setStarted]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let t: ReturnType<typeof setTimeout>
    if (!deleting) {
      if (chars < text.length) t = setTimeout(() => setChars(c => c + 1), 72)
      else                      t = setTimeout(() => setDeleting(true), 1600)
    } else {
      if (chars > 0) t = setTimeout(() => setChars(c => c - 1), 38)
      else           t = setTimeout(() => setDeleting(false), 600)
    }
    return () => clearTimeout(t)
  }, [started, chars, deleting, text])

  return (
    <span>
      {text.slice(0, chars)}
      <motion.span
        className="inline-block w-[2px] h-[0.8em] bg-teal-400 ml-[2px] align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear', times: [0, 0.45, 0.5, 0.95] }}
      />
    </span>
  )
}

/* ── Mini Marquee ── */
const marqueeItems = [
  { label: 'C', color: '#2dd4bf' },
  { label: 'C++', color: '#fb923c' },
  { label: 'SQL', color: '#2c60d1' },
  { label: 'Python', color: '#087b00' },
  { label: 'JavaScript', color: '#fbbf24' },
  { label: 'PHP', color: '#777BB4' },
  { label: 'C#', color: '#512BD4' },
]
const miniItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

function MiniMarquee() {
  return (
    <div className="overflow-hidden max-w-xs mb-6" aria-hidden="true">
      <div
        className="flex gap-5 w-max"
        style={{ animation: 'tech-marquee 14s linear infinite' }}
      >
        {miniItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] tracking-wider">
            <span className="w-1 h-1 rounded-full" style={{ background: item.color }} />
            <span style={{ color: item.color, opacity: 1 }}>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Terminal ── */
type TerminalLine =
  | { type: 'cmd';   text: string; delay: number }
  | { type: 'out';   text: string; delay: number }
  | { type: 'blank'; delay: number }
  | { type: 'skill'; name: string; level: number; label: string; color: string; delay: number }

const terminalLines: TerminalLine[] = [
  { type: 'blank',                                                                      delay: 1250 },
  { type: 'cmd',   text: '$ skills --list',                                             delay: 1700 },
  { type: 'blank',                                                                      delay: 2150 },
  { type: 'skill', name: 'C',           level: 10, label: 'Primary',  color: '#2dd4bf', delay: 2600 },
  { type: 'skill', name: 'C++',         level: 9,  label: 'Primary',  color: '#fb923c', delay: 3050 },
  { type: 'skill', name: 'SQL',         level: 8,  label: 'Primary',  color: '#2c60d1', delay: 3500 },
  { type: 'skill', name: 'Python',      level: 7,  label: 'Familiar', color: '#087b00', delay: 3950 },
  { type: 'skill', name: 'JavaScript',  level: 5,  label: 'Familiar', color: '#fbbf24', delay: 4400 },
  { type: 'skill', name: 'PHP',         level: 5,  label: 'Familiar', color: '#777BB4', delay: 4850 },
  { type: 'skill', name: 'C#',          level: 2,  label: 'Familiar', color: '#512BD4', delay: 5300 },
  { type: 'blank',                                                                      delay: 5750 },
]

function bar(level: number, total = 10) {
  return '█'.repeat(level) + '░'.repeat(total - level)
}

function Terminal() {
  const [visible, setVisible] = useState(0)
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisible(i + 1), line.delay)
    )
    const cursorTimer = setTimeout(() => setShowCursor(true), terminalLines[terminalLines.length - 1].delay + 300)
    return () => { timers.forEach(clearTimeout); clearTimeout(cursorTimer) }
  }, [])

  return (
    <motion.div
      variants={fadeIn}
      className="hidden lg:block"
    >
      <div className="card rounded-xl overflow-hidden font-mono text-xs leading-relaxed"
        style={{ border: '1px solid var(--border)', background: 'rgba(8,8,8,0.9)' }}>

        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)]"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[10px] tracking-widest text-[var(--text-faint)]">terminal</span>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-0.5 min-h-[220px]">
          {terminalLines.slice(0, visible).map((line, i) => {
            if (line.type === 'blank') return <div key={i} className="h-2" />
            if (line.type === 'cmd')   return (
              <p key={i} className="text-orange-400">{line.text}</p>
            )
            if (line.type === 'out')   return (
              <p key={i} className="text-[var(--text-secondary)] pl-2">{line.text}</p>
            )
            if (line.type === 'skill') return (
              <div key={i} className="flex items-center gap-3 pl-2">
                <span className="w-20 shrink-0" style={{ color: line.color }}>{line.name}</span>
                <span style={{ color: line.color, opacity: 0.5 }}>{bar(line.level)}</span>
                <span className="text-[var(--text-faint)]">{line.label}</span>
              </div>
            )
          })}
          {showCursor && (
            <motion.span
              className="inline-block w-[7px] h-[13px] bg-orange-400/70"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear', times: [0, 0.45, 0.5, 0.95] }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Hero ── */
export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div style={{
          position: 'absolute', top: '-10%', left: '-15%',
          width: '750px', height: '750px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234,88,12,0.17) 0%, transparent 68%)',
          filter: 'blur(90px)', animation: 'float1 28s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-15%',
          width: '680px', height: '680px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.13) 0%, transparent 68%)',
          filter: 'blur(100px)', animation: 'float2 34s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '25%',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.09) 0%, transparent 68%)',
          filter: 'blur(80px)', animation: 'float3 22s ease-in-out infinite',
        }} />
      </div>

      {/* Content */}
      <div className="section-wrapper relative z-10 pt-28 pb-16 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center"
        >

          {/* ── Left: text ── */}
          <div>
            {/* "Hello, I'm" typewriter */}
            <motion.p
              variants={fadeIn}
              className="font-mono text-teal-400 text-sm tracking-[0.22em] uppercase mb-6 h-5"
            >
              <TypeWriter text="Hello, I'm" delay={350} />
            </motion.p>

            {/* Name */}
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: lnEase, delay: 0.3 }}
              >
                <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-none tracking-tight">
                  <span className="gradient-text">Laurenz</span>
                </h1>
              </motion.div>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: lnEase, delay: 0.42 }}
              >
                <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-none tracking-tight text-[var(--text-primary)]">
                  Rauscher.
                </h1>
              </motion.div>
            </div>

            {/* Mini marquee — between name and title */}
            <motion.div variants={fadeIn}>
              <MiniMarquee />
            </motion.div>

            {/* ✏️  Dein Titel */}
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl font-light mb-4 text-[var(--text-secondary)]"
            >
              CS Student @ FH Wiener Neustadt
            </motion.p>

            {/* ✏️  Deine Tagline */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl mb-12 text-base md:text-lg leading-relaxed text-[var(--text-muted)]"
            >
              Still learning. Already building
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="/Lebenslauf_Rauscher.pdf" download className="btn-primary">
                <Download size={17} />
                Download Resume
              </a>
              <Link href="#contact" className="btn-secondary">
                <Mail size={17} />
                Get in Touch
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Terminal ── */}
          <Terminal />

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-12 lg:left-16 flex flex-col items-start gap-2"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-faint)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="text-[var(--text-faint)]" size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
