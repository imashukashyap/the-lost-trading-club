import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative py-32 px-6 sm:px-10 border-t border-slate-200/80 dark:border-white/[0.04] transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Subtle Section Label */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#2563eb] dark:text-[#d4af37] mb-6 transition-colors duration-300"
        >
          <span>01</span>
          <span className="w-6 h-[1px] bg-[#2563eb]/40 dark:bg-[#d4af37]/40" />
          <span>OUR STORY</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white tracking-tight leading-snug mb-8 transition-colors duration-300"
        >
          Better <span className="italic text-[#2563eb] dark:text-[#d4af37] transition-colors duration-300">Together</span>.
        </motion.h2>

        {/* Story copy */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 text-slate-700 dark:text-neutral-300 font-light text-base sm:text-lg leading-relaxed transition-colors duration-300"
        >
          <p>
            Trading can be a lonely journey. From understanding the markets to dealing with losses and staying disciplined, every trader faces challenges along the way.
          </p>
          <p className="text-blue-900/90 dark:text-[#f3e5ab]/90 font-normal transition-colors duration-300">
            That's why The Lost Trading Club exists.
          </p>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed transition-colors duration-300">
            We're building a community where like-minded traders come together, share ideas, discuss market movements, exchange experiences and learn from one another.
          </p>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed transition-colors duration-300">
            When you're surrounded by people who understand the journey you're on, things can feel a little easier. You get a better environment to grow, new perspectives to learn from and a community that keeps you motivated.
          </p>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed transition-colors duration-300">
            Whether you're just starting out or already have experience, there's a place for you here.
          </p>
          <p className="pt-2 text-slate-900 dark:text-white font-medium text-base sm:text-lg leading-relaxed transition-colors duration-300">
            You don't have to figure it all out alone.{' '}
            <a
              href="https://t.me/TheLostTradingClub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:text-blue-700 dark:text-[#d4af37] dark:hover:text-[#f3e5ab] underline underline-offset-4 decoration-[#2563eb]/40 hover:decoration-[#2563eb] dark:decoration-[#d4af37]/40 dark:hover:decoration-[#d4af37] transition-all duration-200"
            >
              Join The Lost Trading Club
            </a>{' '}
            and grow alongside like-minded traders.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
