import { motion } from 'framer-motion'
import { EASE_EDITORIAL, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'

/**
 * One line that changes character as it travels across the three ideas:
 *   Öyrən      — scattered fragments (knowledge picked up piece by piece)
 *   Yarat      — a continuous line with blocks stacking on it
 *   Əlaqə qur  — the line branching out to others
 * The three parts sit edge to edge, so together they read as one stroke.
 */
const W = 400
const H = 64
const Y = 40

interface IdeaStrokeProps {
  step: 0 | 1 | 2
  delay: number
}

export function IdeaStroke({ step, delay }: IdeaStrokeProps) {
  const d = SLIDE_CONTENT_DELAY + delay
  return (
    <motion.div
      className="w-full"
      initial={{ clipPath: 'inset(-20% 100% -20% 0%)' }}
      animate={{ clipPath: 'inset(-20% 0% -20% 0%)' }}
      transition={{ duration: 1.1, delay: d, ease: EASE_EDITORIAL }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible">
        {step === 0 && <Fragments />}
        {step === 1 && <Build delay={d} />}
        {step === 2 && <Branches delay={d} />}
      </svg>
    </motion.div>
  )
}

function Fragments() {
  // short dashes, some lifted off the line — knowledge not yet assembled
  const bits = [
    [0, 0], [26, 0], [52, -10], [70, 0], [98, 0], [128, 8], [146, 0], [176, 0], [204, -14],
    [222, 0], [250, 0], [280, 6], [300, 0], [330, 0], [356, 0], [382, 0],
  ] as const
  return (
    <g className="stroke-ink" strokeWidth={1.5} strokeLinecap="square">
      {bits.map(([x, dy], i) => (
        <line key={i} x1={x} x2={x + (dy ? 6 : 12)} y1={Y + dy} y2={Y + dy} opacity={dy ? 0.45 : 1} />
      ))}
    </g>
  )
}

function Build({ delay }: { delay: number }) {
  const blocks = [40, 120, 200, 280, 360]
  return (
    <g>
      <line x1={0} x2={W} y1={Y} y2={Y} className="stroke-ink" strokeWidth={2} />
      {blocks.map((x, i) => (
        <motion.rect
          key={x}
          x={x - 7}
          width={14}
          height={14}
          className={i === blocks.length - 1 ? 'fill-forest' : 'fill-ink'}
          initial={{ y: Y - 40, opacity: 0 }}
          animate={{ y: Y - 15, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </g>
  )
}

function Branches({ delay }: { delay: number }) {
  const ends = [8, 26, 54, 64]
  return (
    <g fill="none" className="stroke-ink" strokeWidth={1.5}>
      <line x1={0} x2={150} y1={Y} y2={Y} strokeWidth={2} />
      {ends.map((ey, i) => (
        <motion.path
          key={ey}
          d={`M 150 ${Y} C 230 ${Y}, 250 ${ey}, 330 ${ey} L ${W - 12} ${ey}`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: delay + 0.5 + i * 0.1, ease: EASE_EDITORIAL }}
        />
      ))}
      {ends.map((ey, i) => (
        <motion.circle
          key={`n${ey}`}
          cx={W - 6}
          cy={ey}
          r={5}
          className={i === 1 ? 'fill-forest stroke-forest' : 'fill-cream'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.2 + i * 0.1 }}
        />
      ))}
    </g>
  )
}
