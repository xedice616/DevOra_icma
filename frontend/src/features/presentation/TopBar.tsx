import { LogoBadge } from '../../components/LogoBadge'
import { CtaButton } from '../../components/CtaButton'
import { brand } from '../../content/brand'
import { MARGIN } from './SlideFrame'
import type { SlideTheme } from './types'

interface TopBarProps {
  theme: SlideTheme
  onHome: () => void
  onJoin: () => void
}

export function TopBar({ theme, onHome, onJoin }: TopBarProps) {
  const dark = theme === 'dark'
  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-30 transition-colors delay-300 duration-700 ${dark ? 'text-cream' : 'text-ink'}`}
    >
      <div className={`flex h-20 items-center justify-between sm:h-24 ${MARGIN}`}>
        <button
          type="button"
          onClick={onHome}
          className="pointer-events-auto flex items-center gap-3"
          aria-label={`${brand.name} — ilk slayda qayıt`}
        >
          <LogoBadge decorative className="size-10 sm:size-11" />
          <span className="hidden text-[0.95rem] font-semibold tracking-[-0.02em] [font-stretch:110%] sm:block">{brand.name}</span>
        </button>

        <CtaButton label={brand.joinLabel} onClick={onJoin} tone={dark ? 'lime' : 'ink'} className="pointer-events-auto" />
      </div>
    </header>
  )
}
