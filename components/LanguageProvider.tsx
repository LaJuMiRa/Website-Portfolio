'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { en, de, type Translations } from '@/lib/translations'

export type Lang = 'en' | 'de'

const STORAGE_KEY = 'portfolio-lang'
const DEFAULT_LANG: Lang = 'de'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  t: de,
  setLang: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'de') return saved
  } catch {
    // Storage can be blocked (private mode); fall through to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    setLangState(readInitialLang())
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Preference just won't persist; the switch itself still works.
    }
  }, [])

  const value = useMemo(
    () => ({ lang, t: lang === 'de' ? de : en, setLang }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
