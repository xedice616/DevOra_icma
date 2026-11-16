import { motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { EASE_OUT_EXPO, MaskLine, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { cssVars } from '../../../lib/cssVars'
import { activitiesContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { ActivityGlyph } from '../visuals/ActivityGlyphs'

export function ActivitiesSlide() {
  const last = activitiesContent.areas.length - 1
  return (
    <SlideFrame surface="bg-cream text-ink">
      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col lg:col-span-4">
          <Kicker index={4} label={activitiesContent.label} />
          <h2 className="type-title mt-6 sm:mt-10">
            {activitiesContent.title.map((line, i) => (
              <MaskLine key={line} delay={0.08 + i * 0.14} className={i === 1 ? 'text-forest' : undefined}>
                {line}
              </MaskLine>
            ))}
          </h2>
        </div>

        {/* editorial index: a ruled 3×2 table, each entry with its own drawing */}
        <ul className="grid grid-cols-2 border-ink/15 lg:col-span-8 lg:grid-cols-3 lg:self-stretch lg:border-r lg:border-b">
          {activitiesContent.areas.map((area, i) => {
            const accent = i === last
            const delay = SLIDE_CONTENT_DELAY + 0.35 + i * 0.1
            return (
              <motion.li
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
                style={cssVars({ '--cell-bg': accent ? 'var(--color-forest)' : 'var(--color-cream)' })}
                className={`group relative flex min-h-[7.75rem] flex-col justify-between border-t border-l border-ink/15 p-3.5 transition-colors duration-500 sm:min-h-[9.5rem] sm:p-5 lg:min-h-0 lg:p-6 ${
                  accent ? 'bg-forest text-cream' : 'hover:bg-white'
                } ${i % 2 === 1 ? 'border-r lg:border-r-0' : ''} ${i >= 4 ? 'border-b lg:border-b-0' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="type-index opacity-60">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    aria-hidden="true"
                    className={`size-1.5 transition-transform duration-500 group-hover:rotate-45 ${accent ? 'bg-lime' : 'bg-ink/30 group-hover:bg-forest'}`}
                  />
                </div>
                <div className={`my-3 h-10 sm:my-4 sm:h-16 lg:h-[clamp(3.5rem,11vh,6.5rem)] ${accent ? 'text-lime' : 'text-ink'}`}>
                  <ActivityGlyph name={area.glyph} delay={delay + 0.3} />
                </div>
                <h3 className="max-w-[15rem] text-[clamp(0.98rem,min(1.5vw,2.5vh),1.45rem)] leading-[1.1] font-semibold tracking-[-0.025em]">
                  {area.title}
                </h3>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </SlideFrame>
  )
}
