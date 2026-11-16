import { motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { EASE_EDITORIAL, MaskLine, Reveal, Rule, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { whyContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { IdeaStroke } from '../visuals/IdeaStrokes'

export function WhySlide() {
  return (
    <SlideFrame surface="bg-cream text-ink">
      <Kicker index={2} label={whyContent.label} />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-12 lg:gap-x-6">
        <h2 className="type-display lg:col-span-9">
          {whyContent.title.map((line, i) => (
            <MaskLine key={line} delay={0.08 + i * 0.12}>
              {line === whyContent.highlight ? <Highlight>{line}</Highlight> : line}
            </MaskLine>
          ))}
        </h2>
        <Reveal delay={0.6} className="type-lead max-w-sm self-end lg:col-span-3 lg:pb-2">
          {whyContent.body}
        </Reveal>
      </div>

      {/* the three ideas, read left to right as one continuous line */}
      <ol className="mt-auto grid grid-cols-1 pt-7 sm:grid-cols-3 sm:pt-12">
        {whyContent.ideas.map((idea, i) => (
          <li key={idea.title} className={`flex flex-col pb-4 sm:pb-0 ${i ? 'sm:border-l sm:border-ink/15 sm:pl-6' : ''} sm:pr-6`}>
            <div className="flex items-baseline gap-3">
              <Reveal delay={0.9 + i * 0.35} y={10} className="type-index">
                {String(i + 1).padStart(2, '0')}
              </Reveal>
              <Rule delay={0.9 + i * 0.35} className="flex-1 opacity-15" />
            </div>
            {/* phone: text beside a small stroke; tablet+: stroke above the text */}
            <div className="mt-2 flex items-center gap-4 sm:mt-0 sm:block">
              <div className="order-2 w-24 shrink-0 sm:order-none sm:mt-6 sm:w-full">
                <IdeaStroke step={i as 0 | 1 | 2} delay={1 + i * 0.35} />
              </div>
              <Reveal delay={1.15 + i * 0.35} className="order-1 flex-1 sm:mt-6">
                <h3 className="text-[clamp(1.5rem,min(3.2vw,5.4vh),3.4rem)] leading-none font-semibold tracking-[-0.04em] [font-stretch:108%]">
                  {idea.title}
                </h3>
                <p className="mt-1.5 max-w-[18rem] text-[0.92rem] leading-snug text-ink/70 sm:mt-3 sm:text-[0.98rem]">{idea.text}</p>
              </Reveal>
            </div>
          </li>
        ))}
      </ol>
    </SlideFrame>
  )
}

/** Lime marker block that sweeps in behind the phrase after the line reveals. */
function Highlight({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-[0.08em] top-[0.12em] bottom-[0.02em] origin-left bg-lime"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: SLIDE_CONTENT_DELAY + 0.75, ease: EASE_EDITORIAL }}
      />
      <span className="relative">{children}</span>
    </span>
  )
}
