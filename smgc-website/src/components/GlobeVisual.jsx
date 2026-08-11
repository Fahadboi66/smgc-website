import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* ─────────────────────────────────────────────────────────────────────────
   GlobeVisual — viewBox 280×280, globe centred at (140,140) r=62
   This gives 78px of margin on all sides so orbiting capsules stay visible.
───────────────────────────────────────────────────────────────────────────*/
const CX = 140
const CY = 140

const LAT_LINES = [18, 32, 50, 68, 82]
const LON_LINES = [0, 30, 60, 90, 120, 150]

const NODES = [
  { cx: CX,      cy: CY - 72 },
  { cx: CX + 62, cy: CY - 36 },
  { cx: CX + 62, cy: CY + 36 },
  { cx: CX,      cy: CY + 72 },
  { cx: CX - 62, cy: CY + 36 },
  { cx: CX - 62, cy: CY - 36 },
]

/* Static capsules scattered around the globe (always visible) */
const STATIC_CAPSULES = [
  { x: CX - 100, y: CY - 60,  rot: -25 },
  { x: CX + 88,  y: CY - 72,  rot: 30  },
  { x: CX + 96,  y: CY + 55,  rot: -40 },
  { x: CX - 95,  y: CY + 65,  rot: 20  },
  { x: CX + 10,  y: CY - 108, rot: 5   },
  { x: CX - 15,  y: CY + 100, rot: -10 },
]

/* Orbiting capsules — orbit stays within viewBox (rx max ~90) */
const ORBIT_CAPSULES = [
  { rx: 90, ry: 24, tilt: -18, start: 0,   dur: 11 },
  { rx: 90, ry: 24, tilt: -18, start: 180, dur: 11 },
  { rx: 84, ry: 20, tilt: 58,  start: 90,  dur: 15 },
  { rx: 84, ry: 20, tilt: 58,  start: 270, dur: 15 },
]

/* ── Capsule shape (centred at 0,0) ── */
function Capsule({ w = 14, h = 6 }) {
  const r = h / 2
  return (
    <g>
      <path d={`M${-w/2},${-r} A${r},${r} 0 0 0 ${-w/2},${r} L0,${r} L0,${-r}Z`}
        fill="#c0392b" opacity="0.92" />
      <path d={`M0,${-r} L0,${r} L${w/2},${r} A${r},${r} 0 0 0 ${w/2},${-r}Z`}
        fill="#8e9eab" opacity="0.92" />
      <rect x={-w/2} y={-r} width={w} height={h} rx={r}
        fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" />
      <ellipse cx={-w/4} cy={-r*0.3} rx={w*0.16} ry={r*0.22}
        fill="rgba(255,255,255,0.2)" />
    </g>
  )
}

/* ── Maths helpers ── */
function ellipseXY(cx, cy, rx, ry, tiltDeg, angleDeg) {
  const t = (tiltDeg  * Math.PI) / 180
  const a = (angleDeg * Math.PI) / 180
  const lx = rx * Math.cos(a)
  const ly = ry * Math.sin(a)
  return {
    x: cx + lx * Math.cos(t) - ly * Math.sin(t),
    y: cy + lx * Math.sin(t) + ly * Math.cos(t),
  }
}

