import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { TelegramIcon, InstagramIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'

export default function Connect() {
  const shouldReduceMotion = useReducedMotion()
  const { isDark } = useTheme()

  const links = [
    {
      name: 'Telegram',
      handle: '@TheLostTradingClub',
      href: 'https://t.me/TheLostTradingClub',
      description: 'Daily market context, session levels & execution notes.',
      icon: TelegramIcon,
    },
    {
      name: 'Instagram',
      handle: '@thelosttradingclub',
      href: 'https://instagram.com/thelosttradingclub',
      description: 'Visual trade journals, psychology & philosophy.',
      icon: InstagramIcon,
    },
  ]

  return (
    <section
      id="connect"
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
          <span>03</span>
          <span className="w-6 h-[1px] bg-[#2563eb]/40 dark:bg-[#d4af37]/40" />
          <span>CONNECT</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white tracking-tight leading-snug mb-4 transition-colors duration-300"
        >
          The <span className="italic text-[#2563eb] dark:text-[#d4af37] transition-colors duration-300">Channels</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-slate-500 dark:text-neutral-400 font-light max-w-md mx-auto mb-14 transition-colors duration-300"
        >
          Follow the journey and observe our execution in real time.
        </motion.p>

        {/* Minimalist 2-Link Grid with Scroll-Triggered Stagger & Premium Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {links.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 32,
                  scale: shouldReduceMotion ? 1 : 0.97,
                }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : isDark
                    ? {
                        y: -6,
                        borderColor: 'rgba(212, 175, 55, 0.45)',
                        boxShadow:
                          '0 20px 40px -15px rgba(0, 0, 0, 0.85), 0 0 25px -5px rgba(212, 175, 55, 0.16)',
                        transition: { duration: 0.35, ease: 'easeOut' },
                      }
                    : {
                        y: -6,
                        borderColor: 'rgba(37, 99, 235, 0.45)',
                        boxShadow:
                          '0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 0 25px -5px rgba(37, 99, 235, 0.08)',
                        transition: { duration: 0.35, ease: 'easeOut' },
                      }
                }
                className="group relative p-7 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white/80 dark:bg-[#0c0e14]/60 backdrop-blur-md shadow-sm dark:shadow-none transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-blue-600 dark:text-[#d4af37] group-hover:scale-105 group-hover:border-blue-500/40 dark:group-hover:border-[#d4af37]/30 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-[#d4af37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#f3e5ab] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-blue-600 dark:text-[#d4af37] tracking-wider mb-2">
                    {item.handle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
