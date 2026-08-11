// Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ClipboardList, Search, FileCheck, Package, MapPin,
} from 'lucide-react'
import { timelineSteps } from '../data/timeline'
import { useReducedMotion } from '../hooks/useReducedMotion'

const ICON_MAP = { ClipboardList, Search, FileCheck, Package, MapPin }

export default function Timeline() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.3'],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const rawProgress  = scrollYProgress

  return (
    <div ref={sectionRef}>
      {/* Desktop horizontal (lg+) */}
      <div className="hidden lg:block">
        <DesktopTimeline lineProgress={lineProgress} rawProgress={rawProgress} reduced={reduced} />
      </div>
      {/* Mobile vertical (< lg) */}
      <div className="lg:hidden">
        <MobileTimeline lineProgress={lineProgress} reduced={reduced} />
      </div>
    </div>
  )
}

/* ─── Desktop layout ───────────────────────────────────────────────────────
   Structure per step:
     [number label]           ← small, above node, right-aligned to node centre
     [— node —]               ← sits on the horizontal track line
     [heading]                ← bold, below
     [description]            ← muted, below
   The track line runs through the vertical centre of all nodes.
──────────────────────────────────────────────────────────────────────────── */
function DesktopTimeline({ lineProgress, rawProgress, reduced }) {
  return (
    <div className="relative px-4">
      {/* Row: numbers above + nodes on the line */}
      <div className="relative flex items-center">

        {/* The track line — sits behind nodes */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-navy-700 z-0">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400/80 via-cyan-400 to-cyan-300/50 origin-left"
            style={{ width: reduced ? '100%' : lineProgress }}
          />
        </div>

        {/* Steps row */}
        <div className="relative z-10 flex justify-between w-full">
          {timelineSteps.map((step, i) => (
            <DesktopNode
              key={step.number}
              step={step}
              index={i}
              rawProgress={rawProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      {/* Content row: headings + descriptions below the line */}
      <div className="flex justify-between w-full mt-8">
        {timelineSteps.map((step, i) => (
          <DesktopContent key={step.number} step={step} index={i} reduced={reduced} />
        ))}
      </div>
    </div>
  )
}

function DesktopNode({ step, index, rawProgress, reduced }) {
  const Icon = ICON_MAP[step.icon]
  const threshold = index / (timelineSteps.length - 1)

  const nodeGlow = useTransform(rawProgress, (v) =>
    !reduced && v >= threshold
      ? '0 0 0 6px rgba(56,189,248,0.12), 0 0 20px rgba(56,189,248,0.25)'
      : '0 0 0 0px rgba(56,189,248,0)'
  )
  const borderColor = useTransform(rawProgress, (v) =>
    !reduced && v >= threshold ? 'rgba(56,189,248,0.7)' : 'rgba(56,189,248,0.2)'
  )
  const iconColor = useTransform(rawProgress, (v) =>
    !reduced && v >= threshold ? '#38bdf8' : 'rgba(56,189,248,0.35)'
  )

  return (
    <motion.div
      data-testid="timeline-step"
      data-number={step.number}
      className="flex flex-col items-center"
      initial={reduced ? {} : { opacity: 0, y: 12 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Step number — above the node */}
      <span className="text-[10px] font-semibold text-cyan-400/50 tracking-widest mb-2 tabular-nums">
        {step.number}
      </span>

      {/* Circular node */}
      <motion.div
        style={{ boxShadow: nodeGlow, borderColor }}
        className="w-14 h-14 rounded-full flex items-center justify-center
                   bg-[#0a1628] border-2 transition-all duration-500"
      >
        <motion.span style={{ color: iconColor }} className="flex items-center justify-center">
          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

function DesktopContent({ step, index, reduced }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center px-3 flex-1"
      initial={reduced ? {} : { opacity: 0, y: 16 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
    >
      <h3 className="text-white font-semibold text-[0.9rem] leading-snug mb-2">
        {step.heading}
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed max-w-[180px]">
        {step.description}
      </p>
    </motion.div>
  )
}

/* ─── Mobile vertical layout ────────────────────────────────────────────── */
function MobileTimeline({ lineProgress, reduced }) {
  return (
    <div className="relative pl-10">
      {/* Vertical track */}
      <div className="absolute left-[1.1rem] top-3 bottom-3 w-px bg-navy-700">
        <motion.div
          className="absolute inset-x-0 top-0 bg-gradient-to-b from-cyan-400 to-cyan-300/50"
          style={{ height: reduced ? '100%' : lineProgress }}
        />
      </div>

      <div className="flex flex-col gap-10">
        {timelineSteps.map((step, i) => (
          <MobileStep key={step.number} step={step} index={i} reduced={reduced} />
        ))}
      </div>
    </div>
  )
}

function MobileStep({ step, index, reduced }) {
  const Icon = ICON_MAP[step.icon]
  return (
    <motion.div
      data-testid="timeline-step"
      data-number={step.number}
      className="relative flex gap-4 items-start"
      initial={reduced ? {} : { opacity: 0, x: -14 }}
      whileInView={reduced ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Node on the vertical track */}
      <div className="absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center
                      bg-navy-800 border border-cyan-400/40 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
        <Icon size={14} className="text-cyan-400" strokeWidth={1.5} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <span className="text-cyan-400/50 text-[10px] font-semibold tracking-widest tabular-nums">
          {step.number}
        </span>
        <h3 className="text-white font-semibold text-sm leading-snug">
          {step.heading}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}
