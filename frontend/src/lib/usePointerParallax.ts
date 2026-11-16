import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'

/**
 * Subtle depth: returns spring-smoothed x/y offsets (in px) that follow the
 * pointer across the viewport. Disabled for touch and reduced motion.
 */
export function usePointerParallax(strength = 12): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2 * strength)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2 * strength)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, strength, rawX, rawY])

  return { x, y }
}
