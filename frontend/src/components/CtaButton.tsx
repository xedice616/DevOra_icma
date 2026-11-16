type Tone = 'lime' | 'ink' | 'cream'
type Size = 'sm' | 'lg'

interface CtaButtonProps {
  label: string
  onClick: () => void
  tone?: Tone
  size?: Size
  className?: string
}

const tones: Record<Tone, string> = {
  lime: 'bg-lime text-ink',
  ink: 'bg-ink text-cream',
  cream: 'bg-cream text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 gap-3 pl-4 pr-3 type-label !text-[0.68rem]',
  lg: 'h-16 gap-6 pl-7 pr-5 text-[0.95rem] font-semibold tracking-[0.12em] uppercase sm:h-[4.5rem] sm:pl-9 sm:pr-6 sm:text-base',
}

/**
 * Primary call to action. Sharp-edged on purpose: the brand's softness lives
 * in the circular logo, everything around it is cut square.
 */
export function CtaButton({ label, onClick, tone = 'lime', size = 'sm', className = '' }: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center overflow-hidden whitespace-nowrap ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {/* hover: a forest panel slides in from the left */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-forest transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-0"
      />
      <span className="relative transition-colors duration-500 group-hover:text-cream">{label}</span>
      <span
        aria-hidden="true"
        className={`relative grid place-items-center transition-colors duration-500 group-hover:text-lime ${size === 'lg' ? 'size-8' : 'size-5'}`}
      >
        <svg viewBox="0 0 20 20" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M5 15 15 5M7 5h8v8" className="transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-px group-hover:-translate-y-px" />
        </svg>
      </span>
    </button>
  )
}
