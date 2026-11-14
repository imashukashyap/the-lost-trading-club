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
    <div className="relative min-h-screen bg-[#060709] text-[#e2e2e7] selection:bg-[#d4af37]/20 selection:text-[#f3e5ab]">
      {/* Global Subtle Cinematic Background Noise / Radial Gradient (GPU Composited) */}
      <div
        className="fixed inset-0 bg-radial-glow pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />
      <div
        className="fixed inset-0 bg-radial-ambient pointer-events-none"
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
