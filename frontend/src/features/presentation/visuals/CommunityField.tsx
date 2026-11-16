import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { EASE_EDITORIAL, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { usePointerParallax } from '../../../lib/usePointerParallax'
import { Mark, makeMarks } from './marks'

const COLS = 9
const ROWS = 7
const S = 52
const PAD = 30

/**
 * Different marks (skills) arrive scattered and settle into one aligned
 * structure — then a single lime frame closes around them: a shared goal.
 */
export function CommunityField({ className = '' }: { className?: string }) {
  const { x, y } = usePointerParallax(14)
  const marks = useMemo(() => makeMarks(COLS, ROWS, 11, 170), [])
  const W = PAD * 2 + (COLS - 1) * S
  const H = PAD * 2 + (ROWS - 1) * S
  const d = SLIDE_CONTENT_DELAY + 0.2
  const settle = 1.7

  return (
    <motion.div style={{ x, y }} className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" aria-hidden="true">
        <g className="text-cream">
          {marks.map((m, i) => {
            const cx = PAD + m.col * S
            const cy = PAD + m.row * S
            // marks nearer the centre settle first
            const dist = Math.hypot(m.col - (COLS - 1) / 2, m.row - (ROWS - 1) / 2)
            return (
              <motion.g
                key={i}
                initial={{ x: cx + m.dx, y: cy + m.dy, rotate: m.rot, opacity: 0 }}
                animate={{ x: cx, y: cy, rotate: 0, opacity: 0.85 }}
                transition={{ duration: settle, delay: d + dist * 0.07, ease: EASE_EDITORIAL }}
              >
                <Mark kind={m.kind} size={11} />
              </motion.g>
            )
          })}
        </g>

        {/* shared frame */}
        <motion.rect
          x={PAD - 22}
          y={PAD - 22}
          width={W - (PAD - 22) * 2}
          height={H - (PAD - 22) * 2}
          fill="none"
          className="stroke-lime"
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: d + settle + 0.5, ease: EASE_EDITORIAL }}
        />
        {[
          [PAD - 22, PAD - 22],
          [W - PAD + 22, PAD - 22],
          [PAD - 22, H - PAD + 22],
          [W - PAD + 22, H - PAD + 22],
        ].map(([cx, cy], i) => (
          <motion.rect
            key={i}
            x={cx! - 4}
            y={cy! - 4}
            width={8}
            height={8}
            className="fill-lime"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: d + settle + 0.5 + i * 0.4 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}
