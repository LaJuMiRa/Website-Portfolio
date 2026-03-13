import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import DotBackground from '@/components/DotBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Laurenz Rauscher — Software Developer',
  description: 'Portfolio of Laurenz Rauscher — Software Developer passionate about building elegant software solutions.',
  metadataBase: new URL('https://laurenz-rauscher.at'),
  openGraph: {
    title: 'Laurenz Rauscher — Software Developer',
    description: 'Portfolio of Laurenz Rauscher',
    url: 'https://laurenz-rauscher.at',
    siteName: 'Laurenz Rauscher',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var theme = t || sys;
              if (theme === 'light') {
                document.documentElement.classList.remove('dark');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <DotBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
