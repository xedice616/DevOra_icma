import { motion } from 'framer-motion'
import { CtaButton } from '../../../components/CtaButton'
import { Kicker } from '../../../components/Kicker'
import { EASE_OUT_EXPO, MaskLine, Reveal, Rule, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { brand } from '../../../content/brand'
import { joinContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import type { SlideProps } from '../types'
import { OpenSlot } from '../visuals/OpenSlot'

export function JoinSlide({ onJoin }: SlideProps) {
  return (
    <SlideFrame surface="bg-forest text-cream">
      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col lg:col-span-8">
          <Kicker index={8} label={joinContent.label} />
          <h2 className="type-display mt-6 sm:mt-8">
            {joinContent.title.map((line, i) => (
              <MaskLine key={line} delay={0.08 + i * 0.13} className={line === joinContent.highlight ? 'text-lime' : undefined}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Reveal delay={0.75} className="mt-6 grid gap-6 sm:mt-10 sm:gap-8 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-10">
            <p className="type-lead text-cream/80">{joinContent.body}</p>
            <CtaButton label={joinContent.cta} onClick={onJoin} tone="lime" size="lg" className="justify-self-start" />
          </Reveal>
        </div>

        <div className="flex items-center lg:col-span-3 lg:col-start-9">
          <OpenSlot label={joinContent.slot} className="w-[34%] max-w-[16rem] sm:w-[46%] lg:max-h-[52vh] lg:w-full lg:max-w-none" />
        </div>
      </div>

      {/* closing line, spread across the full measure */}
      <div className="mt-6 sm:mt-10 lg:mt-6">
        <Rule delay={1.2} className="opacity-25" />
        <p className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[clamp(1.3rem,min(3.4vw,5.6vh),3.6rem)] leading-none font-semibold tracking-[-0.04em] [font-stretch:115%]">
          {brand.tagline.map((word, i) => (
            <motion.span
              key={word}
              className={i === 2 ? 'text-lime' : undefined}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: SLIDE_CONTENT_DELAY + 1.35 + i * 0.15, ease: EASE_OUT_EXPO }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </SlideFrame>
  )
}
