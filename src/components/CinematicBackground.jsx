import { useEffect, useRef } from 'react'

const C = {
  p: '245, 158, 11',
  s: '255, 184, 77',
  a: '255, 224, 163',
}

export default function CinematicBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const time = useRef(0)

  const isMobile = () => window.innerWidth < 768

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let isActive = true

    const onVisibility = () => {
      isActive = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onMouse = (e) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', onMouse)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const mobile = isMobile()
    const particles = []
    const pLayers = [
      { z: 0.2, n: mobile ? 12 : 30, minS: 1, maxS: 3, minA: 0.04, maxA: 0.12, blur: 0, spd: 0.15 },
      { z: 0.5, n: mobile ? 8 : 20, minS: 3, maxS: 7, minA: 0.025, maxA: 0.08, blur: 3, spd: 0.1 },
      { z: 0.8, n: mobile ? 4 : 10, minS: 6, maxS: 15, minA: 0.015, maxA: 0.05, blur: 6, spd: 0.06 },
    ]
    pLayers.forEach((l) => {
      for (let i = 0; i < l.n; i++) {
        particles.push({
          x: Math.random() * (canvas.width + 400) - 200,
          y: Math.random() * (canvas.height + 400) - 200,
          s: l.minS + Math.random() * (l.maxS - l.minS),
          a: l.minA + Math.random() * (l.maxA - l.minA),
          b: l.blur,
          vx: (Math.random() - 0.5) * l.spd * 0.4,
          vy: -Math.random() * l.spd * 0.25 - 0.02,
          d: Math.random() * Math.PI * 2,
          ds: 0.003 + Math.random() * 0.008,
          z: l.z,
          hue: Math.random() > 0.5 ? 0 : 1,
        })
      }
    })

    const bokehs = Array.from({ length: mobile ? 4 : 12 }, () => ({
      x: Math.random() * (canvas.width + 300) - 150,
      y: Math.random() * (canvas.height + 300) - 150,
      r: 20 + Math.random() * 60,
      a: 0.02 + Math.random() * 0.05,
      vy: -(0.1 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.1,
      c: Math.random() > 0.5 ? C.p : C.s,
      p: Math.random() * Math.PI * 2,
      ps: 0.005 + Math.random() * 0.01,
    }))

    const rays = Array.from({ length: mobile ? 1 : 3 }, () => ({
      x: canvas.width * (0.2 + Math.random() * 0.6),
      y: -150,
      a: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
      w: 30 + Math.random() * 60,
      h: canvas.height * (0.5 + Math.random() * 0.4),
      alpha: 0.015 + Math.random() * 0.03,
      spd: 0.1 + Math.random() * 0.2,
    }))

    let flare = null
    let flareTimer = 300

    const draw = () => {
      if (!isActive) {
        animId = requestAnimationFrame(draw)
        return
      }
      time.current += 0.016
      const t = time.current
      const mx = mouse.current.x
      const my = mouse.current.y
      const px = (mx - 0.5) * 12
      const py = (my - 0.5) * 8
      const cx = Math.sin(t * 0.02) * 8 + px
      const cy = Math.sin(t * 0.015) * 5 + py

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Canvas is transparent — video plays behind it
      // Only draw subtle ambient glow overlay
      const ag = ctx.createRadialGradient(
        canvas.width * (0.5 + cx * 0.008), canvas.height * 0.3, 0,
        canvas.width * (0.5 + cx * 0.008), canvas.height * 0.3, canvas.width * 0.7
      )
      ag.addColorStop(0, 'rgba(255, 184, 77, 0.04)')
      ag.addColorStop(0.3, 'rgba(245, 158, 11, 0.02)')
      ag.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // === PARTICLES ===
      const zoom = 1 + Math.sin(t * 0.01) * 0.002
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(zoom, zoom)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      particles.forEach((p) => {
        p.d += p.ds
        p.x += p.vx + Math.sin(p.d) * 0.12
        p.y += p.vy
        const m = 250
        if (p.x < -m) p.x = canvas.width + m
        if (p.x > canvas.width + m) p.x = -m
        if (p.y < -m) p.y = canvas.height + m
        if (p.y > canvas.height + m) p.y = -m

        const px2 = p.x + cx * p.z * 0.6
        const py2 = p.y + cy * p.z * 0.4
        const col = p.hue ? C.s : C.p
        const a = p.a * (0.7 + 0.3 * Math.sin(p.d))

        ctx.save()
        if (p.b > 0) {
          ctx.shadowBlur = p.b * 4
          ctx.shadowColor = `rgba(${col}, ${a * 0.4})`
        }
        ctx.beginPath()
        ctx.arc(px2, py2, p.s * zoom, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col}, ${a})`
        ctx.fill()
        ctx.restore()
      })
      ctx.restore()

      // === BOKEH ===
      bokehs.forEach((b) => {
        b.p += b.ps
        b.y += b.vy
        b.x += b.vx + Math.sin(t * 0.1 + b.p) * 0.15
        if (b.y < -150) { b.y = canvas.height + 80; b.x = Math.random() * canvas.width }
        if (b.x < -150 || b.x > canvas.width + 150) b.x = Math.random() * canvas.width

        const bx = b.x + cx * 0.2
        const by = b.y + cy * 0.15
        const pa = b.a * (0.5 + 0.5 * Math.sin(b.p))

        ctx.save()
        ctx.filter = `blur(${4 + 3 * Math.sin(b.p)}px)`
        const bg2 = ctx.createRadialGradient(bx, by, 0, bx, by, b.r)
        bg2.addColorStop(0, `rgba(${b.c}, ${pa * 0.5})`)
        bg2.addColorStop(0.4, `rgba(${b.c}, ${pa * 0.12})`)
        bg2.addColorStop(1, `rgba(${b.c}, 0)`)
        ctx.fillStyle = bg2
        ctx.beginPath()
        ctx.arc(bx, by, b.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // === LIGHT RAYS ===
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      rays.forEach((ray) => {
        ray.x -= ray.spd
        if (ray.x < -400) { ray.x = canvas.width + 200; ray.y = -100 + Math.random() * 150 }
        if (ray.x > canvas.width + 400) ray.x = -200

        ctx.save()
        ctx.translate(ray.x + cx * 0.15, ray.y + cy * 0.1)
        ctx.rotate(ray.a + Math.sin(t * 0.1) * 0.02)
        const ra = ray.alpha * (0.6 + 0.4 * Math.sin(t * 0.3 + ray.x * 0.005))
        ctx.globalAlpha = ra

        const lg2 = ctx.createLinearGradient(0, -ray.w / 2, 0, ray.w / 2)
        lg2.addColorStop(0, 'rgba(255, 224, 163, 0)')
        lg2.addColorStop(0.2, `rgba(245, 158, 11, ${ra * 2})`)
        lg2.addColorStop(0.5, 'rgba(255, 224, 163, 0.02)')
        lg2.addColorStop(0.8, `rgba(245, 158, 11, ${ra * 2})`)
        lg2.addColorStop(1, 'rgba(255, 224, 163, 0)')
        ctx.fillStyle = lg2

        const blur = 6 + 6 * Math.sin(t * 0.2 + ray.x * 0.006)
        ctx.filter = `blur(${blur}px)`
        ctx.fillRect(0, -ray.w / 2, ray.h, ray.w)
        ctx.restore()
      })
      ctx.restore()

      // LENS FLARE
      flareTimer++
      if (flareTimer > 500 + Math.random() * 600) {
        flare = {
          x: 0.1 + Math.random() * 0.8,
          y: 0.05 + Math.random() * 0.3,
          a: 0.1 + Math.random() * 0.15,
          s: 0.06 + Math.random() * 0.1,
          life: 0,
          max: 60 + Math.random() * 40,
        }
        flareTimer = 0
      }

      if (flare) {
        flare.life++
        const pct = flare.life / flare.max
        if (pct >= 1) { flare = null }
        else {
          const fa = flare.a * Math.sin(pct * Math.PI)
          const fx = flare.x * canvas.width
          const fy = flare.y * canvas.height

          const fg1 = ctx.createRadialGradient(fx, fy, 0, fx, fy, flare.s * canvas.width * 0.3)
          fg1.addColorStop(0, `rgba(255, 224, 163, ${fa})`)
          fg1.addColorStop(0.1, `rgba(255, 224, 163, ${fa * 0.4})`)
          fg1.addColorStop(0.3, `rgba(245, 158, 11, ${fa * 0.12})`)
          fg1.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.save()
          ctx.filter = 'blur(2px)'
          ctx.fillStyle = fg1
          ctx.beginPath()
          ctx.arc(fx, fy, flare.s * canvas.width * 0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }

      // Dark vignette overlay for readability
      const vg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.85
      )
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(0.4, 'rgba(0,0,0,0)')
      vg.addColorStop(0.7, 'rgba(0,0,0,0.15)')
      vg.addColorStop(1, 'rgba(0,0,0,0.5)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <>
      <video
        autoPlay loop muted playsInline
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          objectFit: 'cover',
          filter: 'blur(20px)',
          opacity: 0.35,
          transform: 'scale(1.1)',
          zIndex: -2,
        }}
        src="/background.mp4"
      />
      <div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, transparent 80%)
          `,
          pointerEvents: 'none',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
    </>
  )
}
