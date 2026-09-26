import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TextReveal from './TextReveal'
import CertificateModal from './CertificateModal'

const certificates = data.certificates

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCert, setActiveCert] = useState(null)

  return (
    <section id="certificates" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Certificates
        </motion.span>

        <TextReveal
          as="p"
          delay={0.15}
          className="section-subtitle"
          style={{ marginBottom: '3.5rem' }}
        >
          Licenses, certifications, and achievements — click any card to view the original document.
        </TextReveal>

        <div className="grid-auto-320" style={{ gap: '1.5rem' }}>
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.title}
              type="button"
              onClick={() => setActiveCert(cert)}
              aria-label={`View certificate: ${cert.title}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -6 }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: 0,
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 10',
                  background: 'rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '0.75rem',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '0.7rem',
                    color: '#fbbf24',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  PDF
                </span>
              </div>

              <div style={{ padding: '1.25rem 1.4rem 1.4rem' }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    marginBottom: '0.5rem',
                  }}
                >
                  {cert.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                  {cert.issuer}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  {cert.date && (
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{cert.date}</span>
                  )}
                  {cert.credentialId && (
                    <span
                      style={{
                        color: '#475569',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '55%',
                      }}
                    >
                      {cert.credentialId}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}
