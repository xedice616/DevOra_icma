import type { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

/** Slide content starts once the incoming slide has mostly wiped in. */
export const SLIDE_CONTENT_DELAY = 0.55
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_EDITORIAL = [0.83, 0, 0.17, 1] as const

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Fades and lifts content into place when a slide mounts. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 1, delay: SLIDE_CONTENT_DELAY + delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface MaskLineProps {
  delay?: number
  children: ReactNode
  className?: string
}

/** A single line of type rising from behind a clipping mask. */
export function MaskLine({ delay = 0, children, className = '' }: MaskLineProps) {
  const reduce = useReducedMotion()
  return (
    <span className={`block overflow-hidden pt-[0.06em] pb-[0.1em] -mb-[0.1em] ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? { opacity: 0 } : { y: '110%', rotate: 2 }}
        animate={reduce ? { opacity: 1 } : { y: '0%', rotate: 0 }}
        style={{ transformOrigin: '0% 100%' }}
        transition={{ duration: reduce ? 0.3 : 1.15, delay: SLIDE_CONTENT_DELAY + delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Hairline that draws itself from the left. */
export function Rule({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left bg-current ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: SLIDE_CONTENT_DELAY + delay, ease: EASE_EDITORIAL }}
    />
  )
}
