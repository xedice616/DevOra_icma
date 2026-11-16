import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Kicker } from '../../../components/Kicker'
import { EASE_EDITORIAL, EASE_OUT_EXPO, MaskLine, Reveal, SLIDE_CONTENT_DELAY } from '../../../components/Reveal'
import { teamContent } from '../../../content/presentation'
import { teamMembers, teamPlaceholders, type TeamMember } from '../../../content/team'
import { SlideFrame } from '../SlideFrame'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Masthead layout: a credits-style index on the right, one large portrait on
 * the left that follows whichever name is hovered, focused or tapped.
 */
export function TeamSlide() {
  const [active, setActive] = useState(0)
  const member = teamMembers[active]!

  return (
    <SlideFrame surface="bg-cream text-ink">
      <Kicker index={7} label={teamContent.label} />
      <h2 className="type-title mt-6 sm:mt-8">
        {teamContent.title.map((line, i) => (
          <MaskLine key={line} delay={0.08 + i * 0.14} className={i === 1 ? 'text-forest' : undefined}>
            {line}
          </MaskLine>
        ))}
      </h2>

      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-x-6">
        {/* portrait */}
        <Reveal delay={0.5} className="hidden lg:col-span-4 lg:block">
          <div className="relative aspect-[4/5] max-h-[44vh] overflow-hidden bg-forest">
            <AnimatePresence initial={false}>
              <motion.div
                key={member.id}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
              >
                <Portrait member={member} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* index */}
        <ol className="self-start border-b border-ink/15 lg:col-span-7 lg:col-start-6">
          {teamMembers.map((m, i) => (
            <MemberRow key={m.id} member={m} index={i} active={i === active} onActivate={() => setActive(i)} />
          ))}
        </ol>
      </div>
    </SlideFrame>
  )
}

function Portrait({ member, index }: { member: TeamMember; index: number }) {
  if (member.photo) {
    return <img src={member.photo} alt={member.name ?? ''} className="h-full w-full object-cover" />
  }
  return (
    <div className="relative h-full w-full bg-forest text-cream">
      {/* framing marks, like a contact sheet awaiting its print */}
      <span className="absolute top-1/2 left-1/2 h-px w-10 -translate-x-1/2 bg-cream/25" />
      <span className="absolute top-1/2 left-1/2 h-10 w-px -translate-y-1/2 bg-cream/25" />
      {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
        <span key={c} className={`absolute size-4 border-cream/40 ${c}`} />
      ))}
      <span className="type-label absolute top-6 left-6 opacity-60">{teamPlaceholders.photo}</span>
      <span className="absolute bottom-4 left-6 font-mono text-[clamp(3rem,7vw,6rem)] leading-none font-medium tracking-[-0.06em] text-lime">
        {pad(index + 1)}
      </span>
    </div>
  )
}

function MemberRow({ member, index, active, onActivate }: { member: TeamMember; index: number; active: boolean; onActivate: () => void }) {
  const name = member.name ?? teamPlaceholders.name
  const role = member.role ?? teamPlaceholders.role
  const bio = member.bio ?? teamPlaceholders.bio

  return (
    <motion.li
      className="border-t border-ink/15"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: SLIDE_CONTENT_DELAY + 0.45 + index * 0.08, ease: EASE_OUT_EXPO }}
    >
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,0.6fr)_auto] sm:gap-x-4 lg:py-[min(1.6vh,1rem)]">
        <span className={`type-index transition-colors duration-500 ${active ? 'text-forest' : 'opacity-45'}`}>{pad(index + 1)}</span>

        <button
          type="button"
          onMouseEnter={onActivate}
          onFocus={onActivate}
          onClick={onActivate}
          aria-expanded={active}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          {/* thumbnail on small screens, where the large portrait is hidden */}
          <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden bg-forest lg:hidden">
            {member.photo ? (
              <img src={member.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="font-mono text-xs text-lime">{pad(index + 1)}</span>
            )}
          </span>
          <span
            className={`truncate text-[clamp(1.25rem,min(2.3vw,3.9vh),2.4rem)] leading-tight font-semibold tracking-[-0.035em] transition-[color,transform] duration-500 ease-(--ease-out-expo) ${
              active ? 'translate-x-1 text-forest' : ''
            } ${member.name ? '' : 'opacity-40'}`}
          >
            {name}
          </span>
        </button>

        <span className={`type-label hidden truncate sm:block ${member.role ? 'opacity-70' : 'opacity-35'}`}>{role}</span>

        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — LinkedIn`}
            className="type-label flex items-center gap-1.5 border-b border-current pb-0.5 hover:text-forest"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="type-label flex items-center gap-1.5 opacity-30" aria-label={teamPlaceholders.linkedinMissing}>
            LinkedIn <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
            className="overflow-hidden"
          >
            <p className={`pb-4 pl-[3rem] text-[0.95rem] leading-snug sm:pl-[4rem] ${member.bio ? 'text-ink/70' : 'text-ink/40'}`}>
              <span className="type-label mr-3 opacity-60 sm:hidden">{role} —</span>
              {bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
