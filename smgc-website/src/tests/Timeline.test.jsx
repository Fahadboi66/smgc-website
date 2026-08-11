// Feature: smgc-website, Property 6: Timeline step count matches data
// Validates: Requirements 6.1

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import Timeline from '../components/Timeline'
import { timelineSteps } from '../data/timeline'

vi.mock('framer-motion', () => {
  const motionProxy = new Proxy({}, {
    get: (_, tag) => ({ children, style, ...props }) => {
      const validTags = ['div', 'span', 'p', 'h3', 'section', 'article']
      const Tag = validTags.includes(tag) ? tag : 'div'
      const {
        initial, animate, whileInView, whileHover, viewport,
        transition, variants, layoutId, ...rest
      } = props
      return <Tag {...rest}>{children}</Tag>
    },
  })
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (val, fn) => {
      if (typeof fn === 'function') return { get: () => fn('0%') }
      return { get: () => '0%' }
    },
  }
})

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

describe('Timeline — unit tests', () => {
  it('renders exactly 5 step nodes matching timelineSteps data', () => {
    render(<Timeline />)
    // Both desktop and mobile render — count unique numbers
    const steps = screen.getAllByTestId('timeline-step')
    // Each step renders in desktop AND mobile (2 layouts), so at least 5 unique numbers
    const numbers = [...new Set(steps.map((s) => s.getAttribute('data-number')))]
    expect(numbers.length).toBe(timelineSteps.length)
    expect(numbers).toEqual(timelineSteps.map((s) => s.number))
  })

  it('renders all step headings', () => {
    render(<Timeline />)
    timelineSteps.forEach((step) => {
      const headings = screen.getAllByText(step.heading)
      expect(headings.length).toBeGreaterThanOrEqual(1)
    })
  })
})

describe('Timeline — Property 6: step count matches data array', () => {
  it('Property 6 — 5 unique step numbers rendered for the default timelineSteps data', () => {
    fc.assert(
      fc.property(fc.constant(timelineSteps), (steps) => {
        const { getAllByTestId } = render(<Timeline />)
        const rendered = getAllByTestId('timeline-step')
        const uniqueNumbers = [...new Set(rendered.map((s) => s.getAttribute('data-number')))]
        return uniqueNumbers.length === steps.length
      }),
      { numRuns: 10 } // same data each run, keep fast
    )
  })

  it('Property 6 — step numbers appear in correct order (01 before 02, etc.)', () => {
    render(<Timeline />)
    const steps = screen.getAllByTestId('timeline-step')
    const uniqueNumbers = [...new Map(steps.map((s) => [s.getAttribute('data-number'), s])).keys()]
    const expected = timelineSteps.map((s) => s.number)
    expect(uniqueNumbers).toEqual(expected)
  })
})
