'use client'

import { useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Github, Linkedin, CheckCircle } from 'lucide-react'
import { stagger, slideFromLeft, clipReveal, fadeUp, fadeUpSoft, fadeIn } from '@/lib/animations'

const EMAIL = 'laurenz.rauscher@gmail.com'                              // ✏️  deine E-Mail

const socialLinks = [
  {
    name: 'GitHub',   handle: '@LaJuMiRa',                       // ✏️
    href: 'https://github.com/LaJuMiRa',                         // ✏️
    icon: Github,   hoverBorder: 'hover:border-white/25',   hoverText: 'group-hover:text-white',
  },
  {
    name: 'LinkedIn', handle: 'Laurenz Rauscher',
    href: 'https://www.linkedin.com/in/laurenz-rauscher-299931234',                 // ✏️
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
  const [errors,  setErrors]  = useState<{ name?: string; email?: string; message?: string }>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name)                         newErrors.name    = 'Required'
    if (!email)                        newErrors.email   = 'Required'
    else if (!emailRegex.test(email))  newErrors.email   = 'Please enter a valid email address'
    if (!message)                      newErrors.message = 'Required'
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }
    setErrors({})
    const subject = encodeURIComponent(`Portfolio — Message from ${name}`)
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" ref={ref}>
      <div className="section-wrapper">
        <motion.div variants={stagger} initial="hidden" animate={vis}>

          <div className="section-header">
            <motion.span variants={slideFromLeft} className="section-number">04.</motion.span>
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
                    <p className="font-semibold text-lg text-[var(--text-primary)]">Message opened!</p>
                    <p className="text-sm mt-1 text-[var(--text-secondary)]">
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
                      <label htmlFor="name" className="text-xs font-mono text-[var(--text-secondary)]">Name *</label>
                      <input id="name" type="text" placeholder="Max Mustermann"
                        value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })) }} className="form-input" />
                      {errors.name && <span className="text-xs text-red-400 mt-0.5">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-[var(--text-secondary)]">Email *</label>
                      <input id="email" type="email" placeholder="max.mustermann@example.com"
                        value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })) }} className="form-input" />
                      {errors.email && <span className="text-xs text-red-400 mt-0.5">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-[var(--text-secondary)]">Message *</label>
                    <textarea id="message" rows={6} placeholder="Hi Laurenz, I'd love to talk about..."
                      value={message} onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: undefined })) }} className="form-input resize-none" />
                    {errors.message && <span className="text-xs text-red-400 mt-0.5">{errors.message}</span>}
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
              <motion.p variants={fadeUpSoft} className="leading-relaxed text-[0.95rem] text-[var(--text-secondary)]">
                I&apos;m currently open to new opportunities. Whether you have a project
                in mind, a role that might be a good fit, or just want to connect —
                feel free to reach out.
              </motion.p>

              <motion.div variants={fadeUpSoft}>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3 text-[var(--text-faint)]">
                  Find me online
                </p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`card flex items-center gap-4 transition-all duration-300 group ${s.hoverBorder}`}>
                      <s.icon size={20} className={`shrink-0 transition-all duration-200 group-hover:scale-110 text-[var(--text-muted)] ${s.hoverText}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{s.name}</p>
                        <p className="text-xs truncate text-[var(--text-muted)]">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpSoft}>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-2 text-[var(--text-faint)]">
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
