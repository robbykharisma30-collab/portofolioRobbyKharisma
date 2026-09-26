import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import CinematicBackground from './components/CinematicBackground'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import SocialSidebar from './components/SocialSidebar'

function SectionDivider({ flip }) {
  return (
    <div
      style={{
        height: 80,
        marginTop: -1,
        pointerEvents: 'none',
        background: flip
          ? 'linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.02) 50%, transparent 100%)'
          : 'linear-gradient(0deg, transparent 0%, rgba(245,158,11,0.02) 50%, transparent 100%)',
      }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [lenisReady, setLenisReady] = useState(false)

  useEffect(() => {
    if (!loading) {
      import('lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
        })
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
        setLenisReady(true)
      })
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
            <LoadingScreen onFinish={() => setLoading(false)} />
          </div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <CinematicBackground />
          <Navbar />
          <SocialSidebar />
          <main>
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider flip />
            <Projects />
            <SectionDivider />
            <Certificates />
            <SectionDivider flip />
            <Skills />
            <SectionDivider flip />
            <Testimonials />
            <SectionDivider />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  )
}
