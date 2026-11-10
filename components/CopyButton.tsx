'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

const COPY_FEEDBACK_MS = 2200

type CopyState = 'idle' | 'copied' | 'failed'

interface CopyButtonProps {
  value: string
  labels: { copy: string; copied: string; failed: string }
}

export default function CopyButton({ value, labels }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const id = window.setTimeout(() => setState('idle'), COPY_FEEDBACK_MS)
    return () => window.clearTimeout(id)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  const label = { idle: labels.copy, copied: labels.copied, failed: labels.failed }[state]

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-sm font-medium transition-colors hover:bg-well"
    >
      {state === 'copied' ? <Check size={15} className="text-accent" aria-hidden /> : <Copy size={15} aria-hidden />}
      <span aria-live="polite">{label}</span>
    </button>
  )
}
