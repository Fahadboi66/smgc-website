// Requirements: 3.1, 3.2, 3.3, 3.4

const DEFAULT_ITEMS = [
  'APIs',
  'Excipients',
  'Pharmaceutical Intermediates',
  'Specialty Chemicals',
]

const SEPARATOR = '•'

export default function Marquee({ items = DEFAULT_ITEMS }) {
  // Duplicate for seamless loop — Property 4
  const track = [...items, ...items]

  return (
    <div
      className="marquee-wrapper bg-navy-900 border-y border-cyan-400/10 py-4 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track" data-testid="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-gray-400 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase px-4 sm:px-6 whitespace-nowrap">
              {item}
            </span>
            <span className="text-cyan-400/40 text-xs" aria-hidden="true">
              {SEPARATOR}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
