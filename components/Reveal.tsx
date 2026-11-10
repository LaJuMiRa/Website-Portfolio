'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '@/lib/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Milliseconds to wait after scrolling in; use for short sibling staggers only. */
  delay?: number
  /** "mask" wipes the block in from its baseline, used for section headings. */
  kind?: 'rise' | 'mask'
  as?: 'div' | 'li' | 'header'
}

export default function Reveal({ children, className, delay = 0, kind = 'rise', as: Tag = 'div' }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref as never} data-kind={kind} style={style} className={className}>
      {children}
    </Tag>
  )
}
