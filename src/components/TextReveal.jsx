import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({ children, as: Tag = 'p', delay = 0, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  return (
    <Tag ref={ref} {...props}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word + ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
