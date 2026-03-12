import type { Variants } from 'framer-motion'

/**
 * LN-style easing — snappy, high-energy, like landonorris.com
 * "easeInOutExpo" feel: slow start, explosive middle, crisp landing
 */
export const lnEase: [number, number, number, number] = [0.77, 0, 0.175, 1]

/** Section number / label: slides in from the left */
export const slideFromLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: lnEase } },
}

/**
 * Heading clip-reveal: text rises up from behind an invisible mask.
 * Wrap the heading in an `overflow-hidden` div for the clipping to work.
 */
export const clipReveal: Variants = {
  hidden:  { y: '105%' },
  visible: { y: '0%', transition: { duration: 0.62, ease: lnEase } },
}

/** General fast fade-up — body copy, subtitles */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: lnEase } },
}

/** Softer version for secondary elements + slight scale snap */
export const fadeUpSoft: Variants = {
  hidden:  { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: lnEase } },
}

/** Container that staggers children */
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

/** Tighter stagger for dense grids (cards etc.) */
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055 } },
}

/** Pure opacity fade */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}
