import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CareerPage from '@/components/experience/CareerPage'
import { SITE } from '@/lib/site'
import { de } from '@/lib/translations'

export const metadata: Metadata = {
  title: `${de.career.title} · ${SITE.name}`,
  description: de.career.intro,
}

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <CareerPage />
      <Footer />
    </>
  )
}
