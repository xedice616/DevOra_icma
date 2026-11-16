import { motion } from 'framer-motion'
import { SLIDE_CONTENT_DELAY, EASE_EDITORIAL } from '../../../components/Reveal'
import { usePointerParallax } from '../../../lib/usePointerParallax'

const COLS = 14
const ROWS = 8
const S = 40 // grid spacing
const PAD = 20

type Cell = [col: number, row: number]

/**
 * Circuit-like traces drawn across a dot grid: separate points becoming one
 * connected system. The lime trace is the main route, with a pulse travelling it.
 */
const traces: { cells: Cell[]; main?: boolean }[] = [
  { cells: [[0, 6], [3, 6], [5, 4], [9, 4], [10, 3], [13, 3]], main: true },
  { cells: [[1, 1], [4, 1], [6, 3], [6, 6], [8, 6]] },
  { cells: [[8, 0], [8, 2], [11, 2], [12, 1]] },
  { cells: [[3, 7], [3, 5], [2, 4], [2, 2]] },
  { cells: [[10, 7], [10, 5], [12, 5], [13, 6]] },
  { cells: [[11, 2], [11, 4]] },
]

const pt = ([c, r]: Cell) => ({ x: PAD + c * S, y: PAD + r * S })
const toPath = (cells: Cell[]) => cells.map((c, i) => `${i ? 'L' : 'M'} ${pt(c).x} ${pt(c).y}`).join(' ')

export function ConnectionMatrix({ className = '' }: { className?: string }) {
  const { x, y } = usePointerParallax(10)
  const d = SLIDE_CONTENT_DELAY + 0.3
  const W = PAD * 2 + (COLS - 1) * S
  const H = PAD * 2 + (ROWS - 1) * S

  return (
    <motion.div style={{ x, y }} className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" aria-hidden="true">
        {/* grid points */}
        <g className="fill-cream/30">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const p = pt([i % COLS, Math.floor(i / COLS)])
            return <circle key={i} cx={p.x} cy={p.y} r={1.4} />
          })}
        </g>

        {/* traces */}
        {traces.map((t, i) => {
          const path = toPath(t.cells)
          const start = pt(t.cells[0]!)
          const end = pt(t.cells[t.cells.length - 1]!)
          const delay = d + (t.main ? 0 : 0.4 + i * 0.18)
          return (
            <g key={i} className={t.main ? 'text-lime' : 'text-cream/55'}>
              <motion.path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth={t.main ? 2 : 1.2}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: t.main ? 1.8 : 1.2, delay, ease: EASE_EDITORIAL }}
              />
              {[start, end].map((p, j) => (
                <motion.rect
                  key={j}
                  x={p.x - 4}
                  y={p.y - 4}
                  width={8}
                  height={8}
                  fill={t.main ? 'currentColor' : 'var(--color-forest)'}
                  stroke="currentColor"
                  strokeWidth={1.2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: delay + (j ? (t.main ? 1.7 : 1.1) : 0), ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
              {t.main && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke="var(--color-white)"
                  strokeWidth={2.4}
                  strokeLinecap="square"
                  pathLength={1000}
                  strokeDasharray="14 986"
                  className="anim-travel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delay + 2 }}
                />
              )}
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}
