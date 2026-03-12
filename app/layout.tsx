import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#080808] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
