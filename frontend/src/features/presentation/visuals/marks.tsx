import { seeded } from './random'

/**
 * The community "alphabet": four marks standing for different skills.
 * Used on "Biz kimik?" (marks assembling into one structure) and on
 * "Bizə qoşul" (the same structure, with one place left open).
 */
export type MarkKind = 'dot' | 'square' | 'ring' | 'plus'
const KINDS: MarkKind[] = ['dot', 'square', 'ring', 'plus']

export interface MarkCell {
  col: number
  row: number
  kind: MarkKind
  /** Scatter offset + rotation for the "before" state. */
  dx: number
  dy: number
  rot: number
}

export function makeMarks(cols: number, rows: number, seed = 11, scatter = 160): MarkCell[] {
  const rand = seeded(seed)
  const cells: MarkCell[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({
        col,
        row,
        kind: KINDS[Math.floor(rand() * KINDS.length)]!,
        dx: (rand() - 0.5) * scatter * 2,
        dy: (rand() - 0.5) * scatter * 2,
        rot: (rand() - 0.5) * 180,
      })
    }
  }
  return cells
}

/** Draws one mark centred on (0,0); position it with a parent transform. */
export function Mark({ kind, size = 9 }: { kind: MarkKind; size?: number }) {
  const h = size / 2
  switch (kind) {
    case 'dot':
      return <circle r={h * 0.8} fill="currentColor" />
    case 'square':
      return <rect x={-h} y={-h} width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.4} />
    case 'ring':
      return <circle r={h} fill="none" stroke="currentColor" strokeWidth={1.4} />
    case 'plus':
      return <path d={`M ${-h} 0 H ${h} M 0 ${-h} V ${h}`} stroke="currentColor" strokeWidth={1.4} />
  }
}
