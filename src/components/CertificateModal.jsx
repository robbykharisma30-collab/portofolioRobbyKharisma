import { motion, AnimatePresence } from 'framer-motion'

const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.7rem 1.5rem',
  borderRadius: 50,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  textDecoration: 'none',
}

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null

  return (
    <AnimatePresence>
      {cert && (
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
            background: 'rgba(5,5,5,0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--modal-pad)',
            cursor: 'pointer',
          }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 900,
              width: '100%',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 24,
              background: 'rgba(15,15,20,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              cursor: 'default',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {cert.pdf ? (
                <iframe
                  src={cert.pdf}
                  title={cert.title}
                  style={{
                    width: '100%',
                    height: 'min(68vh, 620px)',
                    border: 'none',
                    display: 'block',
                    background: '#fff',
                  }}
                />
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: '100%', display: 'block', objectFit: 'contain' }}
                />
              )}
              <button
                onClick={onClose}
                aria-label="Close certificate"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.15)',
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

            <div style={{ padding: '1.5rem 2rem 1.75rem', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {cert.title}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                {cert.issuer}
                {cert.date ? ` — ${cert.date}` : ''}
              </p>

              {cert.credentialId && (
                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.8rem',
                    color: '#64748b',
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                  }}
                >
                  No. {cert.credentialId}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginTop: '1.5rem',
                }}
              >
                {cert.pdf && (
                  <>
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...btnBase,
                        background: 'linear-gradient(135deg, #f59e0b, #b45309)',
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(245,158,11,0.25)',
                      }}
                    >
                      Open in new tab ↗
                    </a>
                    <a
                      href={cert.pdf}
                      download
                      style={{
                        ...btnBase,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#e2e8f0',
                      }}
                    >
                      Download ↓
                    </a>
                  </>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...btnBase,
                      background: 'transparent',
                      border: '1px solid rgba(245,158,11,0.5)',
                      color: '#f59e0b',
                    }}
                  >
                    Verify credential ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
