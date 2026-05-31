export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding: '2rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          © {year} Robby Kharisma Maulana.
        </p>
      </div>
    </footer>
  )
}
