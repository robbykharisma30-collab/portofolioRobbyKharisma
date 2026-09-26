import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import data from '../data'

const floatAnimation = {
  initial: { opacity: 0, y: 60 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' },
  }),
}

function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40)
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, words])

  return words[wordIndex].slice(0, charIndex)
}

export default function Hero() {
  const { tagline, headline, subheadline, roles } = data.personal
  const typedText = useTypewriter(roles)

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(180,83,9,0.06) 0%, transparent 60%), radial-gradient(ellipse at 50% 0%, rgba(255,184,77,0.04) 0%, transparent 50%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          custom={0}
          style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: 100,
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#f59e0b',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          {tagline.replace('✦ ', '')} ✦ {typedText}
          <span className="cursor-blink" style={{ color: '#f59e0b' }}>|</span>
        </motion.div>

        <motion.h1
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          custom={1}
          style={{
            fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '1.5rem',
          }}
        >
          {headline[0]} <span className="gradient-text">{headline[1]}</span>
          <br />
          {headline[2]}
        </motion.h1>

        <motion.p
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          custom={2}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: 600,
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          custom={3}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #f59e0b, #b45309)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 25px rgba(245,158,11,0.3)',
              display: 'inline-block',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: 50,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              display: 'inline-block',
            }}
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#64748b',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '1.2rem' }}
        >
          ↓
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #home { padding: 6rem 1.2rem 3rem !important; }
          #home h1 { font-size: clamp(2rem, 10vw, 2.8rem) !important; }
        }
        @media (max-width: 480px) {
          #home { padding: 5rem 1rem 2rem !important; }
        }
      `}</style>
    </section>
  )
}
