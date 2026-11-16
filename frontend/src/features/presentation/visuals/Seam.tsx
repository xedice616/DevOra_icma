import { motion } from 'framer-motion'
import { EASE_EDITORIAL, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'

interface SeamProps {
  orientation: 'vertical' | 'horizontal'
  /** Number of teeth along the seam. */
  teeth?: number
  className?: string
}

/**
 * Where the two communities meet: teeth from each side slide across and
 * interlock, then a lime stitch runs down the join.
 * Vertical: forest on the left, ink on the right. Horizontal: forest on top.
 */
export function Seam({ orientation, teeth = 14, className = '' }: SeamProps) {
  const d = SLIDE_CONTENT_DELAY + 0.5
  const vertical = orientation === 'vertical'
  return (
    <div
      className={`pointer-events-none flex ${vertical ? 'h-full w-16 flex-col' : 'h-12 w-full flex-row'} ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: teeth }, (_, i) => {
        const fromForest = i % 2 === 0
        const off = fromForest ? '-100%' : '100%'
        return (
          <div key={i} className="relative flex-1 overflow-hidden">
            <motion.span
              className={`absolute ${fromForest ? 'bg-forest' : 'bg-ink'} ${
                vertical ? (fromForest ? 'inset-y-0 left-0 w-[75%]' : 'inset-y-0 right-0 w-[75%]') : fromForest ? 'inset-x-0 top-0 h-[75%]' : 'inset-x-0 bottom-0 h-[75%]'
              }`}
              initial={vertical ? { x: off } : { y: off }}
              animate={vertical ? { x: '0%' } : { y: '0%' }}
              transition={{ duration: 1, delay: d + i * 0.045, ease: EASE_EDITORIAL }}
            />
          </div>
        )
      })}
      {/* stitch */}
      <motion.span
        className={`absolute bg-lime ${vertical ? 'top-0 bottom-0 left-1/2 w-px origin-top' : 'top-1/2 right-0 left-0 h-px origin-left'}`}
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        animate={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        transition={{ duration: 1.4, delay: d + 0.9, ease: EASE_EDITORIAL }}
      />
    </div>
  )
}
