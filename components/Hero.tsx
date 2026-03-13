'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import Link from 'next/link'
import { stagger, fadeUp, fadeIn, lnEase } from '@/lib/animations'

/* ── Looping typewriter: types → pauses → deletes → pauses → repeat ── */
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [chars,   setChars]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  // Initial delay before first run
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let t: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (chars < text.length) {
        // Still typing forward
        t = setTimeout(() => setChars(c => c + 1), 72)
      } else {
        // Fully typed — pause before deleting
        t = setTimeout(() => setDeleting(true), 1600)
      }
    } else {
      if (chars > 0) {
        // Deleting backward (faster)
        t = setTimeout(() => setChars(c => c - 1), 38)
      } else {
        // Fully deleted — pause before retyping
        t = setTimeout(() => setDeleting(false), 600)
      }
    }

    return () => clearTimeout(t)
  }, [started, chars, deleting, text])

  return (
    <span>
      {text.slice(0, chars)}
      {/* Cursor always blinks while looping */}
      <motion.span
        className="inline-block w-[2px] h-[0.8em] bg-teal-400 ml-[2px] align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear', times: [0, 0.45, 0.5, 0.95] }}
      />
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background blobs ── */}
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

      {/* ── Content ── */}
      <div className="section-wrapper relative z-10 pt-28 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* "Hello, I'm" — typewriter, starts after 350ms */}
          <motion.p
            variants={fadeIn}
            className="font-mono text-teal-400 text-sm tracking-[0.22em] uppercase mb-6 h-5"
          >
            <TypeWriter text="Hello, I'm" delay={350} />
          </motion.p>

          {/* Name — LN-style clip reveal */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: lnEase, delay: 0.3 }}
            >
              <h1 className="text-[clamp(4rem,12vw,10rem)] font-extrabold leading-none tracking-tight">
                <span className="gradient-text">Laurenz</span>
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: lnEase, delay: 0.42 }}
            >
              <h1 className="text-[clamp(4rem,12vw,10rem)] font-extrabold leading-none tracking-tight text-[var(--text-primary)]">
                Rauscher.
              </h1>
            </motion.div>
          </div>

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
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
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
