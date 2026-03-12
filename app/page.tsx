import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

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
      <footer className="text-center py-8 text-slate-600 text-sm border-t border-white/[0.04]">
        <p>© 2026 Laurenz Rauscher · Built with Next.js & Tailwind CSS</p>
      </footer>
    </>
  )
}
