// Feature: smgc-website, Property 5: Service cards rendered with correct data
// Validates: Requirements 5.1

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import ServiceCard from '../components/ServiceCard'
import { Globe } from 'lucide-react'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => ({ children, ...props }) => {
      const validTags = ['div','p','h3','span','section','article']
      const Tag = validTags.includes(tag) ? tag : 'div'
      const { initial, animate, whileInView, whileHover, viewport, transition, variants, layoutId, ...rest } = props
      return <Tag {...rest}>{children}</Tag>
    },
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
}))

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

describe('ServiceCard — unit tests', () => {
  it('renders number, heading, description', () => {
    render(
      <ServiceCard
        number="01"
        icon={Globe}
        heading="Global Sourcing"
        description="We identify suppliers."
        index={0}
      />
    )
    expect(screen.getByTestId('service-number').textContent).toBe('01')
    expect(screen.getByTestId('service-heading').textContent).toBe('Global Sourcing')
    expect(screen.getByTestId('service-description').textContent).toBe('We identify suppliers.')
  })
})

describe('ServiceCard — Property 5: cards match data', () => {
  it('Property 5 — for any number/heading/description, card renders exactly those values', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[0-9]{2}$/),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 120 }),
        (number, heading, description) => {
          const { getByTestId } = render(
            <ServiceCard
              number={number}
              icon={Globe}
              heading={heading}
              description={description}
              index={0}
            />
          )
          return (
            getByTestId('service-number').textContent === number &&
            getByTestId('service-heading').textContent === heading &&
            getByTestId('service-description').textContent === description
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 5 — rendering N service cards produces N data-testid="service-card" elements', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            number: fc.stringMatching(/^[0-9]{2}$/),
            heading: fc.string({ minLength: 1, maxLength: 40 }),
            description: fc.string({ minLength: 1, maxLength: 100 }),
          }),
          { minLength: 1, maxLength: 6 }
        ),
        (items) => {
          const { getAllByTestId } = render(
            <div>
              {items.map((item, i) => (
                <ServiceCard key={i} {...item} icon={Globe} index={i} />
              ))}
            </div>
          )
          return getAllByTestId('service-card').length === items.length
        }
      ),
      { numRuns: 100 }
    )
  })
})
