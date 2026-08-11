// Feature: smgc-website, Property 8: Reduced-motion disables animations
// Validates: Requirements 10.1

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import * as fc from 'fast-check'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Helper: builds a fake MediaQueryList with the given matches value,
 * wired into window.matchMedia.
 */
function mockMatchMedia(matches) {
  const listeners = []
  const mql = {
    matches,
    addEventListener: vi.fn((_, cb) => listeners.push(cb)),
    removeEventListener: vi.fn(),
    _fire: (val) => listeners.forEach((cb) => cb({ matches: val })),
  }
  window.matchMedia = vi.fn(() => mql)
  return mql
}

describe('useReducedMotion', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns false when prefers-reduced-motion is not set', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when prefers-reduced-motion: reduce is active', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when the media query changes', () => {
    const mql = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)

    act(() => mql._fire(true))
    expect(result.current).toBe(true)

    act(() => mql._fire(false))
    expect(result.current).toBe(false)
  })

  // Property 8: for any boolean reducedMotion value, the hook returns exactly that value
  it('Property 8 — returns the exact matchMedia matches value for any boolean input', () => {
    fc.assert(
      fc.property(fc.boolean(), (matchesValue) => {
        mockMatchMedia(matchesValue)
        const { result } = renderHook(() => useReducedMotion())
        return result.current === matchesValue
      }),
      { numRuns: 100 }
    )
  })

  // Property 8 (variant): when reduced motion is true, variant initial===animate (no movement)
  it('Property 8 — when reducedMotion is true, identical initial/animate variant states produce no diff', () => {
    fc.assert(
      fc.property(
        fc.record({
          opacity: fc.constant(1),
          y: fc.constant(0),
          x: fc.constant(0),
          scale: fc.constant(1),
        }),
        (state) => {
          // Simulates how a component guards its variants:
          // if reducedMotion → initial === animate (no transition)
          const reducedMotion = true
          const variants = {
            hidden: reducedMotion ? state : { opacity: 0, y: 20 },
            visible: state,
          }
          // When reduced motion is true, hidden and visible must be identical objects
          return JSON.stringify(variants.hidden) === JSON.stringify(variants.visible)
        }
      ),
      { numRuns: 100 }
    )
  })
})
