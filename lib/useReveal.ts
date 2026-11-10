'use client'

import { useEffect, useRef } from 'react'

/**
 * Marks an element that starts below the fold as `data-<name>="pending"` and flips it to
 * "in" once it scrolls into view. Elements already on screen are left untouched, and the
 * CSS only animates when motion is allowed.
 */
export function useReveal<T extends HTMLElement>(name: 'reveal' | 'rule' = 'reveal') {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return

    element.dataset[name] = 'pending'
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        element.dataset[name] = 'in'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [name])

  return ref
}
