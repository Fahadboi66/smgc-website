import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { EMAIL_ADDRESS } from '../constants/contact'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function FloatingEmail() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed bottom-[10.5rem] right-6 z-50" role="complementary">
      <div className="relative group">
        {/* Tooltip */}
        <span
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                     px-3 py-1.5 rounded text-xs font-medium text-white
                     bg-navy-800 border border-cyan-400/20 whitespace-nowrap
                     opacity-0 group-hover:opacity-100 pointer-events-none
                     transition-opacity duration-200 shadow-lg"
          role="tooltip"
          aria-hidden="true"
        >
          Email Us
        </span>

        <motion.a
          href={`mailto:${EMAIL_ADDRESS}`}
          aria-label="Email us"
          data-testid="floating-email"
          initial={reduced ? {} : { scale: 0, opacity: 0 }}
          animate={reduced ? {} : { scale: 1, opacity: 1 }}
          transition={reduced ? {} : { type: 'spring', stiffness: 260, damping: 20, delay: 1.9 }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={reduced ? {} : { scale: 0.94 }}
          className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-cyan-500 text-white
                     shadow-[0_4px_20px_rgba(56,189,248,0.4)]
                     email-pulse
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                     transition-shadow duration-300"
        >
          <Mail size={24} aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  )
}
