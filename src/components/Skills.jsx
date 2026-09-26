import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TiltCard from './TiltCard'
import TextReveal from './TextReveal'

const skillCategories = data.skills

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Skills & Expertise
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Tools of the <span className="gradient-text">Trade</span>
        </motion.h2>

        <TextReveal
          as="p"
          delay={0.15}
          className="section-subtitle"
          style={{ marginBottom: '3.5rem' }}
        >
          From concept to final cut, here&apos;s what I bring to the table.
        </TextReveal>

        <div className="grid-auto-280" style={{ gap: '1.5rem' }}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
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
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: `${cat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    marginBottom: '1.2rem',
                  }}
                >
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.4rem',
                        }}
                      >
                        <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{skill.name}</span>
                        <span style={{ color: cat.color, fontSize: '0.8rem', fontWeight: 600 }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: 6,
                          borderRadius: 3,
                          background: 'rgba(255,255,255,0.06)',
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            borderRadius: 3,
                            background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                            boxShadow: `0 0 10px ${cat.color}40`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
