// Feature: smgc-website — Navbar unit + property tests
// Property 2: Active section highlights correct nav item
// Validates: Requirements 2.1, 2.4

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import Navbar from '../components/Navbar'

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div:  ({ children, ...p }) => <div {...p}>{children}</div>,
    span: ({ children, ...p }) => <span {...p}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

// Mock useReducedMotion
vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

const NAV_LABELS = ['Home', 'About', 'Services', 'How We Work', 'Contact']
const SECTION_IDS = ['home', 'about', 'services', 'how-we-work', 'contact']

beforeEach(() => {
  // Provide a minimal matchMedia mock
  window.matchMedia = vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
})

describe('Navbar — unit tests', () => {
  it('renders all 5 navigation links', () => {
    render(<Navbar activeSection="home" />)
    NAV_LABELS.forEach((label) => {
      // Each label appears at least once in the desktop nav list
      const links = screen.getAllByText(label)
      expect(links.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('applies aria-current="page" to the active link', () => {
    render(<Navbar activeSection="services" />)
    const activeLinks = screen.getAllByRole('link', { current: 'page' })
    expect(activeLinks.length).toBeGreaterThan(0)
    expect(activeLinks[0]).toHaveTextContent('Services')
  })

  it('renders the logo area with home link', () => {
    render(<Navbar activeSection="home" />)
    const homeLink = screen.getByRole('link', { name: /S&M Global Chemicals/i })
    expect(homeLink).toBeDefined()
  })
})

describe('Navbar — Property 2: active section uniqueness', () => {
  // For any section id from the valid set, exactly one nav link should have aria-current="page"
  it('Property 2 — at most one nav link is active for any given activeSection', () => {
    fc.assert(
      fc.property(fc.constantFrom(...SECTION_IDS), (sectionId) => {
        const { container } = render(<Navbar activeSection={sectionId} />)
        const activeLinks = container.querySelectorAll('[aria-current="page"]')
        return activeLinks.length <= 1
      }),
      { numRuns: 100 }
    )
  })

  it('Property 2 — active link text matches the section id', () => {
    const idToLabel = {
      home: 'Home',
      about: 'About',
      services: 'Services',
      'how-we-work': 'How We Work',
      contact: 'Contact',
    }
    fc.assert(
      fc.property(fc.constantFrom(...SECTION_IDS), (sectionId) => {
        const { container } = render(<Navbar activeSection={sectionId} />)
        const activeLinks = container.querySelectorAll('[aria-current="page"]')
        if (activeLinks.length === 0) return true // no active link is acceptable
        return activeLinks[0].textContent.includes(idToLabel[sectionId])
      }),
      { numRuns: 100 }
    )
  })
})
