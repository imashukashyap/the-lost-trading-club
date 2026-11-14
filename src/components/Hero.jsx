import React from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import MarketHeroBackground from './MarketHeroBackground'

export default function Hero({ onNavigateToHowToJoin }) {
  return (
    <section
      id="home"
      className="relative w-full h-screen h-[100svh] min-h-[100svh] flex flex-col justify-center pt-16 pb-12 sm:pt-20 sm:pb-0 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* 1. Full-Screen Edge-to-Edge Animated Market Background */}
      <MarketHeroBackground />

      {/* 2. Hero Content (Positioned Above the Animation Layer) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center sm:items-start">
        <div className="max-w-2xl flex flex-col items-center text-center sm:items-start sm:text-left w-full">
          {/* Brand Monogram */}
          <div className="mb-3.5 sm:mb-6 text-[#2563eb] dark:text-[#d4af37] text-base sm:text-lg font-serif tracking-widest select-none transition-colors duration-300">
            ◇
          </div>

          {/* Master Brand Title */}
          <h1 className="text-[2.15rem] min-[375px]:text-4xl min-[410px]:text-[2.65rem] sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-slate-900 dark:text-[#f5f5f7] leading-[1.12] sm:leading-[1.06] mb-4 sm:mb-6 transition-colors duration-300">
            <span className="block sm:inline">THE LOST</span>{' '}
            <span className="block sm:inline">
              <span className="italic font-normal text-[#2563eb] dark:text-[#d4af37] transition-colors duration-300">TRADING</span> CLUB
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-[10.5px] min-[375px]:text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] min-[375px]:tracking-[0.24em] sm:tracking-[0.35em] uppercase text-slate-500 dark:text-neutral-400 mb-7 sm:mb-10 max-w-sm sm:max-w-none transition-colors duration-300">
            Discipline. Patience. Precision.
          </p>

          {/* Action CTAs: Join Telegram (Primary) + How to Join Us (Secondary) */}
          <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-3.5 w-full sm:w-auto">
            {/* Primary CTA: Join Telegram */}
            <a
              href="https://t.me/TheLostTradingClub"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border border-blue-500/35 dark:border-[#d4af37]/40 bg-white/90 dark:bg-[#0d1017]/90 text-blue-900 dark:text-[#f3e5ab] text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:border-blue-600 dark:hover:border-[#d4af37] hover:bg-blue-50/80 dark:hover:bg-[#d4af37]/15 hover:shadow-[0_0_35px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] transition-all duration-300 backdrop-blur-md shadow-sm dark:shadow-none w-[88%] sm:w-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Join Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            {/* HOW TO JOIN US Button */}
            <a
              href="/how-to-join"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigateToHowToJoin) {
                  onNavigateToHowToJoin()
                } else {
                  window.location.href = '/how-to-join'
                }
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 dark:from-[#d4af37] dark:via-[#e2c46c] dark:to-[#c9a02a] text-white dark:text-[#08090d] border border-blue-400/40 dark:border-[#f7e7b4]/60 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] shadow-[0_4px_25px_rgba(37,99,235,0.32)] hover:shadow-[0_6px_35px_rgba(37,99,235,0.48)] dark:shadow-[0_0_28px_rgba(212,175,55,0.38)] dark:hover:shadow-[0_0_42px_rgba(212,175,55,0.62)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] hover:brightness-105 transition-all duration-300 ease-out w-full sm:w-auto cursor-pointer"
            >
              <span>How To Join Us</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-[#08090d] transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
