import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { Mark, makeMarks } from './marks'

const COLS = 6
const ROWS = 7
const S = 46
const PAD = 24
/** The place left open — "sənin yerin". */
const SLOT = { col: 5, row: 4 }

/**
 * The structure from "Biz kimik?" returns, already assembled — with one
 * place still open, outlined in lime.
 */
export function OpenSlot({ label, className = '' }: { label: string; className?: string }) {
  const marks = useMemo(() => makeMarks(COLS, ROWS, 11), [])
  const W = PAD * 2 + (COLS - 1) * S
  const H = PAD * 2 + (ROWS - 1) * S
  const d = SLIDE_CONTENT_DELAY + 0.3
  const sx = PAD + SLOT.col * S
  const sy = PAD + SLOT.row * S

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`h-auto w-full overflow-visible ${className}`} aria-hidden="true">
      <g className="text-cream">
        {marks.map((m, i) => {
          if (m.col === SLOT.col && m.row === SLOT.row) return null
          return (
            <motion.g
              key={i}
              initial={{ x: PAD + m.col * S, y: PAD + m.row * S, opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6, delay: d + (m.row * COLS + m.col) * 0.015 }}
            >
              <Mark kind={m.kind} size={10} />
            </motion.g>
          )
        })}
      </g>

      <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: d + 1, ease: EASE_OUT_EXPO }}>
        <rect x={sx - 11} y={sy - 11} width={22} height={22} fill="none" className="anim-pulse-outline stroke-lime" strokeWidth={1.8} />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: d + 1.5 }}>
        <path d={`M ${sx + 16} ${sy} H ${W + 12}`} className="stroke-lime" strokeWidth={1} />
        <text x={W + 18} y={sy + 4} className="fill-lime font-mono" fontSize={13} letterSpacing="0.08em">
          {label}
        </text>
      </motion.g>
    </svg>
  )
}
