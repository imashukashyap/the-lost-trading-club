import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Referrals from './components/Referrals'
import Connect from './components/Connect'
import Support from './components/Support'
import Footer from './components/Footer'
import HowToJoin from './components/HowToJoin'

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      if (
        path === '/how-to-join' ||
        path === '/how-to-join/' ||
        hash === '#how-to-join' ||
        hash === '#/how-to-join'
      ) {
        return 'how-to-join'
      }
    }
    return 'home'
  })

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      if (
        path === '/how-to-join' ||
        path === '/how-to-join/' ||
        hash === '#how-to-join' ||
        hash === '#/how-to-join'
      ) {
        setCurrentPage('how-to-join')
        window.scrollTo(0, 0)
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (page, sectionId = '') => {
    if (page === 'how-to-join') {
      window.history.pushState({}, '', '/how-to-join')
      setCurrentPage('how-to-join')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.history.pushState({}, '', '/' + (sectionId ? sectionId : ''))
      setCurrentPage('home')
      if (sectionId) {
        setTimeout(() => {
          const el = document.querySelector(sectionId)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 60)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#060709] text-[#0f172a] dark:text-[#e2e2e7] selection:bg-blue-600/20 selection:text-blue-900 dark:selection:bg-[#d4af37]/20 dark:selection:text-[#f3e5ab] transition-colors duration-300">
      {/* Global Subtle Cinematic Background Noise / Radial Gradient (GPU Composited) */}
      <div
        className="fixed inset-0 bg-radial-glow pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Main Structural Layout */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main>
        {currentPage === 'how-to-join' ? (
          <HowToJoin onNavigate={navigateTo} />
        ) : (
          <>
            <Hero onNavigateToHowToJoin={() => navigateTo('how-to-join')} />
            <About />
            <Referrals />
            <Connect />
            <Support />
          </>
        )}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  )
}
