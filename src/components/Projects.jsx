import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TiltCard from './TiltCard'
import GradientBorder from './GradientBorder'
import ProjectModal from './ProjectModal'
import TextReveal from './TextReveal'

const projects = data.projects

const THUMB_SD_MAX = 45
const THUMB_CENTER_MIN = 140
const THUMB_SAMPLE_TARGET = 20000
const THUMB_ANALYSIS_WIDTH = 160

const isPlaceholderThumb = (img) => {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (!w || !h) return false
  try {
    const tw = THUMB_ANALYSIS_WIDTH
    const th = Math.max(1, Math.round((h / w) * tw))
    const canvas = document.createElement('canvas')
    canvas.width = tw
    canvas.height = th
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, tw, th)
    const { data } = ctx.getImageData(0, 0, tw, th)
    const step = Math.max(1, Math.round(Math.sqrt((tw * th) / THUMB_SAMPLE_TARGET)))
    const x0 = tw * 0.35
    const x1 = tw * 0.65
    const y0 = th * 0.35
    const y1 = th * 0.65
    let sum = 0
    let sumSq = 0
    let count = 0
    let centerSum = 0
    let centerCount = 0
    for (let y = 0; y < th; y += step) {
      for (let x = 0; x < tw; x += step) {
        const i = (y * tw + x) * 4
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        sum += lum
        sumSq += lum * lum
        count++
        if (x > x0 && x < x1 && y > y0 && y < y1) {
          centerSum += lum
          centerCount++
        }
      }
    }
    const mean = sum / count
    const sd = Math.sqrt(Math.max(0, sumSq / count - mean * mean))
    return sd < THUMB_SD_MAX && centerSum / centerCount > THUMB_CENTER_MIN
  } catch {
    return false
  }
}

const stepDownOrHide = (img, videoId) => {
  if (img.dataset.res === 'mq') {
    img.style.display = 'none'
    return
  }
  img.dataset.res = 'mq'
  img.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [modalIndex, setModalIndex] = useState(null)

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Portfolio
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <TextReveal
          as="p"
          delay={0.15}
          className="section-subtitle"
          style={{ marginBottom: '3rem' }}
        >
          Each project is a unique story. Here are some of my favorite creations.
        </TextReveal>

        <div className="grid-auto-320" style={{ gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <GradientBorder>
                <TiltCard
                  style={{ cursor: 'pointer' }}
                  onClick={() => setModalIndex(i)}
                >
                  <div
                    style={{
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.02)',
                      overflow: 'hidden',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${project.accent}40`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                  >
                    <div
                      style={{
                        height: 200,
                        background: project.thumbGradient,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {project.videoId && (
                        <img
                          src={`https://i.ytimg.com/vi/${project.videoId}/maxresdefault.jpg`}
                          alt={project.title}
                          loading="lazy"
                          crossOrigin="anonymous"
                          onLoad={(e) => {
                            if (isPlaceholderThumb(e.currentTarget)) {
                              stepDownOrHide(e.currentTarget, project.videoId)
                            }
                          }}
                          onError={(e) => stepDownOrHide(e.currentTarget, project.videoId)}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: project.videoId
                            ? 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)'
                            : `radial-gradient(circle at 30% 50%, ${project.accent}15, transparent 70%)`,
                        }}
                      />
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `${project.accent}30`,
                          border: `2px solid ${project.accent}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          position: 'relative',
                          zIndex: 1,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        ▶
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          padding: '0.3rem 0.8rem',
                          borderRadius: 6,
                          background: `${project.accent}30`,
                          backdropFilter: 'blur(4px)',
                          fontSize: '0.75rem',
                          color: project.accent,
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {project.category}
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3
                        style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          marginBottom: '0.6rem',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: 4,
                              background: 'rgba(255,255,255,0.04)',
                              color: '#64748b',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: project.accent,
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        View Project →
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </GradientBorder>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal projectIndex={modalIndex} onClose={() => setModalIndex(null)} />
    </section>
  )
}
