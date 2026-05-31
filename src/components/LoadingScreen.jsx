import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '../data'

export default function LoadingScreen({ onFinish }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(() => onFinish?.(), 600)
    }, 2200)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 900, letterSpacing: '-4px' }}
          >
            <span className="gradient-text">{data.personal.initials}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '1rem', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            {data.personal.role}
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeInOut' }}
            style={{
              width: 120,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
              marginTop: '2rem',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
