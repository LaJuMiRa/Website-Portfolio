'use client'

import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import Section from './Section'
import ContactForm from './ContactForm'
import CopyButton from './CopyButton'
import { useLanguage } from './LanguageProvider'
import { SITE } from '@/lib/site'

const ICONS = { github: Github, linkedin: Linkedin } as const

export default function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contact" heading={t.contact.heading} intro={t.contact.intro}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <h3 className="text-[0.95rem] text-muted">{t.contact.emailHeading}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${SITE.email}`}
              className="text-link font-display text-xl font-medium break-all sm:text-2xl"
            >
              {SITE.email}
            </a>
            <CopyButton
              value={SITE.email}
              labels={{ copy: t.contact.copy, copied: t.contact.copied, failed: t.contact.copyFailed }}
            />
          </div>

          <h3 className="mt-10 text-[0.95rem] text-muted">{t.contact.onlineHeading}</h3>
          <ul className="mt-2 border-b border-line">
            {SITE.socials.map(social => {
              const Icon = ICONS[social.id]
              return (
                <li key={social.id} className="border-t border-line">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 py-4 transition-colors hover:text-accent"
                  >
                    <Icon size={20} aria-hidden />
                    <span className="font-medium">{social.name}</span>
                    <span className="text-muted">{social.handle}</span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="ml-auto text-faint transition-colors group-hover:text-accent"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
