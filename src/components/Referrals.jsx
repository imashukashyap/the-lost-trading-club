import React, { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { XMLogo, ExnessLogo, ElefinLogo } from './Icons'
import { useTheme } from '../context/ThemeContext'

/**
 * EXACT OFFICIAL REFERRAL CONFIGURATION
 * Strict referral URLs with full tracking parameters.
 */
const REFERRAL_PLATFORMS = [
  {
    id: 'xm',
    name: 'XM Broker',
    badge: 'Multi-Asset Broker',
    description: 'Explore the XM trading platform.',
    registrationUrl: 'https://www.xmglobal.com/referral?token=IZ4FnguHtNqmve6ztKhvJQ',
    referralCode: 'RAF4DXU1F',
    buttonText: 'OPEN XM ACCOUNT',
    logo: XMLogo,
  },
  {
    id: 'exness',
    name: 'Exness Broker',
    badge: 'Institutional Liquidity',
    description: 'Explore the Exness trading platform.',
    registrationUrl: 'https://one.exnessonelink.com/a/quwpkgntim',
    referralCode: 'quepkgntim',
    buttonText: 'OPEN EXNESS ACCOUNT',
    logo: ExnessLogo,
  },
  {
    id: 'elefin',
    name: 'Elefin Broker',
    badge: 'Forex & CFD Broker',
    description: 'Explore the Elefin trading platform.',
    registrationUrl: 'https://partners.elefin.com/go/TLTCLUB',
    referralCode: 'TLTCLUB',
    buttonText: 'OPEN ELEFIN ACCOUNT',
    logo: ElefinLogo,
  },
]

export default function Referrals() {
  const shouldReduceMotion = useReducedMotion()
  const { isDark } = useTheme()
  const [copiedId, setCopiedId] = useState(null)

  const handleCopyCode = (e, id, code) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2200)
  }

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="referrals"
      className="relative py-32 px-6 sm:px-10 border-t border-slate-200/80 dark:border-white/[0.04] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#2563eb] dark:text-[#d4af37] mb-6 transition-colors duration-300"
        >
          <span>02</span>
          <span className="w-6 h-[1px] bg-[#2563eb]/40 dark:bg-[#d4af37]/40" />
          <span>REFERRALS</span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white tracking-tight leading-snug mb-4 transition-colors duration-300"
        >
          Trading <span className="italic text-[#2563eb] dark:text-[#d4af37] transition-colors duration-300">Platforms</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base text-slate-500 dark:text-neutral-400 font-light max-w-md mx-auto mb-16 leading-relaxed transition-colors duration-300"
        >
          Explore our recommended trading platforms and execution environments.
        </motion.p>

        {/* Three Fully Clickable Referral Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {REFERRAL_PLATFORMS.map((platform, index) => {
            const Logo = platform.logo
            return (
              <motion.div
                key={platform.id}
                onClick={() => handleCardClick(platform.registrationUrl)}
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
                className="group relative p-7 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white/80 dark:bg-[#0c0e14]/60 backdrop-blur-md shadow-sm dark:shadow-none transition-colors duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Bar: Logo & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-blue-600 dark:text-[#d4af37] group-hover:text-blue-700 dark:group-hover:text-[#f3e5ab] group-hover:border-blue-500/40 dark:group-hover:border-[#d4af37]/40 transition-all duration-300">
                        <Logo className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white tracking-wide group-hover:text-blue-600 dark:group-hover:text-[#f3e5ab] transition-colors">
                          {platform.name}
                        </h3>
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-500 dark:text-neutral-400">
                          {platform.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                    {platform.description}
                  </p>

                  {/* Referral Code Box with Copy Option */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] mb-8 group-hover:border-slate-300 dark:group-hover:border-white/[0.12] transition-colors cursor-default"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-neutral-500">
                        Referral Code
                      </span>
                      <span className="text-xs font-mono font-semibold text-blue-900 dark:text-[#f3e5ab] tracking-wider select-all">
                        {platform.referralCode}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(e, platform.id, platform.referralCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/35 dark:border-[#d4af37]/35 bg-blue-50 dark:bg-[#d4af37]/10 hover:bg-blue-100 dark:hover:bg-[#d4af37]/20 text-[10px] font-mono uppercase tracking-wider text-blue-700 dark:text-[#f3e5ab] transition-all cursor-pointer"
                      title="Copy referral code"
                    >
                      {copiedId === platform.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-300 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-blue-600 dark:text-[#d4af37]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Explicit Anchor Tag for the Button (Direct Link with Full Tracking URL) */}
                <a
                  href={platform.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between w-full px-4 sm:px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.02] group-hover:border-blue-500 dark:group-hover:border-[#d4af37] group-hover:bg-blue-50 dark:group-hover:bg-[#d4af37]/10 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-slate-700 dark:text-neutral-300 group-hover:text-blue-900 dark:group-hover:text-[#f3e5ab] transition-all duration-300"
                >
                  <span className="whitespace-nowrap">{platform.buttonText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0 ml-2" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