function ellipsePath(cx, cy, rx, ry, tiltDeg) {
  return Array.from({ length: 73 }, (_, i) => {
    const p = ellipseXY(cx, cy, rx, ry, tiltDeg, i * 5)
    return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`
  }).join(' ') + 'Z'
}

/* ── OrbitingCapsule — pure keyframe approach ── */
function OrbitingCapsule({ orb, reduced }) {
  const STEPS = 37
  const frames = Array.from({ length: STEPS }, (_, s) => {
    const deg  = orb.start + s * (360 / (STEPS - 1))
    const pos  = ellipseXY(CX, CY, orb.rx, orb.ry, orb.tilt, deg)
    const pos2 = ellipseXY(CX, CY, orb.rx, orb.ry, orb.tilt, deg + 4)
    const rot  = Math.atan2(pos2.y - pos.y, pos2.x - pos.x) * (180 / Math.PI)
    return { x: pos.x, y: pos.y, rot }
  })

  if (reduced) {
    const f = frames[0]
    return (
      <g transform={`translate(${f.x},${f.y}) rotate(${f.rot})`}>
        <Capsule />
      </g>
    )
  }

  return (
    <motion.g
      animate={{
        x:      frames.map(f => f.x),
        y:      frames.map(f => f.y),
        rotate: frames.map(f => f.rot),
      }}
      transition={{
        duration: orb.dur,
        repeat:   Infinity,
        ease:     'linear',
        times:    frames.map((_, i) => i / (STEPS - 1)),
      }}
      initial={{ x: frames[0].x, y: frames[0].y, rotate: frames[0].rot }}
    >
      <Capsule />
    </motion.g>
  )
}

export default function GlobeVisual() {
  const reduced = useReducedMotion()

  return (
    <div
      className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center"
      aria-hidden="true"
      role="img"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[10%] rounded-full bg-cyan-400/6 blur-3xl pointer-events-none" />

      <motion.svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={reduced ? {} : {
          y: [0, -12, 0],
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <defs>
          <radialGradient id="gGrad" cx="50%" cy="38%" r="55%">
            <stop offset="0%"   stopColor="#1e3a75" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#060e1e" stopOpacity="0.98" />
          </radialGradient>
          <radialGradient id="gGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"    />
          </radialGradient>
          <clipPath id="gClip">
            <circle cx={CX} cy={CY} r="62" />
          </clipPath>
        </defs>

        {/* ── Globe ── */}
        <circle cx={CX} cy={CY} r="62" fill="url(#gGrad)" />
        <circle cx={CX} cy={CY} r="62" fill="url(#gGlow)" />

        {/* Lat/lon grid */}
        <g clipPath="url(#gClip)" opacity="0.24">
          {LAT_LINES.map((pct, i) => {
            const y = (CY - 62) + (pct / 100) * 124
            const hw = Math.sqrt(Math.max(0, 62**2 - (y - CY)**2))
            return <ellipse key={i} cx={CX} cy={y} rx={hw} ry={hw*0.28}
                     stroke="#38bdf8" strokeWidth="0.5" />
          })}
          {LON_LINES.map((deg, i) => (
            <line key={i}
              x1={CX} y1={CY-62} x2={CX} y2={CY+62}
              stroke="#38bdf8" strokeWidth="0.5"
              transform={`rotate(${deg} ${CX} ${CY})`} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r="62" stroke="#38bdf8" strokeWidth="0.7" opacity="0.4" />

        {/* ── Orbital path guides ── */}
        <path d={ellipsePath(CX, CY, 90, 24, -18)}
          stroke="#38bdf8" strokeWidth="0.6" opacity="0.18" fill="none" />
        <path d={ellipsePath(CX, CY, 84, 20, 58)}
          stroke="#7dd3fc" strokeWidth="0.5" opacity="0.14" fill="none" />

        {/* ── Rotating hex molecular ring ── */}
        <motion.g
          animate={reduced ? {} : {
            rotate: [0, 360],
            transition: { duration: 45, repeat: Infinity, ease: 'linear' },
          }}
          style={{ originX: `${CX}px`, originY: `${CY}px` }}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const a  = (i / 12) * Math.PI * 2
            const r  = 98
            const hx = CX + r * Math.cos(a)
            const hy = CY + r * Math.sin(a)
            const hex = Array.from({ length: 6 }, (__, j) => {
              const ja = (j / 6) * Math.PI * 2
              return `${(hx + 4.5*Math.cos(ja)).toFixed(1)},${(hy + 4.5*Math.sin(ja)).toFixed(1)}`
            }).join(' ')
            const a2 = ((i+1) % 12 / 12) * Math.PI * 2
            return (
              <g key={i}>
                <polygon points={hex} stroke="#38bdf8" strokeWidth="0.45"
                  fill="none" opacity="0.42" />
                <line x1={hx} y1={hy}
                  x2={CX + r*Math.cos(a2)} y2={CY + r*Math.sin(a2)}
                  stroke="#38bdf8" strokeWidth="0.4" opacity="0.22" />
              </g>
            )
          })}
        </motion.g>

        {/* ── Pulsing nodes ── */}
        {NODES.map((n, i) => (
          <motion.circle key={i} cx={n.cx} cy={n.cy} r="2.8" fill="#38bdf8"
            style={{ originX: `${n.cx}px`, originY: `${n.cy}px` }}
            animate={reduced ? {} : {
              scale:   [1, 1.8, 1],
              opacity: [0.85, 0.15, 0.85],
              transition: { duration: 2.2, delay: i * 0.3, repeat: Infinity },
            }}
          />
        ))}

        {/* ── Static capsules (always visible, no animation) ── */}
        {STATIC_CAPSULES.map((c, i) => (
          <motion.g
            key={`sc-${i}`}
            animate={reduced ? {} : {
              y: [0, -6, 0],
              transition: { duration: 4.5 + i * 0.6, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <g transform={`translate(${c.x},${c.y}) rotate(${c.rot})`}>
              <Capsule w={13} h={5.5} />
            </g>
          </motion.g>
        ))}

        {/* ── Orbiting capsules ── */}
        {ORBIT_CAPSULES.map((orb, i) => (
          <OrbitingCapsule key={`orb-${i}`} orb={orb} reduced={reduced} />
        ))}

        {/* Centre glow */}
        <circle cx={CX} cy={CY} r="8"  fill="#38bdf8" opacity="0.07" />
        <circle cx={CX} cy={CY} r="3.5" fill="#38bdf8" opacity="0.2"  />
      </motion.svg>
    </div>
  )
}
