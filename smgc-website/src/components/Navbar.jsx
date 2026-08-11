import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Contact',     href: '#contact' },
]

function scrollToSection(href, onDone) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (onDone) onDone()
}

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const mobileMenuVariants = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
        exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
      }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-md  shadow-[0_2px_24px_rgba(6,14,30,0.7)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('#home') }}
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          aria-label="S&M Global Chemicals — home"
        >
          <LogoMark />
          <span className="text-white font-semibold text-sm tracking-wide hidden sm:block leading-tight">
            S&amp;M Global<br />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">Chemicals</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(href) }}
                  className={[
                    'relative px-4 py-2 text-sm font-medium rounded transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                    isActive
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-cyan-400 rounded-full"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-navy-950/95 backdrop-blur-md border-b border-cyan-400/10"
          >
            <ul className="px-5 py-4 flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(href, () => setMobileOpen(false))
                      }}
                      className={[
                        'block py-3 px-4 text-sm font-medium rounded transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                        isActive
                          ? 'text-cyan-400 bg-cyan-400/8'
                          : 'text-gray-300 hover:text-white hover:bg-white/5',
                      ].join(' ')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* Inline logo mark — hexagonal ring with capsule */
function LogoMark() {
  return (
    <div className="w-20 h-20 shrink-0 mt-3">
      <img
        src="/favicon.png"
        alt="S&M Global Chemicals logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to SVG icon if logo not found
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextElementSibling.style.display = 'flex'
        }}
      />
      {/* Fallback SVG capsule-hex mark */}
      <div
        className="hidden w-full h-full items-center justify-center rounded-full border border-cyan-400/40 bg-navy-800"
        aria-hidden="true"
      >
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <circle cx="18" cy="18" r="15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
          <rect x="10" y="15" width="7" height="6" rx="3" fill="#c0392b" />
          <rect x="19" y="15" width="7" height="6" rx="3" fill="#8e9eab" />
        </svg>
      </div>
    </div>
  )
}
