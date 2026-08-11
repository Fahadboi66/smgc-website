// Requirements: 5.1, 5.3, 5.4, 5.5
import { motion } from 'framer-motion'
import { Globe, ShoppingCart, FileText, Truck, ShieldCheck, Settings } from 'lucide-react'
import ServiceCard from './ServiceCard'
import { services } from '../data/services'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeIn, fadeUp, viewport, transition } from '../hooks/useReveal'

const ICON_MAP = { Globe, ShoppingCart, FileText, Truck, ShieldCheck, Settings }

export default function Services() {
  const reduced = useReducedMotion()
  const v = (variants) => reduced ? {} : variants
  const t = (d = 0) => reduced ? {} : transition(d)

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-navy-900" aria-labelledby="services-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56,189,248,0.035), transparent)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.p
            className="text-cyan-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            variants={v(fadeIn)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0)}
          >
            Our Services
          </motion.p>
          <motion.h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.08)}
          >
            Comprehensive Sourcing &amp; Supply Solutions
          </motion.h2>
          <motion.p
            className="text-gray-400 text-base sm:text-lg leading-relaxed"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.16)}
          >
            From identifying international sources to coordinating procurement,
            documentation, logistics, and delivery, S&amp;M Global Chemicals provides
            end-to-end sourcing and supply solutions for pharmaceutical manufacturers
            and businesses in Pakistan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.number} {...svc} icon={ICON_MAP[svc.icon]} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
