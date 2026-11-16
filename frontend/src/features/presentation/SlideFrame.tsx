import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'

interface SlideFrameProps {
  /** Background + text colour classes for the slide surface. */
  surface: string
  /** Absolutely positioned art that sits behind the content (full bleed). */
  backdrop?: ReactNode
  /** Show the faint 12-column editorial grid. */
  guides?: boolean
  children: ReactNode
  className?: string
}

/** Horizontal page margin shared by the chrome and every slide. */
export const MARGIN = 'px-5 sm:px-8 lg:px-[4.5vw]'

/** Never shrink a composition below this — below it, scrolling is the lesser evil. */
const MIN_FIT = 0.6

/**
 * Common slide surface. Reserves space for the top bar and bottom controls.
 * When a composition is taller than the screen, it is scaled down as a whole
 * (like a Keynote slide) so nothing has to be scrolled to.
 */
export function SlideFrame({ surface, backdrop, guides = true, children, className = '' }: SlideFrameProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const padderRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useFitToScreen(scrollerRef, padderRef, stageRef)

  return (
    <div className={`absolute inset-0 overflow-hidden ${surface}`}>
      {guides && <GridGuides />}
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {backdrop}
        </div>
      )}
      <div
        ref={scrollerRef}
        className="no-scrollbar absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,transparent_0,#000_4.5rem,#000_calc(100%-6rem),transparent_calc(100%-5rem))] sm:[mask-image:linear-gradient(to_bottom,transparent_0,#000_5.5rem,#000_calc(100%-7rem),transparent_calc(100%-6rem))]"
      >
        <div ref={padderRef} className={`relative flex min-h-full w-full flex-col pt-20 pb-24 sm:pt-24 sm:pb-28 ${MARGIN}`}>
          <div ref={stageRef} className={`relative flex flex-1 flex-col ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Scales the stage with CSS `zoom` until its laid-out height fits the space
 * between the chrome. `zoom` (unlike transform) re-flows the content at the
 * new size, so compositions keep their proportions and stay crisp.
 */
function useFitToScreen(
  scrollerRef: RefObject<HTMLDivElement | null>,
  padderRef: RefObject<HTMLDivElement | null>,
  stageRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const padder = padderRef.current
    const stage = stageRef.current
    if (!scroller || !padder || !stage) return

    let zoom = 1
    const apply = (z: number) => {
      zoom = z
      stage.style.zoom = z === 1 ? '' : String(z)
    }

    const available = () => {
      const cs = getComputedStyle(padder)
      return scroller.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
    }

    /** Shrink until it fits (a few passes, since re-flow changes the height). */
    const shrink = () => {
      for (let pass = 0; pass < 4; pass++) {
        const avail = available()
        const height = stage.getBoundingClientRect().height
        if (height <= avail + 1 || zoom <= MIN_FIT) return
        apply(Math.max(MIN_FIT, (zoom * avail) / height - 0.005))
      }
    }

    const refit = () => {
      apply(1)
      shrink()
    }

    refit()
    let lastWidth = scroller.clientWidth
    let lastHeight = scroller.clientHeight
    const frameObserver = new ResizeObserver(() => {
      if (scroller.clientWidth === lastWidth && scroller.clientHeight === lastHeight) return
      lastWidth = scroller.clientWidth
      lastHeight = scroller.clientHeight
      refit()
    })
    frameObserver.observe(scroller)
    // content can grow after mount (web fonts, images) — only ever shrink in response
    const contentObserver = new ResizeObserver(() => shrink())
    contentObserver.observe(stage)
    document.fonts?.ready.then(refit).catch(() => {})

    return () => {
      frameObserver.disconnect()
      contentObserver.disconnect()
    }
  }, [scrollerRef, padderRef, stageRef])
}

/** Swiss-style column guides: hairlines at the 12-column boundaries. */
function GridGuides() {
  return (
    <div className={`pointer-events-none absolute inset-0 ${MARGIN}`} aria-hidden="true">
      <div className="grid h-full grid-cols-4 lg:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`border-l border-current/[0.06] ${i >= 4 ? 'hidden lg:block' : ''} ${i === 11 || i === 3 ? 'border-r' : ''} ${i === 3 ? 'lg:border-r-0' : ''}`} />
        ))}
      </div>
    </div>
  )
}
