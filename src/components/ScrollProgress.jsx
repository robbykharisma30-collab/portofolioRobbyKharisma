import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100000,
        transformOrigin: 'left',
        scaleX,
        background: 'linear-gradient(90deg, #f59e0b, #ffb84d, #f59e0b)',
        boxShadow: '0 0 10px rgba(245,158,11,0.4)',
      }}
    />
  )
}
