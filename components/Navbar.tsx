'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl border-b py-3'
          : 'bg-transparent py-5'
      }`}
      style={scrolled ? {
        backgroundColor: 'var(--nav-bg-scrolled)',
        borderColor: 'var(--border)',
      } : undefined}
    >
      <div className="w-full px-8 md:px-12 lg:px-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="#home" className="group">
          <span className="font-mono text-xl font-bold gradient-text tracking-tight">LR</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors relative group"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
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
      {menuOpen && (
        <div
          className="md:hidden backdrop-blur-xl border-b px-6 py-5 flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--mobile-menu-bg)',
            borderColor: 'var(--border)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-1 text-sm font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
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
        </div>
      )}
    </nav>
  )
}
