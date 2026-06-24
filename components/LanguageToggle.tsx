'use client'

import { useLanguage } from './LanguageProvider'

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="p-2 px-3 rounded-full transition-all duration-300 hover:bg-orange-500/10 font-mono text-xs font-semibold tracking-wider"
      style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
    >
      {lang === 'en' ? 'DE' : 'EN'}
    </button>
  )
}
