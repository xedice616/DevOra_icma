import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_EDITORIAL, EASE_OUT_EXPO, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'

interface ArcDiagramProps {
  items: string[]
}

const pairs = (n: number) => {
  const out: [number, number][] = []
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) out.push([a, b])
  return out
}

/**
 * Every discipline is linked to every other one. The focus cycles through
 * the six (or follows hover/focus), lighting up how one field touches all the rest.
 */
export function ArcDiagram({ items }: ArcDiagramProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const links = pairs(items.length)
  const d = SLIDE_CONTENT_DELAY + 0.4

  useEffect(() => {
    if (paused || reduce) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % items.length), 2600)
    return () => window.clearInterval(id)
  }, [paused, reduce, items.length])

  const hold = (i: number) => {
    setActive(i)
    setPaused(true)
  }
  const release = () => setPaused(false)

  return (
    <div className="flex flex-1 flex-col" onMouseLeave={release}>
      {/* ≥ md: horizontal arcs above a baseline */}
      <div className="relative hidden flex-1 md:block">
        <motion.svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
          initial={{ clipPath: 'inset(-5% 100% -5% 0%)' }}
          animate={{ clipPath: 'inset(-5% 0% -5% 0%)' }}
          transition={{ duration: 1.6, delay: d, ease: EASE_EDITORIAL }}
        >
          {links.map(([a, b]) => {
            const xa = ((a + 0.5) / items.length) * 1200
            const xb = ((b + 0.5) / items.length) * 1200
            const rx = (xb - xa) / 2
            const ry = Math.min(395, 70 + (b - a) * 66)
            const on = a === active || b === active
            return (
              <path
                key={`${a}-${b}`}
                d={`M ${xa} 400 A ${rx} ${ry} 0 0 1 ${xb} 400`}
                fill="none"
                vectorEffect="non-scaling-stroke"
                className={`transition-[stroke,stroke-width,opacity] duration-700 ${on ? 'stroke-lime' : 'stroke-cream'}`}
                strokeWidth={on ? 1.6 : 1}
                opacity={on ? 1 : 0.16}
              />
            )
          })}
        </motion.svg>
      </div>

      <ol className="relative hidden grid-cols-6 border-t border-cream/30 md:grid">
        {items.map((item, i) => (
          <Label key={item} item={item} i={i} active={i === active} onHold={hold} delay={d + 0.4 + i * 0.08} />
        ))}
      </ol>

      {/* < md: vertical — labels on the left, arcs bulging right */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:hidden">
        <ol className="flex flex-col justify-between border-r border-cream/30">
          {items.map((item, i) => (
            <li key={item} className="relative flex h-14 items-center justify-end pr-4">
              <button
                type="button"
                onClick={() => hold(i)}
                className={`text-right text-[1rem] font-semibold tracking-[-0.02em] transition-colors duration-500 ${i === active ? 'text-lime' : 'text-cream/60'}`}
              >
                {item}
              </button>
              <span className={`absolute -right-[4px] size-[7px] transition-colors duration-500 ${i === active ? 'bg-lime' : 'bg-cream'}`} />
            </li>
          ))}
        </ol>
        <svg viewBox={`0 0 200 ${items.length * 56}`} preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
          {links.map(([a, b]) => {
            const ya = a * 56 + 28
            const yb = b * 56 + 28
            const on = a === active || b === active
            return (
              <path
                key={`${a}-${b}`}
                d={`M 0 ${ya} A ${Math.min(195, 30 + (b - a) * 34)} ${(yb - ya) / 2} 0 0 1 0 ${yb}`}
                fill="none"
                vectorEffect="non-scaling-stroke"
                className={`transition-[stroke,opacity] duration-700 ${on ? 'stroke-lime' : 'stroke-cream'}`}
                opacity={on ? 1 : 0.16}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function Label({ item, i, active, onHold, delay }: { item: string; i: number; active: boolean; onHold: (i: number) => void; delay: number }) {
  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {/* node on the baseline */}
      <span
        aria-hidden="true"
        className={`absolute -top-[5px] left-1/2 size-[9px] -translate-x-1/2 transition-[background-color,transform] duration-500 ${active ? 'scale-125 bg-lime' : 'bg-cream'}`}
      />
      <button
        type="button"
        onMouseEnter={() => onHold(i)}
        onFocus={() => onHold(i)}
        onClick={() => onHold(i)}
        aria-pressed={active}
        className="flex w-full flex-col items-center px-2 pt-6 text-center"
      >
        <span className={`type-index transition-colors duration-500 ${active ? 'text-lime' : 'opacity-50'}`}>{String(i + 1).padStart(2, '0')}</span>
        <span
          className={`mt-2 text-[clamp(0.95rem,min(1.45vw,2.6vh),1.5rem)] leading-tight font-semibold tracking-[-0.025em] transition-colors duration-500 ${active ? 'text-lime' : 'text-cream'}`}
        >
          {item}
        </span>
      </button>
    </motion.li>
  )
}
