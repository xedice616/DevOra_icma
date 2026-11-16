import { Reveal } from './Reveal'

interface KickerProps {
  index: number
  label: string
  className?: string
}

/** Section marker: "02 ⁄ Niyə DevOra?" — inherits colour from its slide. */
export function Kicker({ index, label, className = '' }: KickerProps) {
  return (
    <Reveal y={8} className={`flex items-center gap-3 ${className}`}>
      <span className="type-index">{String(index).padStart(2, '0')}</span>
      <span className="h-3 w-px rotate-[20deg] bg-current opacity-50" aria-hidden="true" />
      <span className="type-label opacity-70">{label}</span>
    </Reveal>
  )
}
