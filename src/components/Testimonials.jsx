import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TiltCard from './TiltCard'
import TextReveal from './TextReveal'

const testimonials = data.testimonials

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Testimonials
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          What <span className="gradient-text">Clients</span> Say
        </motion.h2>

        <TextReveal
          as="p"
          delay={0.15}
          className="section-subtitle"
          style={{ marginBottom: '3rem' }}
        >
          Real words from real people I&apos;ve had the pleasure of working with.
        </TextReveal>

        <div className="grid-auto-320" style={{ gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <TiltCard
                style={{
                  padding: 'var(--card-pad)',
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.2rem',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `${t.color}20`,
                      border: `2px solid ${t.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: t.color,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{t.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t.role}</div>
                  </div>
                </div>
                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
