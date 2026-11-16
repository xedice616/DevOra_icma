import { motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { EASE_OUT_EXPO, MaskLine, Reveal, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { teamContent } from '../../../content/presentation'
import { teamMembers, teamPlaceholders, type TeamMember } from '../../../content/team'
import { SlideFrame } from '../SlideFrame'

const pad = (n: number) => String(n).padStart(2, '0')

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toLocaleUpperCase('az')

/**
 * Placement on the 6-column desktop grid: three across the first row, the
 * remaining two centred beneath them. Works for any team size of 4–6.
 */
function placement(i: number, count: number) {
  const firstRow = 3
  if (i < firstRow) return 'lg:col-span-2'
  const secondRowCount = count - firstRow
  const start = 1 + (3 - secondRowCount) // centre the second row on 6 columns
  const col = start + (i - firstRow) * 2
  return `lg:col-span-2 ${colStart[col] ?? ''}`
}
// Literal class names so Tailwind can see them.
const colStart: Record<number, string> = {
  1: 'lg:col-start-1',
  2: 'lg:col-start-2',
  3: 'lg:col-start-3',
  4: 'lg:col-start-4',
  5: 'lg:col-start-5',
}

/**
 * Founding team: an editorial masthead. Each entry is a ruled block — portrait,
 * name, role directly beneath, a one-line remit and the LinkedIn link.
 */
export function TeamSlide() {
  const count = teamMembers.length
  return (
    <SlideFrame surface="bg-cream text-ink">
      <Kicker index={7} label={teamContent.label} />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-12 lg:gap-x-6">
        <h2 className="type-title lg:col-span-8">
          {teamContent.title.map((line, i) => (
            <MaskLine key={line} delay={0.08 + i * 0.14} className={i === 1 ? 'text-forest' : undefined}>
              {line}
            </MaskLine>
          ))}
        </h2>
        <Reveal
          delay={0.5}
          className="max-w-xs text-[0.95rem] leading-snug tracking-[-0.012em] text-ink/70 sm:text-[clamp(1.05rem,min(1.45vw,2.5vh),1.45rem)] lg:col-span-4 lg:self-end lg:justify-self-end lg:pb-1 lg:text-right"
        >
          {teamContent.subtitle}
        </Reveal>
      </div>

      <ul className="mt-5 grid flex-1 grid-cols-1 content-center gap-x-6 sm:mt-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-6 lg:gap-y-[min(4vh,2.5rem)]">
        {teamMembers.map((member, i) => (
          <motion.li
            key={member.id}
            className={`${placement(i, count)} ${i === count - 1 && count % 2 === 1 ? 'sm:col-span-2 sm:w-1/2 sm:justify-self-center lg:w-auto lg:justify-self-stretch' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: SLIDE_CONTENT_DELAY + 0.4 + i * 0.09, ease: EASE_OUT_EXPO }}
          >
            <MemberCard member={member} index={i} />
          </motion.li>
        ))}
      </ul>
    </SlideFrame>
  )
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group relative flex items-stretch gap-4 border-t border-ink/15 py-2 sm:gap-5 sm:py-3 lg:py-[min(2.2vh,1.25rem)]">
      {/* hover: the rule turns forest from the left */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-forest transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100"
      />

      <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-forest sm:w-24 lg:w-[min(8.5vw,15vh)]">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.05]"
          />
        ) : (
          <PhotoPlaceholder name={member.name} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="type-index hidden text-ink/45 transition-colors duration-500 group-hover:text-forest sm:block">{pad(index + 1)}</span>
        <h3 className="text-[clamp(1.1rem,min(1.75vw,3.2vh),1.9rem)] leading-tight font-semibold tracking-[-0.035em] transition-[color,transform] duration-500 ease-(--ease-out-expo) group-hover:translate-x-1 group-hover:text-forest sm:mt-1.5">
          {member.name}
        </h3>
        <p className="type-label mt-1.5 text-forest">{member.role}</p>
        <p className="mt-2 hidden max-w-[22rem] text-[0.85rem] leading-snug text-ink/60 sm:line-clamp-3 [@media(max-height:720px)]:!hidden">{member.summary}</p>

        <div className="mt-auto pt-1.5 sm:pt-3">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} — LinkedIn`}
              className="type-label inline-flex items-center gap-1.5 border-b border-current pb-0.5 transition-colors hover:text-forest"
            >
              <LinkedInMark /> LinkedIn <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="type-label inline-flex items-center gap-1.5 text-ink/30" aria-label={teamPlaceholders.linkedinMissing} title={teamPlaceholders.linkedinMissing}>
              <LinkedInMark /> LinkedIn
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

/** Forest frame with crop marks and the member's initials, until a portrait is supplied. */
function PhotoPlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 text-cream" aria-hidden="true">
      {['top-1.5 left-1.5 border-t border-l', 'top-1.5 right-1.5 border-t border-r', 'bottom-1.5 left-1.5 border-b border-l', 'bottom-1.5 right-1.5 border-b border-r'].map((c) => (
        <span key={c} className={`absolute size-2.5 border-cream/40 transition-[border-color] duration-500 group-hover:border-lime ${c}`} />
      ))}
      <span className="absolute inset-0 grid place-items-center text-[clamp(1rem,2.4vw,2rem)] font-semibold tracking-[-0.04em] text-cream/85 [font-stretch:115%] transition-colors duration-500 group-hover:text-lime">
        {initials(name)}
      </span>
    </div>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5h12a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Zm2.2 4.8v6h1.9v-6H4.2Zm.95-3a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm2.65 3v6h1.9V9.2c0-.8.4-1.3 1-1.3s.9.5.9 1.3v3.1h1.9V8.8c0-1.6-.9-2.6-2.2-2.6-.8 0-1.4.4-1.7.9v-.8H7.8Z" />
    </svg>
  )
}
