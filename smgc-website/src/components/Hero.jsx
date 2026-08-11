import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import GlobeVisual from './GlobeVisual'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { stagger, staggerItem } from '../hooks/useReveal'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background layer ──────────────────────────────────────────── */}
      <HeroBackground />

      {/* ── Content grid ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — text content */}
          <motion.div
            variants={reduced ? {} : stagger(0.1, 0.12)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow */}
            <motion.p
              variants={reduced ? {} : staggerItem}
              className="text-cyan-400 text-xs font-semibold tracking-[0.22em] uppercase"
            >
              Global Pharmaceutical Sourcing
            </motion.p>

            {/* H1 — two-tone */}
            <motion.h1
              id="hero-heading"
              variants={reduced ? {} : staggerItem}
              className="text-4xl sm:text-5xl xl:text-[3.75rem] font-bold leading-[1.08] tracking-tight text-white"
            >
              Global Sourcing.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Reliable Pharmaceutical Supply.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={reduced ? {} : staggerItem}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-[540px]"
            >
              S&amp;M Global Chemicals sources and supplies APIs, excipients,
              pharmaceutical intermediates, and specialty chemicals from international
              suppliers to pharmaceutical manufacturers and businesses across Pakistan.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reduced ? {} : staggerItem}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-cyan-400 text-navy-950 font-semibold text-sm rounded-lg
                           hover:bg-cyan-300 active:scale-[0.98]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                           transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.28)]"
              >
                Contact Us
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300
                           hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded
                           transition-colors duration-200"
              >
                Explore Our Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={reduced ? {} : staggerItem}
              className="flex flex-wrap gap-8 pt-4 border-t border-white/8 mt-2"
            >
              {[
                { value: 'International', label: 'Supplier Network' },
                { value: 'End-to-End',    label: 'Supply Solutions' },
                { value: 'Worldwide',     label: 'Supply Reach' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-white font-semibold text-sm">{value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — globe visual */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.92 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <GlobeVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={reduced ? {} : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-600"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} className={reduced ? '' : 'animate-bounce'} />
      </motion.div>
    </section>
  )
}

/* ── Hero background ─────────────────────────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* ── Background image layer ──────────────────────────────────────
           Place your image at:  smgc-website/public/hero-bg.jpg
           It will be visible but heavily darkened so text stays readable.
           Opacity 0.18 = subtle presence without washing out the design.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.32,
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Dark base — sits on top of image to control brightness */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-navy-900/72 to-[#071220]/80" />

      {/* Hex molecular pattern */}
      <div className="absolute inset-0 hex-pattern opacity-[0.035]" />

      {/* Radial accent — right side */}
      <div className="absolute top-0 right-0 w-[60%] h-full
                      bg-[radial-gradient(ellipse_at_80%_30%,rgba(56,189,248,0.07),transparent_65%)]" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-40
                      bg-gradient-to-t from-navy-950 to-transparent" />

      {/* Subtle grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400 opacity-[0.12]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

const PARTICLES = [
  { size: '3px', left: '12%',  top: '20%', dur: 7, delay: 0 },
  { size: '2px', left: '28%',  top: '65%', dur: 9, delay: 1 },
  { size: '4px', left: '72%',  top: '15%', dur: 6, delay: 2 },
  { size: '2px', left: '85%',  top: '55%', dur: 8, delay: 0.5 },
  { size: '3px', left: '55%',  top: '80%', dur: 7, delay: 1.5 },
  { size: '2px', left: '42%',  top: '35%', dur: 10, delay: 3 },
  { size: '4px', left: '8%',   top: '75%', dur: 8, delay: 2.5 },
  { size: '2px', left: '90%',  top: '30%', dur: 6, delay: 0.8 },
]
