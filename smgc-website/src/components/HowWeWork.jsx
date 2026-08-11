// Requirements: 6.1, 6.2, 6.3, 6.4
import { motion } from 'framer-motion'
import Timeline from './Timeline'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeIn, fadeUp, viewport, transition } from '../hooks/useReveal'

export default function HowWeWork() {
  const reduced = useReducedMotion()
  const v = (variants) => reduced ? {} : variants
  const t = (d = 0) => reduced ? {} : transition(d)

  return (
    <section id="how-we-work" className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden" aria-labelledby="how-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(56,189,248,0.035), transparent)',
      }} />
      <div className="absolute inset-0 hex-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-20 max-w-2xl">
          <motion.p
            className="text-cyan-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            variants={v(fadeIn)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0)}
          >
            How We Work
          </motion.p>
          <motion.h2
            id="how-heading"
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.08)}
          >
            From Requirement to Reliable Supply
          </motion.h2>
          <motion.p
            className="text-gray-400 text-base sm:text-lg leading-relaxed"
            variants={v(fadeUp)} initial="hidden" whileInView="visible"
            viewport={viewport} transition={t(0.16)}
          >
            We make the sourcing and supply process straightforward, from understanding
            your requirement to coordinating delivery.
          </motion.p>
        </div>

        <Timeline />
      </div>
    </section>
  )
}
