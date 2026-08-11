// Requirements: 8.1, 8.2, 8.3
import { Linkedin, Twitter, Facebook, Mail, MessageCircle, MapPin } from 'lucide-react'
import { EMAIL_ADDRESS, WHATSAPP_NUMBER } from '../constants/contact'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Contact',     href: '#contact' },
]

function scrollTo(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  return (
    <footer className="bg-[#060e1e] border-t border-blue-900" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <FooterLogo />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              S&amp;M Global Chemicals connects pharmaceutical and chemical businesses
              in Pakistan with reliable international sources and supply solutions.
            </p>

            {/* Social placeholders */}
            <div className="flex items-center gap-3 mt-1" aria-label="Social media links">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter,  label: 'Twitter'  },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`${label} (placeholder)`}
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 flex items-center justify-center rounded-sm
                             border border-navy-700 text-gray-600
                             hover:border-cyan-400/30 hover:text-cyan-400
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                             transition-all duration-200"
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <nav
            className="md:col-span-3 md:col-start-6"
            aria-label="Footer navigation"
          >
            <h3 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                    className="text-gray-500 text-sm hover:text-cyan-400
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded
                               transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              <li>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-2.5 text-gray-500 text-sm
                             hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded
                             transition-colors duration-200"
                  aria-label="Send email"
                >
                  <Mail size={13} className="shrink-0 text-cyan-400/50" aria-hidden="true" />
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-gray-500 text-sm
                             hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded
                             transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={13} className="shrink-0 text-cyan-400/50" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-500 text-sm">
                <MapPin size={13} className="shrink-0 text-cyan-400/50 mt-0.5" aria-hidden="true" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            &copy; 2026 S&amp;M Global Chemicals. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Pharmaceutical &amp; Specialty Chemical Sourcing
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
      className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded w-fit"
      aria-label="S&M Global Chemicals — back to top"
    >
      <div className="w-9 h-9 shrink-0">
        <img
          src="/logo.png"
          alt="S&M Global Chemicals logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />
        <div
          className="hidden w-full h-full items-center justify-center rounded-full border border-cyan-400/30 bg-navy-800"
          aria-hidden="true"
        >
          <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6">
            <circle cx="18" cy="18" r="15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
            <rect x="10" y="15" width="7" height="6" rx="3" fill="#c0392b" />
            <rect x="19" y="15" width="7" height="6" rx="3" fill="#8e9eab" />
          </svg>
        </div>
      </div>
      <div>
        <span className="text-white text-sm font-semibold leading-tight block">
          S&amp;M Global Chemicals
        </span>
        <span className="text-gray-600 text-[10px] tracking-widest uppercase">
          Sourcing &amp; Supply
        </span>
      </div>
    </a>
  )
}
