import { useState, useEffect } from 'react'

/**
 * Tracks which section is currently most visible in the viewport.
 * @param {string[]} sectionIds - ordered array of section element ids
 * @param {number} offset - rootMargin top offset in px (default 80 for navbar height)
 * @returns {string} - the id of the currently active section
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, offset])

  return activeId
}
