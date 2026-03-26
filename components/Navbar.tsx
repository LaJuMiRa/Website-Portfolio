'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '#about',      label: 'About' },
  //{ href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20))

  // Active section detection
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl border-b py-3' : 'bg-transparent py-5'
      }`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        ...(scrolled ? { backgroundColor: 'var(--nav-bg-scrolled)', borderColor: 'var(--border)' } : {}),
      }}
    >
      <div className="w-full px-8 md:px-12 lg:px-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="#home" className="group">
          <span className="font-mono text-xl font-bold gradient-text tracking-tight">LR</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors relative group"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)')}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-orange-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            )
          })}
          <ThemeToggle />
          <a
            href="/Lebenslauf_Rauscher.pdf"
            download
            className="flex items-center gap-1.5 text-sm px-4 py-2 border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 rounded-full transition-all duration-300 font-medium"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden backdrop-blur-xl border-b px-6 py-5 flex flex-col gap-4"
            style={{
              backgroundColor: 'var(--mobile-menu-bg)',
              borderColor: 'var(--border)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeHref === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-medium transition-colors"
                  aria-current={isActive ? 'page' : undefined}
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex items-center gap-3 pt-1">
              <ThemeToggle />
              <a
                href="/Lebenslauf_Rauscher.pdf"
                download
                className="text-orange-400 text-sm font-medium py-1 flex items-center gap-2"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 origin-left"
      />
    </nav>
  )
}
