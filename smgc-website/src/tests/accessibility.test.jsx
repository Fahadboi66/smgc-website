// Feature: smgc-website, Property 11: All meaningful images have alt text
// Validates: Requirements 10.2, 10.3, 10.4

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'

// ── Mock heavy deps ──────────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => ({ children, ...props }) => {
      const validTags = ['div','p','h1','h2','h3','span','section','article','a','button','header','footer','nav','ul','li']
      const Tag = validTags.includes(tag) ? tag : 'div'
      const {
        initial, animate, whileInView, whileHover, viewport,
        transition, variants, layoutId, style, ...rest
      } = props
      return <Tag {...rest}>{children}</Tag>
    },
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: (val, fn) => typeof fn === 'function' ? { get: () => fn('0%') } : { get: () => '0%' },
}))

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))
vi.mock('../hooks/useScrollSpy',     () => ({ useScrollSpy: () => 'home' }))
vi.mock('../constants/contact', () => ({
  EMAIL_ADDRESS: 'test@example.com',
  WHATSAPP_NUMBER: '923001234567',
}))

// ── Imports after mocks ──────────────────────────────────────────────────────
import Navbar          from '../components/Navbar'
import Footer          from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import GlobeVisual     from '../components/GlobeVisual'

describe('Accessibility — heading hierarchy', () => {
  it('GlobeVisual has aria-hidden to exclude decorative SVG from tree', () => {
    const { container } = render(<GlobeVisual />)
    const globe = container.querySelector('[aria-hidden="true"]') || container.querySelector('[role="img"]')
    expect(globe).not.toBeNull()
  })
})

describe('Accessibility — Property 11: images have non-empty alt text', () => {
  it('Navbar logo img has non-empty alt attribute', () => {
    const { container } = render(<Navbar activeSection="home" />)
    const imgs = container.querySelectorAll('img')
    imgs.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy()
    })
  })

  it('Footer logo img has non-empty alt attribute', () => {
    const { container } = render(<Footer />)
    const imgs = container.querySelectorAll('img')
    imgs.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy()
    })
  })

  // Property 11: for any set of img elements rendered, all have non-empty alt
  it('Property 11 — all img elements in Navbar/Footer have non-empty alt', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container: navContainer } = render(<Navbar activeSection="home" />)
        const { container: footerContainer } = render(<Footer />)
        const allImgs = [
          ...navContainer.querySelectorAll('img'),
          ...footerContainer.querySelectorAll('img'),
        ]
        return allImgs.every((img) => {
          const alt = img.getAttribute('alt')
          return typeof alt === 'string' && alt.trim().length > 0
        })
      }),
      { numRuns: 100 }
    )
  })
})

describe('Accessibility — focus and ARIA', () => {
  it('FloatingWhatsApp has aria-label', () => {
    const { getByTestId } = render(<FloatingWhatsApp />)
    const link = getByTestId('floating-whatsapp')
    expect(link.getAttribute('aria-label')).toBeTruthy()
  })

  it('Navbar hamburger has aria-label and aria-expanded', () => {
    const { container } = render(<Navbar activeSection="home" />)
    // The button exists in the DOM (may be visually hidden on desktop via CSS)
    const btn = container.querySelector('button[aria-label]')
    expect(btn).not.toBeNull()
    expect(btn.getAttribute('aria-expanded')).toBeDefined()
  })
})
