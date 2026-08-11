// Requirements: 7.4, 7.5
import { motion } from 'framer-motion'
import { WHATSAPP_NUMBER } from '../constants/contact'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* Official WhatsApp logo SVG */
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="white"
      aria-hidden="true"
    >
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.648 4.831 1.78 6.867L2 30l7.347-1.747A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.25-4.36 1.037 1.063-4.252-.274-.437A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.618c-.344-.172-2.04-1.006-2.355-1.12-.316-.115-.546-.172-.776.172-.23.344-.89 1.12-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.454-.536-2.77-1.71-1.023-.913-1.714-2.04-1.914-2.385-.2-.344-.021-.53.15-.7.154-.154.344-.4.516-.6.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.56-.28-.672-.564-.58-.776-.59l-.66-.011c-.23 0-.602.086-.917.43s-1.205 1.178-1.205 2.871 1.234 3.33 1.406 3.559c.172.229 2.428 3.71 5.882 5.204.822.355 1.464.567 1.963.726.825.263 1.576.226 2.17.137.662-.099 2.04-.834 2.328-1.638.287-.805.287-1.494.2-1.638-.086-.143-.316-.23-.66-.4z" />
    </svg>
  )
}

export default function FloatingWhatsApp() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed bottom-6 right-6 z-50" role="complementary">
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
          Chat with us
        </span>

        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          data-testid="floating-whatsapp"
          initial={reduced ? {} : { scale: 0, opacity: 0 }}
          animate={reduced ? {} : { scale: 1, opacity: 1 }}
          transition={reduced ? {} : { type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={reduced ? {} : { scale: 0.94 }}
          className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-[#25d366] text-white
                     shadow-[0_4px_20px_rgba(37,211,102,0.45)]
                     whatsapp-pulse
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                     transition-shadow duration-300"
        >
          <WhatsAppIcon />
        </motion.a>
      </div>
    </div>
  )
}
