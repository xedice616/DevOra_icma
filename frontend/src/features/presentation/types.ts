import type { ComponentType } from 'react'

/** Drives the colour of the persistent chrome (top bar, controls) on each slide. */
export type SlideTheme = 'dark' | 'light'

export interface SlideProps {
  onJoin: () => void
}

export interface SlideDefinition {
  id: string
  /** Short label for the top bar and screen readers. */
  label: string
  theme: SlideTheme
  Component: ComponentType<SlideProps>
}
