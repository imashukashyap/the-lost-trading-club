import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { TelegramIcon, WhatsAppIcon, MailIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'

/**
 * OFFICIAL SUPPORT CHANNELS CONFIGURATION
 */
const SUPPORT_CONTACTS = {
  telegram: {
    url: 'https://t.me/mns2132',
    display: '@TheLostTradingSupport',
    buttonText: 'CHAT ON TELEGRAM',
  },
  whatsapp: {
    url: 'https://wa.me/918863071189',
    display: '+91 88630 71189',
    buttonText: 'MESSAGE ON WHATSAPP',
  },
  email: {
    url: 'mailto:thelosttradingclub@gmail.com',
    display: 'thelosttradingclub@gmail.com',
    buttonText: 'SEND AN EMAIL',
  },
}

export default function Support() {
  const shouldReduceMotion = useReducedMotion()
  const { isDark } = useTheme()

  const supportOptions = [
    {
      id: 'telegram',
      title: 'Telegram Support',
      description: 'Chat with our support team on Telegram.',
      display: SUPPORT_CONTACTS.telegram.display,
      href: SUPPORT_CONTACTS.telegram.url,
      buttonText: SUPPORT_CONTACTS.telegram.buttonText,
      icon: TelegramIcon,
      isExternal: true,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Contact our team directly on WhatsApp.',
      display: SUPPORT_CONTACTS.whatsapp.display,
      href: SUPPORT_CONTACTS.whatsapp.url,
      buttonText: SUPPORT_CONTACTS.whatsapp.buttonText,
      icon: WhatsAppIcon,
      isExternal: true,
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us your queries through email.',
      display: SUPPORT_CONTACTS.email.display,
      href: SUPPORT_CONTACTS.email.url,
      buttonText: SUPPORT_CONTACTS.email.buttonText,
      icon: MailIcon,
      isExternal: false,
    },
  ]

  return (
    <section
      id="support"
      className="relative py-32 px-6 sm:px-10 border-t border-slate-200/80 dark:border-white/[0.04] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#2563eb] dark:text-[#d4af37] mb-6 transition-colors duration-300"
        >
          <span>04</span>
          <span className="w-6 h-[1px] bg-[#2563eb]/40 dark:bg-[#d4af37]/40" />
          <span>ASSISTANCE</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white tracking-tight leading-snug mb-4 transition-colors duration-300"
        >
          We're Here to <span className="italic text-[#2563eb] dark:text-[#d4af37] transition-colors duration-300">Help</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base text-slate-500 dark:text-neutral-400 font-light max-w-xl mx-auto mb-16 leading-relaxed transition-colors duration-300"
        >
          Have a question or need assistance? Connect with our team through any of the following channels.
        </motion.p>

        {/* Three Support Options Grid with Staggered Scroll Entrance & Lift Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {supportOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <motion.div
                key={option.id}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 32,
                  scale: shouldReduceMotion ? 1 : 0.97,
                }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.14,
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
                className="group relative p-8 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white/80 dark:bg-[#0c0e14]/60 backdrop-blur-md shadow-sm dark:shadow-none transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Status Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-blue-600 dark:text-[#d4af37] group-hover:scale-105 group-hover:border-blue-500/40 dark:group-hover:border-[#d4af37]/30 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active channel" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-display font-medium text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-[#f3e5ab] transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 font-light leading-relaxed mb-4">
                    {option.description}
                  </p>
                  <p className="text-[12px] font-mono text-blue-600 dark:text-[#d4af37] tracking-wide mb-8">
                    {option.display}
                  </p>
                </div>

                {/* Clickable Button */}
                <a
                  href={option.href}
                  target={option.isExternal ? '_blank' : undefined}
                  rel={option.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.02] hover:border-blue-500 dark:hover:border-[#d4af37] hover:bg-blue-50 dark:hover:bg-[#d4af37]/10 text-xs font-mono uppercase tracking-[0.18em] text-slate-700 dark:text-neutral-300 hover:text-blue-900 dark:hover:text-[#f3e5ab] transition-all duration-300"
                >
                  <span>{option.buttonText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
