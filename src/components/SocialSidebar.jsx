import { motion } from 'framer-motion'
import data from '../data'

export default function SocialSidebar() {
  const socials = data.socials

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      style={{
        position: 'fixed',
        left: '1.5rem',
        bottom: '50%',
        transform: 'translateY(50%)',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
      }}
      className="social-sidebar"
    >
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, color: '#f59e0b', y: -2 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)',
            transition: 'color 0.2s, background 0.2s',
          }}
        >
          {s.icon}
        </motion.a>
      ))}
      <div style={{
        width: 1,
        height: 60,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent)',
        margin: '0.3rem auto 0',
      }} />
    </motion.div>
  )
}
