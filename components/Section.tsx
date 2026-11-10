interface SectionProps {
  id: string
  heading: string
  intro?: string
  children: React.ReactNode
}

export default function Section({ id, heading, intro, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <header className="mb-10 max-w-2xl md:mb-14">
          <h2
            id={headingId}
            className="font-display text-[2rem] font-semibold leading-tight md:text-[2.75rem]"
          >
            {heading}
          </h2>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
