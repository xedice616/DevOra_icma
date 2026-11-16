import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from 'framer-motion'
import { brand } from '../../content/brand'
import { slides } from './slides'
import { TopBar } from './TopBar'
import { DeckControls } from './DeckControls'
import { useDeckNavigation, useSwipe, type Direction } from './useDeckNavigation'

const EASE = [0.83, 0, 0.17, 1] as const
const DURATION = 1.1

/**
 * Page-turn transition: the incoming slide is revealed by a hard-edged wipe
 * while its contents travel a shorter distance than the edge (parallax); the
 * outgoing slide is pushed back at a slower rate and dims.
 */
const frame: Variants = {
  enter: (dir: Direction) => ({
    clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
    zIndex: 2,
  }),
  center: { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2, transition: { duration: DURATION, ease: EASE } },
  exit: { zIndex: 1, transition: { duration: DURATION } },
}

const content: Variants = {
  enter: (dir: Direction) => ({ x: `${dir * 30}%` }),
  center: { x: '0%', opacity: 1, transition: { duration: DURATION, ease: EASE } },
  exit: (dir: Direction) => ({ x: `${dir * -18}%`, opacity: 0.35, transition: { duration: DURATION, ease: EASE } }),
}

const fade: Variants = {
  enter: { opacity: 0, zIndex: 2 },
  center: { opacity: 1, zIndex: 2, transition: { duration: 0.35 } },
  exit: { opacity: 0, zIndex: 1, transition: { duration: 0.35 } },
}

export function Deck() {
  const nav = useDeckNavigation(slides.length)
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const [toast, setToast] = useState(false)

  useSwipe(rootRef, nav.next, nav.prev)

  // Registration is built in a later phase; until then the CTA only acknowledges the click.
  const handleJoin = useCallback(() => setToast(true), [])
  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(false), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  const current = slides[nav.index]!
  const { Component } = current

  return (
    <MotionConfig reducedMotion="user">
      <main ref={rootRef} className="fixed inset-0 overflow-hidden bg-ink" aria-roledescription="təqdimat" aria-label="DevOra təqdimatı">
        <AnimatePresence initial={false} custom={nav.direction}>
          <motion.section
            key={current.id}
            custom={nav.direction}
            variants={reduce ? fade : frame}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-hidden"
            aria-roledescription="slayd"
            aria-label={`${nav.index + 1} / ${slides.length}: ${current.label}`}
          >
            <motion.div className="absolute inset-0 will-change-transform" variants={reduce ? undefined : content} custom={nav.direction}>
              <Component onJoin={handleJoin} />
            </motion.div>
          </motion.section>
        </AnimatePresence>

        <TopBar theme={current.theme} onHome={() => nav.goTo(0)} onJoin={handleJoin} />
        <DeckControls
          slides={slides}
          index={nav.index}
          theme={current.theme}
          isFirst={nav.isFirst}
          isLast={nav.isLast}
          onPrev={nav.prev}
          onNext={nav.next}
          onGoTo={nav.goTo}
        />

        <p className="sr-only" aria-live="polite">
          Slayd {nav.index + 1} / {slides.length}: {current.label}
        </p>

        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 right-5 z-40 flex items-center gap-3 bg-ink px-4 py-3 text-sm text-cream sm:top-24 sm:right-8 lg:right-[4.5vw]"
            >
              <span className="size-1.5 bg-lime" aria-hidden="true" />
              {brand.joinPending}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
