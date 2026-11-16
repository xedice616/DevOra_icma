import type { CSSProperties } from 'react'

/** Typed helper for passing CSS custom properties (e.g. `--dur`) through `style`. */
export const cssVars = (vars: Record<`--${string}`, string | number>): CSSProperties => vars as CSSProperties
