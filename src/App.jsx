import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Referrals from './components/Referrals'
import Connect from './components/Connect'
import Support from './components/Support'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#060709] text-[#0f172a] dark:text-[#e2e2e7] selection:bg-blue-600/20 selection:text-blue-900 dark:selection:bg-[#d4af37]/20 dark:selection:text-[#f3e5ab] transition-colors duration-300">
      {/* Global Subtle Cinematic Background Noise / Radial Gradient (GPU Composited) */}
      <div
        className="fixed inset-0 bg-radial-glow pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Main Structural Layout */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Referrals />
        <Connect />
        <Support />
      </main>
      <Footer />
    </div>
  )
}
