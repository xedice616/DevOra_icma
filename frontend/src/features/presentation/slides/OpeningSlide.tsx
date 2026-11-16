import { motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { LogoBadge } from '../../../components/LogoBadge'
import { EASE_OUT_EXPO, MaskLine, Reveal, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { brand } from '../../../content/brand'
import { openingContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { ConnectionMatrix } from '../visuals/ConnectionMatrix'

export function OpeningSlide() {
  return (
    <SlideFrame surface="bg-forest text-cream">
      {/* top row: section marker + tagline */}
      <div className="flex items-start justify-between gap-6">
        <Kicker index={1} label={openingContent.kicker} />
        <ul className="hidden text-right md:block" aria-label="Tagline">
          {brand.tagline.map((word, i) => (
            <motion.li
              key={word}
              className="type-label !text-[0.72rem] leading-[1.7]"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: SLIDE_CONTENT_DELAY + 0.9 + i * 0.12, ease: EASE_OUT_EXPO }}
            >
              {i === 2 ? <span className="text-lime">{word}</span> : word}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* middle: identity + connection art */}
      <div className="grid flex-1 grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12 lg:gap-x-6 lg:py-4">
        <div className="flex items-center gap-6 lg:col-span-5 lg:flex-col lg:items-start lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: SLIDE_CONTENT_DELAY + 0.1, ease: EASE_OUT_EXPO }}
            className="shrink-0"
          >
            <LogoBadge priority className="size-[min(28vw,15vh)] lg:size-[min(13vw,20vh)]" />
          </motion.div>
          <p className="text-[clamp(1.2rem,min(2.1vw,3.6vh),2.1rem)] leading-[1.15] font-medium tracking-[-0.03em]">
            {openingContent.statement.map((line, i) => (
              <MaskLine key={line} delay={0.5 + i * 0.12}>
                {line}
              </MaskLine>
            ))}
          </p>
        </div>
        <ConnectionMatrix className="w-full lg:col-span-7 lg:col-start-6 lg:max-w-[min(100%,64vh)] lg:justify-self-end" />
      </div>

      {/* bottom: the name, set as large as the page allows */}
      <div className="flex items-end justify-between gap-6">
        <h1 className="type-hero -ml-[0.04em]">
          <MaskLine delay={0.05}>
            {openingContent.title}
            <span className="text-lime">.</span>
          </MaskLine>
        </h1>
        <Reveal delay={1.6} className="type-label hidden max-w-[11rem] pb-3 text-right opacity-50 xl:block">
          {openingContent.hint}
        </Reveal>
      </div>
    </SlideFrame>
  )
}
