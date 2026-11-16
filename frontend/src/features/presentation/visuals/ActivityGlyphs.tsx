import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { EASE_EDITORIAL, EASE_OUT_EXPO } from '../../../components/Reveal'
import type { ActivityGlyph as GlyphName } from '../../../content/presentation'

/**
 * One custom drawing per activity — each a small diagram of what the work
 * looks like, drawn in the cell's text colour. `delay` is absolute (seconds).
 */
export function ActivityGlyph({ name, delay }: { name: GlyphName; delay: number }) {
  const Glyph = glyphs[name]
  return (
    <svg viewBox="0 0 120 72" className="h-full w-auto overflow-visible" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <Glyph d={delay} />
    </svg>
  )
}

const draw = (d: number, dur = 1) => ({
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: dur, delay: d, ease: EASE_EDITORIAL },
})

/** Proqram təminatı — lines of code being written, cursor blinking. */
function Software({ d }: { d: number }) {
  const rows: [indent: number, width: number][] = [
    [0, 46], [12, 58], [24, 34], [24, 62], [12, 22], [0, 16],
  ]
  return (
    <g stroke="none" fill="currentColor">
      {rows.map(([ix, w], i) => (
        <motion.rect
          key={i}
          x={6 + ix}
          y={6 + i * 11}
          height={4}
          width={w}
          style={{ originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: d + i * 0.12, ease: EASE_OUT_EXPO }}
          opacity={i === 3 ? 1 : 0.55}
        />
      ))}
      <rect x={6 + 16 + 4} y={2 + 5 * 11} width={6} height={12} className="anim-blink" />
    </g>
  )
}

/** Açıq mənbə — a branch leaving main and merging back. */
function OpenSource({ d }: { d: number }) {
  return (
    <g>
      <motion.path d="M 4 50 H 116" {...draw(d, 1)} />
      <motion.path d="M 30 50 C 44 50, 40 20, 56 20 H 72 C 88 20, 84 50, 98 50" strokeDasharray="0" {...draw(d + 0.5, 1)} />
      {[16, 30, 98, 112].map((x, i) => (
        <motion.circle key={x} cx={x} cy={50} r={4.5} className="fill-[var(--cell-bg)]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d + 0.2 + i * 0.12 }} />
      ))}
      {[56, 72].map((x, i) => (
        <motion.circle key={x} cx={x} cy={20} r={4.5} fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d + 1 + i * 0.12 }} />
      ))}
    </g>
  )
}

/** Texniki seminarlar — a board, an audience. */
function Workshop({ d }: { d: number }) {
  return (
    <g>
      <motion.rect x={22} y={4} width={76} height={34} {...draw(d, 1)} />
      <motion.path d="M 32 16 H 70 M 32 26 H 58" {...draw(d + 0.6, 0.6)} />
      <motion.path d="M 74 30 L 82 20 L 88 26" {...draw(d + 0.8, 0.5)} />
      {[0, 1, 2].map((r) =>
        Array.from({ length: 7 - r }, (_, c) => (
          <motion.circle
            key={`${r}-${c}`}
            cx={60 - ((6 - r) * 12) / 2 + c * 12}
            cy={50 + r * 9}
            r={2}
            fill="currentColor"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d + 0.9 + r * 0.15 + c * 0.03 }}
          />
        )),
      )}
    </g>
  )
}

/** Komanda layihələri — four parts closing into one block. */
function Team({ d }: { d: number }) {
  const parts = [
    { x: 36, y: 8, fx: -14, fy: -6 },
    { x: 61, y: 8, fx: 14, fy: -6 },
    { x: 36, y: 33, fx: -14, fy: 6 },
    { x: 61, y: 33, fx: 14, fy: 6 },
  ]
  return (
    <g>
      {parts.map((p, i) => (
        <motion.rect
          key={i}
          x={p.x}
          y={p.y}
          width={23}
          height={23}
          fill={i === 1 ? 'currentColor' : 'none'}
          initial={{ x: p.fx, y: p.fy, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: d + i * 0.08, ease: EASE_EDITORIAL }}
        />
      ))}
    </g>
  )
}

/** Bilik və təcrübə mübadiləsi — two sources trading in both directions. */
function Exchange({ d }: { d: number }) {
  return (
    <g>
      <motion.rect x={4} y={10} width={30} height={46} {...draw(d, 0.8)} />
      <motion.rect x={86} y={10} width={30} height={46} {...draw(d + 0.1, 0.8)} />
      <motion.path d="M 11 22 H 27 M 11 31 H 23 M 93 22 H 109 M 93 31 H 105" {...draw(d + 0.5, 0.5)} />
      <motion.path d="M 42 24 H 76 M 70 18 L 77 24 L 70 30" {...draw(d + 0.8, 0.6)} />
      <motion.path d="M 78 44 H 44 M 50 38 L 43 44 L 50 50" {...draw(d + 1, 0.6)} />
    </g>
  )
}

/** Hackathonlar və innovasiya — a timer running down to the finish. */
function Hackathon({ d }: { d: number }) {
  const ticks = 24
  return (
    <g>
      {Array.from({ length: ticks }, (_, i) => {
        const a = (i / ticks) * Math.PI * 2 - Math.PI / 2
        const r1 = 22
        const r2 = i % 6 === 0 ? 32 : 29
        const done = i < 17
        return (
          <motion.line
            key={i}
            x1={60 + r1 * Math.cos(a)}
            y1={36 + r1 * Math.sin(a)}
            x2={60 + r2 * Math.cos(a)}
            y2={36 + r2 * Math.sin(a)}
            strokeWidth={done ? 2 : 1}
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0.35 }}
            transition={{ delay: d + i * 0.04 }}
          />
        )
      })}
      <motion.path d="M 63 22 L 54 38 H 62 L 57 50 L 68 33 H 60 Z" fill="currentColor" stroke="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d + 1.1, ease: EASE_OUT_EXPO }} />
    </g>
  )
}

const glyphs: Record<GlyphName, (p: { d: number }) => JSX.Element> = {
  software: Software,
  openSource: OpenSource,
  workshop: Workshop,
  team: Team,
  exchange: Exchange,
  hackathon: Hackathon,
}
