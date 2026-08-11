// Feature: smgc-website — Hero unit tests
// Validates: Requirements 1.1, 1.5

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => ({ children, ...props }) => {
      const Tag = typeof tag === 'string' ? tag : 'div'
      return <Tag {...props}>{children}</Tag>
    },
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
}))

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))
vi.mock('./GlobeVisual', () => ({ default: () => <div data-testid="globe-visual" /> }))
vi.mock('../components/GlobeVisual', () => ({ default: () => <div data-testid="globe-visual" /> }))

describe('Hero', () => {
  it('renders eyebrow text', () => {
    render(<Hero />)
    expect(screen.getByText(/global pharmaceutical sourcing/i)).toBeDefined()
  })

  it('renders the H1 heading', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/global sourcing/i)
    expect(h1.textContent).toMatch(/reliable pharmaceutical supply/i)
  })

  it('renders the company description', () => {
    render(<Hero />)
    expect(screen.getByText(/APIs, excipients/i)).toBeDefined()
  })

  it('renders the Contact Us CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /contact us/i })).toBeDefined()
  })

  it('renders the Explore Our Services link', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /explore our services/i })).toBeDefined()
  })
})
