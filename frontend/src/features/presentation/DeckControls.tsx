import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MARGIN } from './SlideFrame'
import type { SlideDefinition, SlideTheme } from './types'

interface DeckControlsProps {
  slides: SlideDefinition[]
  index: number
  theme: SlideTheme
  isFirst: boolean
  isLast: boolean
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Narrow screens get shorter progress ticks so the bar never collides with the counter. */
function useCompact() {
  const query = '(max-width: 639px)'
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setCompact(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

export function DeckControls({ slides, index, theme, isFirst, isLast, onPrev, onNext, onGoTo }: DeckControlsProps) {
  const dark = theme === 'dark'
  const current = slides[index]!
  const compact = useCompact()
  const arrow = `pointer-events-auto grid size-11 place-items-center border border-current/25 transition-[background-color,color,border-color,opacity] duration-300 hover:border-current disabled:pointer-events-none disabled:opacity-20 ${
    dark ? 'hover:bg-cream hover:text-forest' : 'hover:bg-ink hover:text-cream'
  }`

  return (
    <nav
      aria-label="Təqdimat naviqasiyası"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 transition-colors delay-300 duration-700 ${dark ? 'text-cream' : 'text-ink'}`}
    >
      <div className={`flex h-20 items-center gap-4 pb-[env(safe-area-inset-bottom)] sm:h-24 sm:gap-8 ${MARGIN}`}>
        {/* counter + current section */}
        <div className="flex min-w-0 items-center gap-4" aria-hidden="true">
          <span className="type-index flex items-baseline gap-1 !text-sm">
            <span className="relative inline-block h-[1.25em] w-[1.3em] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={index}
                  className="absolute inset-0"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {pad(index + 1)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="opacity-40">/{pad(slides.length)}</span>
          </span>
          <span className="type-label hidden truncate opacity-60 md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.label}
                className="block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {current.label}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* progress: one tick per slide */}
        <ol className="ml-auto flex h-11 items-center gap-1 sm:gap-1.5">
          {slides.map((slide, i) => (
            <li key={slide.id} className="h-full">
              <button
                type="button"
                onClick={() => onGoTo(i)}
                aria-label={`${pad(i + 1)} — ${slide.label}`}
                aria-current={i === index ? 'step' : undefined}
                className="pointer-events-auto group flex h-full items-center px-0.5 sm:px-1"
              >
                <motion.span
                  className="block h-px"
                  initial={false}
                  animate={{
                    width: i === index ? (compact ? 22 : 40) : compact ? 8 : 14,
                    opacity: i === index ? 1 : i < index ? 0.55 : 0.25,
                  }}
                  transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
                  style={{ backgroundColor: i === index ? (dark ? '#b8d99a' : '#123b2f') : 'currentColor', height: i === index ? 2 : 1 }}
                />
              </button>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onPrev} disabled={isFirst} aria-label="Əvvəlki slayd" className={arrow}>
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <path d="M16 10H4M9 5l-5 5 5 5" />
            </svg>
          </button>
          <button type="button" onClick={onNext} disabled={isLast} aria-label="Növbəti slayd" className={arrow}>
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
