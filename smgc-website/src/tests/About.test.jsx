// Feature: smgc-website, Property 10: About cards render correct count and content
// Validates: Requirements 4.2

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import About from '../components/About'
import AboutCard from '../components/AboutCard'
import { Globe2 } from 'lucide-react'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => ({ children, ...props }) => {
      const validTags = ['div','p','h1','h2','h3','span','section','article','ul','li','a','button']
      const Tag = validTags.includes(tag) ? tag : 'div'
      // strip framer-specific props
      const { initial, animate, whileInView, whileHover, viewport, transition, variants, layoutId, ...rest } = props
      return <Tag {...rest}>{children}</Tag>
    },
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
}))

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

describe('About — unit tests', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
    expect(screen.getByText(/your partner in pharmaceutical supply/i)).toBeDefined()
  })

  it('renders exactly 3 about cards', () => {
    render(<About />)
    expect(screen.getAllByTestId('about-card').length).toBe(3)
  })

  it('cards show sequential numbers 01, 02, 03', () => {
    render(<About />)
    const numbers = screen.getAllByTestId('card-number').map((el) => el.textContent)
    expect(numbers).toEqual(['01', '02', '03'])
  })
})

describe('AboutCard — Property 10: correct count and sequential numbers', () => {
  // Property: for any set of 3 cards with sequential numbers, all three are rendered
  it('Property 10 — renders exactly 3 cards with numbers 01, 02, 03', () => {
    fc.assert(
      fc.property(
        fc.constant(['01', '02', '03']),
        (nums) => {
          const { getAllByTestId } = render(
            <div>
              {nums.map((n) => (
                <AboutCard
                  key={n}
                  number={n}
                  icon={Globe2}
                  heading={`Heading ${n}`}
                  description={`Description ${n}`}
                />
              ))}
            </div>
          )
          const cards = getAllByTestId('about-card')
          const renderedNums = getAllByTestId('card-number').map((el) => el.textContent)
          return (
            cards.length === 3 &&
            renderedNums[0] === '01' &&
            renderedNums[1] === '02' &&
            renderedNums[2] === '03'
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 10 — any card renders its heading and description', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 40 }),
        fc.string({ minLength: 1, maxLength: 100 }),
        (heading, description) => {
          const { getByText } = render(
            <AboutCard number="01" icon={Globe2} heading={heading} description={description} />
          )
          return (
            getByText(heading) !== null &&
            getByText(description) !== null
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})
