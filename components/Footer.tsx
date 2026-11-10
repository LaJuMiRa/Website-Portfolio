'use client'

import { ArrowUp } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { SITE } from '@/lib/site'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col gap-4 text-[0.95rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {YEAR} {SITE.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {SITE.socials.map(social => (
            <li key={social.id}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {social.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink">
              {t.footer.backToTop}
              <ArrowUp size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
