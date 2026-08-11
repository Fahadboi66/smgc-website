// Requirements: 7.1, 7.2, 7.3
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { EMAIL_ADDRESS, WHATSAPP_NUMBER } from '../constants/contact'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeIn, fadeUp, stagger, viewport } from '../hooks/useReveal'

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.648 4.831 1.78 6.867L2 30l7.347-1.747A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.25-4.36 1.037 1.063-4.252-.274-.437A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.618c-.344-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.344-.89 1.12-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.454-.536-2.77-1.71-1.023-.913-1.714-2.04-1.914-2.385-.2-.344-.021-.53.15-.7.154-.154.344-.4.516-.6.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.56-.28-.672-.564-.58-.776-.59l-.66-.011c-.23 0-.602.086-.917.43s-1.205 1.178-1.205 2.871 1.234 3.33 1.406 3.559c.172.229 2.428 3.71 5.882 5.204.822.355 1.464.567 1.963.726.825.263 1.576.226 2.17.137.662-.099 2.04-.834 2.328-1.638.287-.805.287-1.494.2-1.638-.086-.143-.316-.23-.66-.4z"/>
    </svg>
  )
}

export default function Contact() {
  const reduced = useReducedMotion()
  const v = (variants) => reduced ? {} : variants

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-navy-900 overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(56,189,248,0.045), transparent)',
      }} />
      <div className="absolute inset-0 hex-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={v(stagger(0, 0.11))} initial="hidden" whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            className="text-cyan-400 text-xs font-semibold tracking-[0.22em] uppercase"
            variants={v(fadeIn)}
          >
            Get in Touch
          </motion.p>

          <motion.h2
            id="contact-heading"
            className="text-4xl sm:text-6xl font-bold text-white leading-tight tracking-tight"
            variants={v(fadeUp)}
          >
            Have a Requirement?{' '}
            <span className="text-gradient-cyan">Let&apos;s Talk.</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl"
            variants={v(fadeUp)}
          >
            Whether you are looking for a specific material or exploring a new sourcing
            opportunity, our team is ready to discuss your requirements.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            variants={v(fadeUp)}
          >
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              data-testid="email-btn"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-cyan-400 text-navy-950 font-semibold text-sm rounded-lg
                         hover:bg-cyan-300 active:scale-[0.98]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                         transition-all duration-200 shadow-[0_0_24px_rgba(56,189,248,0.22)] min-w-[160px]"
            >
              <Mail size={16} aria-hidden="true" />
              Email Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              data-testid="whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4
                         bg-transparent text-white font-semibold text-sm rounded-lg
                         border border-[rgba(56,189,248,0.22)] hover:border-[rgba(56,189,248,0.5)]
                         hover:bg-[rgba(56,189,248,0.05)] active:scale-[0.98]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                         transition-all duration-200 min-w-[160px]"
            >
              <WhatsAppIcon />
              WhatsApp Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            variants={v(fadeIn)}
          />
        </motion.div>
      </div>
    </section>
  )
}
