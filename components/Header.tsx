'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useLanguage, type Lang } from './LanguageProvider'
import { useTheme } from './ThemeProvider'
import { useActiveSection } from '@/lib/useActiveSection'
import { SECTION_IDS, SITE } from '@/lib/site'

const LANGS: readonly Lang[] = ['de', 'en']

function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t.a11y.language} className="flex rounded-lg border border-line-strong p-0.5">
      {LANGS.map(code => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
          className={`min-h-9 rounded-md px-2.5 text-sm font-semibold uppercase transition-colors ${
            lang === code ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.a11y.toLight : t.a11y.toDark}
      className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-well hover:text-ink"
    >
      {isDark ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
    </button>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const pathname = usePathname()
  const onHome = pathname === '/'
  // Sub-pages live outside the one-pager: link back to it and keep their section marked.
  const base = onHome ? '' : '/'
  const active = onHome ? activeSection : pathname.startsWith('/experience') ? 'experience' : 'projects'

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = SECTION_IDS.map(id => ({ id, label: t.nav[id] }))

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-(--header-bg) backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {t.a11y.skip}
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-2 sm:gap-4">
        <a href={onHome ? '#top' : '/'} className="whitespace-nowrap font-display text-base font-semibold sm:text-lg">
          {SITE.name}
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map(link => (
              <li key={link.id}>
                <a
                  href={`${base}#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors hover:text-ink ${
                    active === link.id ? 'text-ink underline decoration-accent decoration-2 underline-offset-8' : 'text-muted'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitch />
          <ThemeSwitch />
          <a href={SITE.cvFile} download className="btn btn-ghost ml-1.5 hidden min-h-10 px-4 lg:inline-flex">
            <Download size={16} aria-hidden />
            {t.nav.resume}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-well md:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label={t.a11y.mainNav} className="rise border-t border-line bg-bg md:hidden">
          <ul className="container-page py-3">
            {links.map(link => (
              <li key={link.id}>
                <a
                  href={`${base}#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-line py-4 font-display text-xl font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-5 pb-2">
              <a href={SITE.cvFile} download className="btn btn-ghost w-full">
                <Download size={16} aria-hidden />
                {t.hero.downloadResume}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
