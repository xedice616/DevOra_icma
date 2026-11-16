import type { ReactNode } from 'react'

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

/**
 * Common slide surface. Reserves space for the top bar and the bottom
 * controls and lets content scroll (masked) on very short screens.
 */
export function SlideFrame({ surface, backdrop, guides = true, children, className = '' }: SlideFrameProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${surface}`}>
      {guides && <GridGuides />}
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {backdrop}
        </div>
      )}
      <div className="no-scrollbar absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,transparent_0,#000_4.5rem,#000_calc(100%-6.5rem),transparent_calc(100%-4.75rem))]">
        <div className={`relative flex min-h-full w-full flex-col pt-20 pb-24 sm:pt-24 sm:pb-28 ${MARGIN} ${className}`}>{children}</div>
      </div>
    </div>
  )
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
