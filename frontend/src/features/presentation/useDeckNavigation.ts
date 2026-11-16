import { useCallback, useEffect, useState, type RefObject } from 'react'

export type Direction = 1 | -1

const clamp = (value: number, count: number) => Math.min(Math.max(value, 0), count - 1)

/** Reads `#/3` → index 2. Falls back to the first slide. */
function readHash(count: number): number {
  const match = /^#\/(\d+)$/.exec(window.location.hash)
  return match ? clamp(Number(match[1]) - 1, count) : 0
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * Slide index state with keyboard navigation and a shareable URL hash.
 */
export function useDeckNavigation(count: number) {
  const [state, setState] = useState<{ index: number; direction: Direction }>(() => ({
    index: readHash(count),
    direction: 1,
  }))

  const goTo = useCallback(
    (target: number) =>
      setState((s) => {
        const index = clamp(target, count)
        return index === s.index ? s : { index, direction: index > s.index ? 1 : -1 }
      }),
    [count],
  )

  const next = useCallback(() => setState((s) => (s.index >= count - 1 ? s : { index: s.index + 1, direction: 1 })), [count])
  const prev = useCallback(() => setState((s) => (s.index <= 0 ? s : { index: s.index - 1, direction: -1 })), [])

  // Keyboard: ← → (plus PageUp/PageDown, Space, Home, End for presenters and clickers).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isTypingTarget(e.target)) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case ' ':
          // Let Space activate a focused button; otherwise advance.
          if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement) return
          e.preventDefault()
          if (e.shiftKey) prev()
          else next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(count - 1)
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev, goTo, count])

  // Keep the URL in sync so a slide can be linked to and survives refresh.
  useEffect(() => {
    const hash = `#/${state.index + 1}`
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
  }, [state.index])

  useEffect(() => {
    const onHashChange = () => goTo(readHash(count))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [goTo, count])

  return {
    index: state.index,
    direction: state.direction,
    goTo,
    next,
    prev,
    isFirst: state.index === 0,
    isLast: state.index === count - 1,
  }
}

/**
 * Horizontal swipe on touch devices. Vertical scrolling inside a slide is left
 * alone; elements marked `data-no-swipe` opt out entirely.
 */
export function useSwipe(ref: RefObject<HTMLElement | null>, onNext: () => void, onPrev: () => void) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start: { x: number; y: number; t: number } | null = null

    const onStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (e.touches.length !== 1 || !touch) return
      if (e.target instanceof Element && e.target.closest('[data-no-swipe]')) return
      start = { x: touch.clientX, y: touch.clientY, t: performance.now() }
    }
    const onEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      if (!start || !touch) return
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      const fast = performance.now() - start.t < 600
      start = null
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.4 || !fast) return
      if (dx < 0) onNext()
      else onPrev()
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [ref, onNext, onPrev])
}
