import React from 'react'

export default function Footer() {
  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-14 px-6 sm:px-10 border-t border-white/[0.04] bg-[#050608]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-[#d4af37] text-xs font-serif">◇</span>
          <span className="text-xs font-semibold tracking-[0.25em] text-white font-display uppercase">
            THE LOST TRADING CLUB
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-7 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="hover:text-[#d4af37] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="hover:text-[#d4af37] transition-colors"
          >
            About
          </a>
          <a
            href="#referrals"
            onClick={(e) => scrollToSection(e, '#referrals')}
            className="hover:text-[#d4af37] transition-colors"
          >
            Referrals
          </a>
          <a
            href="#connect"
            onClick={(e) => scrollToSection(e, '#connect')}
            className="hover:text-[#d4af37] transition-colors"
          >
            Connect
          </a>
          <a
            href="#support"
            onClick={(e) => scrollToSection(e, '#support')}
            className="hover:text-[#d4af37] transition-colors"
          >
            Support
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}
