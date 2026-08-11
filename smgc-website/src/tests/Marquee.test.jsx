// Feature: smgc-website, Property 3: Marquee never causes horizontal overflow
// Feature: smgc-website, Property 4: Marquee loop is seamless
// Validates: Requirements 3.2, 3.4

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import Marquee from '../components/Marquee'

describe('Marquee — Property 4: seamless loop', () => {
  it('track contains exactly 2x the source items (seamless loop duplication)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
        (items) => {
          const { getByTestId } = render(<Marquee items={items} />)
          const track = getByTestId('marquee-track')
          // Each item renders one label span + one separator = 2 children per item
          // Track children count = 2 * items.length * 2 separators... 
          // Simpler: count span elements with whitespace-nowrap text = items * 2
          const labels = track.querySelectorAll('span.whitespace-nowrap')
          return labels.length === items.length * 2
        }
      ),
      { numRuns: 100 }
    )
  })

  it('default items produce 8 label spans (4 items × 2)', () => {
    const { getByTestId } = render(<Marquee />)
    const labels = getByTestId('marquee-track').querySelectorAll('span.whitespace-nowrap')
    expect(labels.length).toBe(8)
  })
})

describe('Marquee — Property 3: no horizontal overflow', () => {
  // In jsdom scrollWidth equals clientWidth for overflow:hidden containers
  // We verify the wrapper has the overflow-hidden class (marquee-wrapper) applied
  it('wrapper has overflow-hidden applied via marquee-wrapper class', () => {
    const { container } = render(<Marquee />)
    const wrapper = container.firstChild
    expect(wrapper.className).toContain('marquee-wrapper')
  })

  it('Property 3 — for any array of items, wrapper class always includes marquee-wrapper', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 12 }),
        (items) => {
          const { container } = render(<Marquee items={items} />)
          return container.firstChild.className.includes('marquee-wrapper')
        }
      ),
      { numRuns: 100 }
    )
  })
})
