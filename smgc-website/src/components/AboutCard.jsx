// Requirements: 4.2, 4.3
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function AboutCard({ number, icon: Icon, heading, description, delay = 0 }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      data-testid="about-card"
      initial={reduced ? {} : { opacity: 0, y: 32 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-premium group relative flex flex-col gap-6 p-8 rounded-xl overflow-hidden cursor-default"
    >
      {/* Top accent line — grows on hover via CSS */}
      <div className="card-top-line" aria-hidden="true" />

      {/* Number + icon row */}
      <div className="flex items-center justify-between">
        <span
          data-testid="card-number"
          className="card-number-label select-none"
          aria-hidden="true"
        >
          {number}
        </span>
        <div className="card-icon-wrap">
          <Icon
            size={24}
            className="text-cyan-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-white font-semibold text-lg leading-snug tracking-tight">
        {heading}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-cyan-400/20 group-hover:bg-cyan-400/40 transition-colors duration-300" />

      {/* Description */}
      <p className="text-[#7a8fa6] text-sm leading-relaxed flex-1">
        {description}
      </p>
    </motion.div>
  )
}
