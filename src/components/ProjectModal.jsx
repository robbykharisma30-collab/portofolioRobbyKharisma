import { motion, AnimatePresence } from 'framer-motion'
import data from '../data'

export default function ProjectModal({ projectIndex, onClose }) {
  const project = data.projects[projectIndex]
  if (!project) return null

  return (
    <AnimatePresence>
      {projectIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50000,
            background: 'rgba(5,5,5,0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'pointer',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 700,
              width: '100%',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            <div style={{ position: 'relative' }}>
              {project.videoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '16 / 9', border: 'none', display: 'block' }}
                />
              ) : (
                <div
                  style={{
                    height: 280,
                    background: project.thumbGradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 30% 50%, ${project.accent}20, transparent 70%)`,
                    }}
                  />
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `${project.accent}30`,
                      border: `2px solid ${project.accent}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      position: 'relative',
                      zIndex: 1,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    ▶
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: '1.2rem',
                      left: '1.2rem',
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
                  </span>
                </div>
              )}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>
                {project.title}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.04)',
                      color: '#64748b',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 2rem',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg, #f59e0b, #b45309)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(245,158,11,0.25)',
                }}
              >
                View Project →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
