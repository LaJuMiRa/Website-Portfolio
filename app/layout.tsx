import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Martian_Mono, Schibsted_Grotesk } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import LanguageProvider from '@/components/LanguageProvider'
import { SITE } from '@/lib/site'

const display = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--ff-display',
  display: 'swap',
})

const body = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--ff-body',
  display: 'swap',
})

const TITLE = 'Laurenz Rauscher · Informatik-Student & Softwareentwickler'
const DESCRIPTION =
  'Portfolio von Laurenz Rauscher, Informatik-Student an der FH Wiener Neustadt: Projekte, Erfahrung und Kontakt.'

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f5f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1016' },
  ],
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'de_AT',
    type: 'website',
  },
}

const THEME_INIT = `
(function(){
  try {
    var saved = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if ((saved || system) === 'light') document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`dark ${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
