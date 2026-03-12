'use client'

import { useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Github, Linkedin, CheckCircle } from 'lucide-react'
import { stagger, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'

const EMAIL = 'your@email.com'                              // ✏️  deine E-Mail

const socialLinks = [
  {
    name: 'GitHub',   handle: '@YOUR_USERNAME',                       // ✏️
    href: 'https://github.com/YOUR_USERNAME',                         // ✏️
    icon: Github,   hoverBorder: 'hover:border-white/25',   hoverText: 'group-hover:text-white',
  },
  {
    name: 'LinkedIn', handle: 'Laurenz Rauscher',
    href: 'https://linkedin.com/in/YOUR_PROFILE',                     // ✏️
    icon: Linkedin, hoverBorder: 'hover:border-sky-500/40', hoverText: 'group-hover:text-sky-400',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const vis = isInView ? 'visible' : 'hidden'

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    const subject = encodeURIComponent(`Portfolio — Message from ${name}`)
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <section id="contact" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">05.</motion.span>
            <div className="overflow-hidden">
              <motion.h2 variants={clipReveal} className="section-heading">Get in Touch</motion.h2>
            </div>
            <motion.div variants={fadeIn} className="section-divider" />
          </div>
          <motion.p variants={fadeUp} className="section-subtitle">Have a question or want to work together?</motion.p>

          <div className="grid md:grid-cols-5 gap-14 items-start">

            {/* ── Form ── */}
            <motion.div variants={fadeUp} className="md:col-span-3">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }} className="card flex flex-col items-start gap-4 py-10">
                  <CheckCircle className="text-teal-400" size={36} />
                  <div>
                    <p className="text-white font-semibold text-lg">Message opened!</p>
                    <p className="text-neutral-400 text-sm mt-1">
                      Your default mail client opened with the message pre-filled.
                      Just hit send and I&apos;ll get back to you soon.
                    </p>
                  </div>
                  <button onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}
                    className="text-orange-400 text-sm hover:text-orange-300 transition-colors font-medium">
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-neutral-400 text-xs font-mono">Name *</label>
                      <input id="name" type="text" placeholder="Erika Mustermann"
                        value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-neutral-400 text-xs font-mono">Email *</label>
                      <input id="email" type="email" placeholder="erika@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-neutral-400 text-xs font-mono">Message *</label>
                    <textarea id="message" rows={6} placeholder="Hi Laurenz, I'd love to talk about..."
                      value={message} onChange={(e) => setMessage(e.target.value)} required className="form-input resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Right: intro + social ── */}
            <motion.div variants={stagger} className="md:col-span-2 space-y-8">
              {/* ✏️  Passe diesen Text an */}
              <motion.p variants={fadeUpSoft} className="text-neutral-400 leading-relaxed text-[0.95rem]">
                I&apos;m currently open to new opportunities. Whether you have a project
                in mind, a role that might be a good fit, or just want to connect —
                feel free to reach out.
              </motion.p>

              <motion.div variants={fadeUpSoft}>
                <p className="text-neutral-600 text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
                  Find me online
                </p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`card flex items-center gap-4 transition-all duration-300 group ${s.hoverBorder}`}>
                      <s.icon size={20} className={`shrink-0 text-neutral-500 transition-all duration-200 group-hover:scale-110 ${s.hoverText}`} />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium">{s.name}</p>
                        <p className="text-neutral-500 text-xs truncate">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpSoft}>
                <p className="text-neutral-600 text-[11px] font-mono uppercase tracking-[0.2em] mb-2">
                  Or reach me directly
                </p>
                <a href={`mailto:${EMAIL}`}
                  className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium break-all">
                  {EMAIL}
                </a>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
