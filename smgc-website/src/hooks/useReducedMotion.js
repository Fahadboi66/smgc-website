import { useState, useEffect } from 'react'

/**
 * Returns true when the user has requested reduced motion via their OS/browser.
 * Components should use this to skip or simplify animations.
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
