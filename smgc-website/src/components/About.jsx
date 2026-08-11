// Requirements: 4.1, 4.2, 4.4, 4.5
import { motion } from 'framer-motion'
import { Globe2, FlaskConical, Handshake } from 'lucide-react'
import AboutCard from './AboutCard'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeIn, fadeUp, stagger, staggerItem, viewport, transition } from '../hooks/useReveal'

const FEATURES = [
  {
    number: '01',
    icon: Globe2,
    heading: 'International Reach',
    description: 'We work with international sources to meet pharmaceutical and specialty material requirements.',
  },
  {
    number: '02',
    icon: FlaskConical,
    heading: 'Customer-Focused Supply',
    description: 'We source according to product specifications, quantities, and commercial requirements.',
  },
  {
    number: '03',
    icon: Handshake,
    heading: 'Long-Term Partnerships',
    description: 'We focus on dependable service and building lasting B2B relationships.',
  },
]

export default function About() {
  const reduced = useReducedMotion()
  const v = (variants) => reduced ? {} : variants
  const t = (d = 0) => reduced ? {} : transition(d)

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-navy-900" aria-labelledby="about-heading">
      <DotGrid />
      <div className="absolute inset-0 hex-pattern opacity-[0.018] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header — each element animates independently */}
        <div className="mb-16 max-w-2xl">
          <motion.p
            className="text-cyan-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            variants={v(fadeIn)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0)}
          >
            About Us
          </motion.p>
          <motion.h2
            id="about-heading"
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.08)}
          >
            Your Partner in Pharmaceutical Supply
          </motion.h2>
          <motion.p
            className="text-gray-400 text-base sm:text-lg leading-relaxed"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.16)}
          >
            S&amp;M Global Chemicals connects pharmaceutical and chemical businesses in
            Pakistan with reliable international sources and supply solutions.
          </motion.p>
        </div>

        {/* Cards — staggered reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={v(stagger(0.1, 0.12))} initial="hidden" whileInView="visible"
          viewport={viewport}
        >
          {FEATURES.map((feat, i) => (
            <AboutCard key={feat.number} {...feat} delay={reduced ? 0 : i * 0.12} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.4" fill="#38bdf8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, #0a1628 100%)',
      }} />
    </div>
  )
}
