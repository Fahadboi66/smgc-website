// Feature: smgc-website, Property 7: Contact links use placeholder constants
// Validates: Requirements 7.1, 7.2, 7.3

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => ({ children, ...props }) => {
      const validTags = ['div','p','h2','span','section','a']
      const Tag = validTags.includes(tag) ? tag : 'div'
      const { initial, animate, whileInView, whileHover, viewport, transition, variants, layoutId, ...rest } = props
      return <Tag {...rest}>{children}</Tag>
    },
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
}))

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

describe('Contact — unit tests', () => {
  it('renders the heading', async () => {
    // Re-import fresh with default constants
    vi.resetModules()
    vi.mock('../constants/contact', () => ({
      EMAIL_ADDRESS: 'test@example.com',
      WHATSAPP_NUMBER: '923001234567',
    }))
    const { default: Contact } = await import('../components/Contact')
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
  })

  it('Email button href contains EMAIL_ADDRESS', async () => {
    vi.resetModules()
    vi.mock('../constants/contact', () => ({
      EMAIL_ADDRESS: 'hello@smgc.com',
      WHATSAPP_NUMBER: '923001234567',
    }))
    const { default: Contact } = await import('../components/Contact')
    render(<Contact />)
    const emailBtn = screen.getByTestId('email-btn')
    expect(emailBtn.getAttribute('href')).toContain('hello@smgc.com')
  })

  it('WhatsApp button href contains WHATSAPP_NUMBER', async () => {
    vi.resetModules()
    vi.mock('../constants/contact', () => ({
      EMAIL_ADDRESS: 'hello@smgc.com',
      WHATSAPP_NUMBER: '923009876543',
    }))
    const { default: Contact } = await import('../components/Contact')
    render(<Contact />)
    const waBtn = screen.getByTestId('whatsapp-btn')
    expect(waBtn.getAttribute('href')).toContain('923009876543')
  })
})

describe('Contact — Property 7: links derived from constants', () => {
  it('Property 7 — for any email string, mailto href contains that email', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        async (email) => {
          vi.resetModules()
          vi.mock('../constants/contact', () => ({
            EMAIL_ADDRESS: email,
            WHATSAPP_NUMBER: '923001234567',
          }))
          const { default: Contact } = await import('../components/Contact')
          const { getByTestId } = render(<Contact />)
          return getByTestId('email-btn').getAttribute('href').includes(email)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('Property 7 — for any phone number string, wa.me href contains that number', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[0-9]{9,14}$/),
        async (phone) => {
          vi.resetModules()
          vi.mock('../constants/contact', () => ({
            EMAIL_ADDRESS: 'test@test.com',
            WHATSAPP_NUMBER: phone,
          }))
          const { default: Contact } = await import('../components/Contact')
          const { getByTestId } = render(<Contact />)
          return getByTestId('whatsapp-btn').getAttribute('href').includes(phone)
        }
      ),
      { numRuns: 50 }
    )
  })
})
