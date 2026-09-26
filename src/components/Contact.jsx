import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '../data'
import TextReveal from './TextReveal'

const socials = data.socials

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkjgqgpl'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [notice, setNotice] = useState('')
  const { email, location, availability } = data.personal

  const buildMailto = () => {
    const subject = `Portfolio Contact from ${formData.name}`
    const body = `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const postToFormspree = async () => {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      return res.ok
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setNotice('')

    const openMailClient = (message) => {
      setNotice(message)
      window.location.href = buildMailto()
    }

    if (!FORMSPREE_ENDPOINT) {
      openMailClient('Opening your email app to send this message...')
      setSending(false)
      return
    }

    if (await postToFormspree()) {
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } else {
      openMailClient('Could not send automatically, opening your email app instead...')
    }

    setSending(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  }

  const inputFocus = (e) => {
    e.target.style.borderColor = '#f59e0b'
    e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'
  }
  const inputBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" ref={ref}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Get in Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Let&apos;s Create <span className="gradient-text">Together</span>
        </motion.h2>

        <TextReveal
          as="p"
          delay={0.15}
          className="section-subtitle"
          style={{ marginBottom: '3rem' }}
        >
          Got a project in mind? Let&apos;s make something amazing.
        </TextReveal>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              padding: '2.5rem',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Name
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            {notice && (
              <p style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '1rem' }}>{notice}</p>
            )}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 12,
                background: sending
                  ? 'rgba(245,158,11,0.5)'
                  : 'linear-gradient(135deg, #f59e0b, #b45309)',
                color: '#fff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: sending ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(245,158,11,0.2)',
                transition: 'background 0.3s',
              }}
            >
              {sending ? '✉ Sending...' : sent ? '✓ Message Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              style={{
                padding: '2.5rem',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Contact Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Email', value: email },
                  { label: 'Location', value: location },
                  { label: 'Availability', value: availability },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        color: '#64748b',
                        fontSize: '0.85rem',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ color: '#e2e8f0', fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '2.5rem',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                Follow Me
              </h3>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {socials.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1.2rem',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.handle}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
