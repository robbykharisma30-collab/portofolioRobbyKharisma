import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TextReveal from './TextReveal'

function useCountUp(target, isInView) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(target, Math.round(increment * step))
      setCount(current)
      if (current >= target) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return count
}

function StatItem({ value, label, isInView }) {
  const numericMatch = value.match(/[\d.]+/g)
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : 0
  const suffix = value.includes('K+') ? 'K+' : value.includes('+') ? '+' : ''

  const actualTarget = suffix.includes('K') ? numeric * 1000 : numeric
  const count = useCountUp(actualTarget, isInView)

  const display = suffix.includes('K')
    ? Math.round(count / 100) / 10 + 'K+'
    : suffix === '+'
      ? count + '+'
      : count

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.3rem' }}>
        <span className="gradient-text">{display}</span>
      </div>
      <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { initials, aboutParagraph1, aboutParagraph2, aboutTags } = data.personal
  const stats = data.stats

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          About Me
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          The Story Behind <span className="gradient-text">the Content</span>
        </motion.h2>

        <div className="grid-2" style={{ alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: 20,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(180,83,9,0.15))',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '60%',
                  height: '80%',
                  borderRadius: 12,
                  background: 'radial-gradient(circle, rgba(245,158,11,0.2), transparent)',
                  top: '10%',
                  left: '20%',
                  filter: 'blur(50px)',
                }}
              />
              <img
                src="/profile.webp"
                alt={initials}
                loading="lazy"
                style={{
                  width: '70%',
                  aspectRatio: '3/4',
                  borderRadius: 12,
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  position: 'relative',
                  zIndex: 1,
                  border: '2px solid rgba(245,158,11,0.25)',
                  boxShadow: '0 0 40px rgba(245,158,11,0.2)',
                }}
              />
              <p
                style={{
                  position: 'absolute',
                  bottom: '1.2rem',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  zIndex: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                {data.personal.role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <TextReveal
              as="p"
              delay={0.1}
              style={{
                color: '#94a3b8',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              {aboutParagraph1}
            </TextReveal>
            <TextReveal
              as="p"
              delay={0.3}
              style={{
                color: '#94a3b8',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
              }}
            >
              {aboutParagraph2}
            </TextReveal>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {aboutTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: 50,
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    color: '#f59e0b',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid-4"
          style={{
            marginTop: '5rem',
            padding: '2.5rem',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
