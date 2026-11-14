import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const scrolledRef = useRef(false)
  const activeSectionRef = useRef('Home')
  const shouldReduceMotion = useReducedMotion()
  const { theme, isDark, toggleTheme } = useTheme()

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Referrals', href: '#referrals', id: 'referrals' },
    { name: 'Connect', href: '#connect', id: 'connect' },
    { name: 'Support', href: '#support', id: 'support' },
  ]

  useEffect(() => {
    let ticking = false

    // Cache section elements once to avoid querying the DOM on every scroll frame
    const sectionElements = navLinks.map((link) => ({
      name: link.name,
      el: document.getElementById(link.id),
    }))

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

          // 2. High-performance Scroll-spy using cached offsets (zero layout thrashing)
          if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
            if (activeSectionRef.current !== 'Support') {
              activeSectionRef.current = 'Support'
              setActiveSection('Support')
            }
          } else {
            let current = 'Home'
            const triggerPoint = scrollY + window.innerHeight * 0.38
            for (let i = sectionElements.length - 1; i >= 0; i--) {
              const item = sectionElements[i]
              if (item.el && item.el.offsetTop <= triggerPoint) {
                current = item.name
                break
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
    window.addEventListener(
      'resize',
      () => {
        sectionElements.forEach((item, idx) => {
          item.el = document.getElementById(navLinks[idx].id)
        })
      },
      { passive: true }
    )

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/85 dark:bg-[#060709]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.04] py-4 shadow-sm dark:shadow-none'
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
          <span className="text-[#2563eb] dark:text-[#d4af37] text-sm font-serif transition-transform duration-300 group-hover:scale-110">
            ◇
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-slate-900 dark:text-white font-display uppercase group-hover:text-blue-600 dark:group-hover:text-[#f3e5ab] transition-colors">
            THE LOST TRADING CLUB
          </span>
        </a>

        {/* Desktop Navigation with Smooth Sliding Indicator & Theme Switcher */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          <nav className="flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-1 text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-200 ${isActive
                    ? 'text-slate-900 dark:text-white font-medium'
                    : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#2563eb] dark:bg-[#d4af37] shadow-[0_0_8px_rgba(37,99,235,0.6)] dark:shadow-[0_0_8px_rgba(212,175,55,0.6)]"
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

          {/* Desktop Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-white/[0.03] text-slate-700 dark:text-[#d4af37] hover:border-blue-500/50 dark:hover:border-[#d4af37]/40 hover:bg-blue-50/80 dark:hover:bg-white/[0.06] transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#d4af37]" />
            ) : (
              <Sun className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

        {/* Mobile Header Controls: Theme Switcher & Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-white/[0.03] text-slate-700 dark:text-[#d4af37] hover:border-blue-500/50 dark:hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#d4af37]" />
            ) : (
              <Sun className="w-4 h-4 text-blue-600" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#08090d]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.06] px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs uppercase tracking-[0.25em] py-2 transition-colors flex items-center justify-between ${isActive
                    ? 'text-[#2563eb] dark:text-[#d4af37] font-semibold'
                    : 'text-slate-700 dark:text-neutral-300 hover:text-[#2563eb] dark:hover:text-[#d4af37]'
                    }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-[#d4af37]" />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
