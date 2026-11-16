import { brand } from '../content/brand'

interface LogoBadgeProps {
  className?: string
  /** Decorative uses (e.g. the top bar next to the wordmark) hide the alt text. */
  decorative?: boolean
  priority?: boolean
}

/**
 * The official circular DevOra badge. The source artwork is a round emblem on
 * a cream field, so it is shown inside a circle — the artwork itself is untouched.
 */
export function LogoBadge({ className = '', decorative = false, priority = false }: LogoBadgeProps) {
  return (
    <img
      src={brand.logo.src}
      alt={decorative ? '' : brand.logo.alt}
      width={1254}
      height={1254}
      draggable={false}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`aspect-square select-none rounded-full object-cover ${className}`}
    />
  )
}
