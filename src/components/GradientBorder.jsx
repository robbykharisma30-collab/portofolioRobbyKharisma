export default function GradientBorder({ children, style, ...props }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      <div
        className="gradient-border-anim"
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 21,
          background: 'conic-gradient(from var(--angle), transparent, rgba(245,158,11,0.3), transparent, rgba(255,184,77,0.2), transparent)',
          zIndex: 0,
          animation: 'spin-border 4s linear infinite',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}
