'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { en, de, type Translations } from '@/lib/translations'

type Lang = 'en' | 'de'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  t: en,
  toggleLang: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang | null
    if (saved === 'en' || saved === 'de') setLang(saved)
  }, [])

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'de' : 'en'
      localStorage.setItem('portfolio-lang', next)
      return next
    })
  }

  const t = lang === 'de' ? de : en

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
