import React from 'react'

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Subtle Section Label */}
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-6">
          <span>01</span>
          <span className="w-6 h-[1px] bg-[#d4af37]/40" />
          <span>PURPOSE & PHILOSOPHY</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight leading-snug mb-8">
          The Art of <span className="italic text-[#d4af37]">Restraint</span>
        </h2>

        {/* Short, elegant philosophy paragraphs */}
        <div className="space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
          <p>
            The Lost Trading Club is a private collective built on the premise that 
            market edge is not found in complex indicators or consensus noise, 
            but in absolute psychological composure and calculated risk.
          </p>
          <p className="text-neutral-400 text-sm sm:text-base">
            We abandon retail euphoria and hyperactive trading. By prioritizing capital preservation, 
            patience, and institutional price delivery, we execute only when the odds are asymmetric.
          </p>
        </div>
      </div>
    </section>
  )
}
