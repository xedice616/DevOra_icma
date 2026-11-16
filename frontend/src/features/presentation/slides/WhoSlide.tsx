import { Kicker } from '../../../components/Kicker'
import { MaskLine, Reveal } from '../../../components/Reveal'
import { whoContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { CommunityField } from '../visuals/CommunityField'

/** Each title line gets its own weight in the hierarchy: same → different → shared. */
const lineTone = ['text-white', 'text-cream/40', 'text-lime']

export function WhoSlide() {
  return (
    <SlideFrame surface="bg-ink text-cream">
      <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col lg:col-span-6">
          <Kicker index={3} label={whoContent.label} />
          <h2 className="type-title mt-6 sm:mt-10">
            {whoContent.title.map((line, i) => (
              <MaskLine key={line} delay={0.08 + i * 0.14} className={lineTone[i]}>
                {line}
              </MaskLine>
            ))}
          </h2>
          <Reveal delay={0.8} className="mt-8 lg:mt-auto">
            <p className="type-lead max-w-md text-cream/75">{whoContent.body}</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <CommunityField className="mx-auto w-full max-w-[min(100%,72vh)]" />
          <Reveal delay={3} className="mt-6 flex justify-between gap-4 border-t border-cream/15 pt-4">
            {whoContent.caption.map((line) => (
              <span key={line} className="type-label opacity-55">
                {line}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
