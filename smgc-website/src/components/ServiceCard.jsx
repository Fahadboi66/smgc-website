// Requirements: 5.1, 5.2
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function ServiceCard({ number, icon: Icon, heading, description, index = 0 }) {
  const reduced = useReducedMotion()
  const cardRef = useRef(null)

  // Precise cursor-following inner glow — updates a CSS custom property
  function onMouseMove(e) {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  function onMouseLeave() {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--mx', '-999px')
    cardRef.current.style.setProperty('--my', '-999px')
  }

  return (
    <motion.div
      ref={cardRef}
      data-testid="service-card"
      initial={reduced ? {} : { opacity: 0, y: 28 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="card-premium group relative flex flex-col gap-5 p-8 rounded-xl overflow-hidden cursor-default"
      style={{ '--mx': '-999px', '--my': '-999px' }}
    >
      {/* Top accent line */}
      <div className="card-top-line" aria-hidden="true" />

      {/* Precise cursor inner glow — very subtle */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(200px circle at var(--mx) var(--my), rgba(56,189,248,0.055), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Number + icon */}
      <div className="relative flex items-center justify-between">
        <span
          data-testid="service-number"
          className="card-number-label select-none"
          aria-hidden="true"
        >
          {number}
        </span>
        <div className="card-icon-wrap">
          <Icon size={22} className="text-cyan-400" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      {/* Heading */}
      <h3
        data-testid="service-heading"
        className="relative text-white font-semibold text-base leading-snug tracking-tight"
      >
        {heading}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-cyan-400/20 group-hover:bg-cyan-400/40 transition-colors duration-300" />

      {/* Description */}
      <p
        data-testid="service-description"
        className="relative text-[#7a8fa6] text-sm leading-relaxed flex-1"
      >
        {description}
      </p>

      {/* Arrow */}
      <div className="relative flex items-center justify-end pt-1">
        <div className="flex items-center gap-1.5 text-cyan-400/30 group-hover:text-cyan-400/70 transition-colors duration-300">
          <span className="text-[11px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transition-transform">
            Learn more
          </span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  )
}
