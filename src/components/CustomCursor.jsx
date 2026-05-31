import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const isTouch = useRef(
    'ontouchstart' in window || navigator.maxTouchPoints > 0
  )

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 15 })
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    if (isTouch.current) return

    const onMouse = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [cursorX, cursorY])

  if (isTouch.current) return null

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#f59e0b',
          pointerEvents: 'none',
          zIndex: 99999,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px rgba(245,158,11,0.6)',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(245,158,11,0.3)',
          pointerEvents: 'none',
          zIndex: 99998,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
