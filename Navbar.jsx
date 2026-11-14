import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const scrolledRef = useRef(false)
  const activeSectionRef = useRef('Home')
  const shouldReduceMotion = useReducedMotion()

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Referrals', href: '#referrals', id: 'referrals' },
    { name: 'Connect', href: '#connect', id: 'connect' },
    { name: 'Support', href: '#support', id: 'support' },
  ]

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY

          // 1. Background blur threshold
          const isScrolled = scrollY > 30
          if (isScrolled !== scrolledRef.current) {
            scrolledRef.current = isScrolled
            setScrolled(isScrolled)
          }

          // 2. Scroll-spy for active navigation item
          if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
            if (activeSectionRef.current !== 'Support') {
              activeSectionRef.current = 'Support'
              setActiveSection('Support')
            }
          } else {
            let current = 'Home'
            for (let i = navLinks.length - 1; i >= 0; i--) {
              const el = document.getElementById(navLinks[i].id)
              if (el) {
                const rect = el.getBoundingClientRect()
                if (rect.top <= window.innerHeight * 0.38) {
                  current = navLinks[i].name
                  break
                }
              }
            }
            if (activeSectionRef.current !== current) {
              activeSectionRef.current = current
              setActiveSection(current)
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMobileOpen(false)
    activeSectionRef.current = link.name
    setActiveSection(link.name)
    const element = document.querySelector(link.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060709]/80 backdrop-blur-xl border-b border-white/[0.04] py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, navLinks[0])}
          className="flex items-center gap-3 group"
        >
          <span className="text-[#d4af37] text-sm font-serif transition-transform duration-300 group-hover:scale-110">
            ◇
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-white font-display uppercase group-hover:text-[#f3e5ab] transition-colors">
            THE LOST TRADING CLUB
          </span>
        </a>

        {/* Desktop Navigation with Smooth Sliding Gold Indicator */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative py-1 text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 380,
                            damping: 32,
                          }
                    }
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#08090d]/95 backdrop-blur-2xl border-b border-white/[0.06] px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs uppercase tracking-[0.25em] py-2 transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#d4af37] font-semibold' : 'text-neutral-300 hover:text-[#d4af37]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
