import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import MarketHeroBackground from './MarketHeroBackground'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen h-[100svh] min-h-[100svh] flex flex-col justify-center pt-20 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* 1. Full-Screen Edge-to-Edge Animated Market Background */}
      <MarketHeroBackground />

      {/* 2. Hero Content (Positioned Above the Animation Layer) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl flex flex-col items-start text-left">
          {/* Brand Monogram */}
          <div className="mb-6 text-[#d4af37] text-lg font-serif tracking-widest select-none">
            ◇
          </div>

          {/* Master Brand Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-[#f5f5f7] leading-[1.06] mb-6">
            THE LOST <span className="italic font-normal text-[#d4af37]">TRADING</span> CLUB
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.35em] uppercase text-neutral-400 mb-10">
            Discipline. Patience. Precision.
          </p>

          {/* Join Telegram Button */}
          <div>
            <a
              href="https://t.me/TheLostTradingClub"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#d4af37]/40 bg-[#0d1017]/90 text-[#f3e5ab] text-xs font-medium uppercase tracking-[0.25em] hover:border-[#d4af37] hover:bg-[#d4af37]/15 hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] transition-all duration-300 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Join Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
