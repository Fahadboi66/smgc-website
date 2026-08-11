/**
 * Shared scroll-reveal animation variants for Framer Motion.
 * Use these consistently across all sections for visual coherence.
 */

// Standard fade-up for headings and paragraphs
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

// Slightly softer for eyebrow labels
export const fadeIn = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

// Stagger container
export function stagger(delay = 0, staggerChildren = 0.1) {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren: delay } },
  }
}

// Per-item transition inside a stagger container
export const staggerItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// Viewport settings used everywhere
export const viewport = { once: true, margin: '-72px' }

// Standard transition for individual elements
export function transition(delay = 0) {
  return { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
}
