import { motion } from 'framer-motion'
import { WECHAT_ID } from '../constants/contact'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* Official WeChat logo SVG */
function WeChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="white"
      aria-hidden="true"
    >
      <path d="M11.5 6C6.262 6 2 9.748 2 14.4c0 2.656 1.374 5.02 3.528 6.594L4.5 24l3.22-1.61A10.27 10.27 0 0 0 11.5 22.8c.344 0 .684-.018 1.02-.05-.214-.68-.332-1.394-.332-2.13C12.188 16.34 16.26 13 21.25 13c.344 0 .684.02 1.02.052C21.37 9.106 16.918 6 11.5 6zm-2.25 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM21.25 14C16.7 14 13 17.04 13 20.62c0 3.578 3.7 6.38 8.25 6.38.93 0 1.822-.13 2.658-.365L27 28l-.872-2.8C27.834 23.93 29.5 22.37 29.5 20.62 29.5 17.04 25.8 14 21.25 14zm-2.5 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  )
}

export default function FloatingWeChat() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed bottom-24 right-6 z-50" role="complementary">
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
          Chat on WeChat
        </span>

        <motion.a
          href={`weixin://dl/chat?${WECHAT_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WeChat"
          data-testid="floating-wechat"
          initial={reduced ? {} : { scale: 0, opacity: 0 }}
          animate={reduced ? {} : { scale: 1, opacity: 1 }}
          transition={reduced ? {} : { type: 'spring', stiffness: 260, damping: 20, delay: 1.7 }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={reduced ? {} : { scale: 0.94 }}
          className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-[#09bb07] text-white
                     shadow-[0_4px_20px_rgba(9,187,7,0.45)]
                     wechat-pulse
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09bb07] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950
                     transition-shadow duration-300"
        >
          <WeChatIcon />
        </motion.a>
      </div>
    </div>
  )
}
