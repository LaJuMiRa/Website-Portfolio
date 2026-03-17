import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="relative z-10 flex items-center justify-between py-8 text-sm text-[var(--text-faint)] border-t border-[var(--border)] px-8 md:px-12 lg:px-16">
        <BackToTop />
        <p>© 2026 Laurenz Rauscher · Built with Next.js & Tailwind CSS</p>
      </footer>
    </>
  )
}
