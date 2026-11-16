import { Kicker } from '../../../components/Kicker'
import { MaskLine } from '../../../components/Reveal'
import { ecosystemContent } from '../../../content/presentation'
import { SlideFrame } from '../SlideFrame'
import { ArcDiagram } from '../visuals/ArcDiagram'

export function EcosystemSlide() {
  return (
    <SlideFrame surface="bg-forest text-cream">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Kicker index={5} label={ecosystemContent.label} />
          <h2 className="type-title mt-6 sm:mt-8">
            {ecosystemContent.title.map((line, i) => (
              <MaskLine key={line} delay={0.08 + i * 0.14} className={i === 1 ? 'text-lime' : undefined}>
                {line}
              </MaskLine>
            ))}
          </h2>
        </div>
      </div>
      <div className="mt-8 flex min-h-[18rem] flex-1 flex-col md:mt-6 lg:px-[4%]">
        <ArcDiagram items={ecosystemContent.disciplines} />
      </div>
    </SlideFrame>
  )
}
