import { motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { LogoBadge } from '../../../components/LogoBadge'
import { EASE_OUT_EXPO, MaskLine, Reveal, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { brand } from '../../../content/brand'
import { collaborationContent, type PartnerIdentity } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { Seam } from '../visuals/Seam'

/**
 * Split composition: DevOra's forest field on the left, the partner's ink
 * field on the right, interlocked along the centre seam. The headline runs
 * across both halves.
 */
export function CollaborationSlide() {
  const { partner } = collaborationContent
  return (
    <SlideFrame
      surface="bg-ink text-cream"
      guides={false}
      backdrop={
        <>
          <motion.div
            className="absolute inset-y-0 left-0 hidden w-1/2 bg-forest md:block"
            initial={{ scaleX: 0.6 }}
            animate={{ scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 1.2, delay: SLIDE_CONTENT_DELAY, ease: EASE_OUT_EXPO }}
          />
          <div className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:block">
            <Seam orientation="vertical" teeth={18} className="relative" />
          </div>
        </>
      }
    >
      <Kicker index={6} label={collaborationContent.label} />
      <h2 className="type-display mt-6 sm:mt-8">
        {collaborationContent.title.map((line, i) => (
          <MaskLine key={line} delay={0.08 + i * 0.14}>
            {line}
          </MaskLine>
        ))}
      </h2>

      {/* identities */}
      <div className="mt-10 grid flex-1 grid-cols-1 md:mt-8 md:grid-cols-2">
        <div className="-mx-5 flex items-center gap-5 bg-forest px-5 py-5 sm:-mx-8 sm:py-8 sm:px-8 md:mx-0 md:bg-transparent md:px-0 md:py-0 md:pr-[10%]">
          <Reveal delay={0.7} className="shrink-0">
            <LogoBadge className="size-[min(20vw,13vh)] md:size-[min(11vw,19vh)]" />
          </Reveal>
          <Reveal delay={0.85}>
            <Identity name={brand.name} descriptor={brand.descriptor} />
          </Reveal>
        </div>

        <Seam orientation="horizontal" teeth={12} className="relative -mx-5 w-auto sm:-mx-8 md:hidden" />

        <div className="-mx-5 flex items-center gap-5 bg-ink px-5 py-5 sm:-mx-8 sm:py-8 sm:px-8 md:mx-0 md:justify-end md:px-0 md:py-0 md:pl-[10%]">
          <Reveal delay={1} className="md:order-2">
            <PartnerMark partner={partner} />
          </Reveal>
          <Reveal delay={1.1} className="md:order-1 md:text-right">
            <Identity name={partner.name} descriptor={partner.descriptor} />
          </Reveal>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2">
        <Reveal delay={1.4}>
          <p className="type-lead max-w-md text-cream/85">{collaborationContent.statement}</p>
        </Reveal>
        <Reveal delay={1.6} className="type-label flex items-end gap-3 opacity-60 md:justify-end">
          <span>{brand.name}</span>
          <span className="text-lime">×</span>
          <span>BMU</span>
        </Reveal>
      </div>
    </SlideFrame>
  )
}

function Identity({ name, descriptor }: { name: string; descriptor: string }) {
  return (
    <div>
      <div className="max-w-[16ch] text-[clamp(1.4rem,min(2.6vw,4.4vh),2.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] [font-stretch:106%]">
        {name}
      </div>
      <div className="type-label mt-3 opacity-55">{descriptor}</div>
    </div>
  )
}

/** Partner's official logo when supplied; until then a neutral typographic mark. */
function PartnerMark({ partner }: { partner: PartnerIdentity }) {
  const size = 'size-[min(20vw,13vh)] md:size-[min(11vw,19vh)]'
  if (partner.logo) {
    return <img src={partner.logo} alt={`${partner.name} loqosu`} className={`${size} object-contain`} />
  }
  return (
    <div className={`${size} grid shrink-0 place-items-center border border-cream/30`}>
      <span className="text-[clamp(1.1rem,min(2.6vw,4.4vh),2.4rem)] font-bold tracking-[-0.04em] [font-stretch:120%]">BMU</span>
    </div>
  )
}
