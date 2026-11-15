import React, { useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Mail,
  ExternalLink,
} from 'lucide-react'

/**
 * ============================================================================
 * THE LOST TRADING CLUB — "HOW TO JOIN US" ONBOARDING ROADMAP
 *
 * HOW TO ADD YOUR ACTUAL STEPS:
 * 1. Find the `stepsData` array below.
 * 2. Replace the placeholder titles, descriptions, notes, and links with
 *    your actual onboarding instructions when ready.
 * 3. Add or remove steps as needed.
 * ============================================================================
 */

const stepsData = [
  {
    stepNumber: '01',
    badge: 'Step 01',
    title: 'Account Registration',
    status: 'Ready for Steps',
    description:
      'Step 1 instructions placeholder: Add your actual registration requirements here. For example, instruct members to register using your official broker referral links or platform of choice.',
    note: 'Placeholder Tip: Mention any referral codes or specific registration settings traders need to select.',
    actions: [
      {
        label: 'Open XM Account',
        href: 'https://www.xmglobal.com/referral?token=IZ4FnguHtNqmve6ztKhvJQ',
        isExternal: true,
      },
      {
        label: 'Open Exness Account',
        href: 'https://one.exnessonelink.com/a/quwpkgntim',
        isExternal: true,
      },
    ],
  },
  {
    stepNumber: '02',
    badge: 'Step 02',
    title: 'Verification & Account Funding',
    status: 'Ready for Steps',
    description:
      'Step 2 instructions placeholder: Add your account verification details here. For example, explain the identity verification process, KYC steps, or minimum account deposit required for club eligibility.',
    note: 'Placeholder Tip: Provide guidance on average verification timeframes or accepted funding methods.',
    actions: [],
  },
  {
    stepNumber: '03',
    badge: 'Step 03',
    title: 'Submit Verification to Support',
    status: 'Ready for Steps',
    description:
      'Step 3 instructions placeholder: Explain how members should verify their account with the team. For example, instruct traders to send their broker account ID / screenshot to official support.',
    note: 'Placeholder Tip: Specify what information to include in the message for fastest confirmation.',
    actions: [
      {
        label: 'Message Support on Telegram',
        href: 'https://t.me/mns2132',
        isExternal: true,
      },
    ],
  },
  {
    stepNumber: '04',
    badge: 'Step 04',
    title: 'Access The Private Community',
    status: 'Ready for Steps',
    description:
      'Step 4 instructions placeholder: Describe the final welcome and onboarding. For example, explain how approved members receive the private channel invitation link, discussion groups, and member resources.',
    note: 'Welcome to the club. Grow alongside disciplined, like-minded traders.',
    actions: [
      {
        label: 'Join Public Telegram Channel',
        href: 'https://t.me/TheLostTradingClub',
        isExternal: true,
      },
    ],
  },
]

export default function HowToJoin({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleReturnHome = (e, sectionId = '#home') => {
    if (e) e.preventDefault()
    if (onNavigate) {
      onNavigate('home', sectionId)
    } else {
      window.location.href = '/' + sectionId
    }
  }

  return (
    <div className="relative w-full min-h-screen pt-28 sm:pt-36 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-8 sm:mb-12">
          <button
            type="button"
            onClick={(e) => handleReturnHome(e, '#home')}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] text-slate-600 dark:text-neutral-400 text-xs font-mono uppercase tracking-[0.2em] hover:text-blue-600 dark:hover:text-[#f3e5ab] hover:border-blue-500/40 dark:hover:border-[#d4af37]/40 hover:bg-blue-50/60 dark:hover:bg-white/[0.06] transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Homepage</span>
          </button>
        </div>

        {/* Page Header / Hero Intro */}
        <div className="mb-14 sm:mb-20">
          {/* Brand Monogram */}
          <div className="mb-3 text-[#2563eb] dark:text-[#d4af37] text-sm font-serif tracking-widest select-none transition-colors duration-300">
            ◇
          </div>

          {/* Section Counter */}
          <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-600 dark:text-[#d4af37] mb-3 transition-colors duration-300">
            01 — COMMUNITY ONBOARDING
          </div>

          {/* Master Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-slate-900 dark:text-[#f5f5f7] mb-5 sm:mb-6 transition-colors duration-300">
            How to Join <span className="italic font-normal text-[#2563eb] dark:text-[#d4af37]">Us.</span>
          </h1>

          {/* Intro Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-neutral-300 font-light leading-relaxed max-w-2xl transition-colors duration-300">
            Follow our structured step-by-step roadmap to complete your account setup and gain access to The Lost Trading Club community.
          </p>
        </div>

        {/* ================================================================= */}
        {/* Step-by-Step Progressive Timeline */}
        {/* ================================================================= */}
        <div className="relative mb-20 sm:mb-28">
          {/* Connecting Vertical Timeline Line (Desktop & Tablet) */}
          <div
            className="hidden md:block absolute left-8 top-10 bottom-10 w-[1px] bg-gradient-to-b from-blue-500/30 via-slate-200 dark:via-white/10 to-blue-500/30 dark:from-[#d4af37]/40 dark:to-[#d4af37]/40 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12">
            {stepsData.map((item, idx) => (
              <div
                key={item.stepNumber}
                className="relative group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0e14]/70 p-6 sm:p-9 backdrop-blur-xl hover:border-blue-500/40 dark:hover:border-[#d4af37]/35 hover:shadow-[0_10px_35px_rgba(37,99,235,0.06)] dark:hover:shadow-[0_10px_35px_rgba(212,175,55,0.06)] transition-all duration-300"
              >
                {/* Header Row: Badge & Step Number */}
                <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-blue-500/40 dark:border-[#d4af37]/40 bg-blue-50/80 dark:bg-[#d4af37]/10 text-blue-700 dark:text-[#f3e5ab] text-xs font-mono font-semibold">
                      {item.stepNumber}
                    </span>
                    <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-slate-500 dark:text-neutral-400">
                      {item.badge}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-neutral-400 border border-slate-200/60 dark:border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-[#d4af37]" />
                    {item.status}
                  </span>
                </div>

                {/* Step Title */}
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-[#f5f5f7] mb-4 transition-colors duration-300">
                  {item.title}
                </h2>

                {/* Step Description / Instructions Box */}
                <div className="mb-5 p-4 sm:p-5 rounded-xl border border-dashed border-slate-300/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Step Tip / Note */}
                {item.note && (
                  <div className="flex items-start gap-2.5 mb-5 text-[11px] sm:text-xs text-slate-500 dark:text-neutral-400 italic">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item.note}</span>
                  </div>
                )}

                {/* Action Buttons (If Applicable) */}
                {item.actions && item.actions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-3">
                    {item.actions.map((act) => (
                      <a
                        key={act.label}
                        href={act.href}
                        target={act.isExternal ? '_blank' : undefined}
                        rel={act.isExternal ? 'noopener noreferrer' : undefined}
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/35 dark:border-[#d4af37]/35 bg-white dark:bg-white/[0.03] text-blue-900 dark:text-[#f3e5ab] text-[11px] font-mono uppercase tracking-[0.18em] hover:border-blue-600 dark:hover:border-[#d4af37] hover:bg-blue-50/80 dark:hover:bg-[#d4af37]/15 transition-all duration-300"
                      >
                        <span>{act.label}</span>
                        {act.isExternal ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Support & Assistance Card */}
        {/* ================================================================= */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-slate-100/60 dark:bg-[#0a0c10]/60 p-6 sm:p-10 mb-16 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                  Direct Support Available
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-white">
                Need Help Along the Way?
              </h3>
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">
              Response Time: Typically within a few hours
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
            If you have any questions or run into any issues while completing the onboarding steps, reach out directly through our verified communication channels.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/mns2132"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/30 dark:border-[#d4af37]/30 bg-white dark:bg-white/[0.04] text-blue-900 dark:text-[#f3e5ab] text-xs font-mono uppercase tracking-[0.18em] hover:border-blue-600 dark:hover:border-[#d4af37] hover:bg-blue-50/80 dark:hover:bg-[#d4af37]/15 transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Support</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/918863071189"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-700 dark:text-neutral-300 text-xs font-mono uppercase tracking-[0.18em] hover:text-blue-600 dark:hover:text-[#f3e5ab] hover:border-blue-500/40 dark:hover:border-[#d4af37]/40 transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:thelosttradingclub@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-700 dark:text-neutral-300 text-xs font-mono uppercase tracking-[0.18em] hover:text-blue-600 dark:hover:text-[#f3e5ab] hover:border-blue-500/40 dark:hover:border-[#d4af37]/40 transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Bottom Navigation CTA */}
        {/* ================================================================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            type="button"
            onClick={(e) => handleReturnHome(e, '#home')}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-slate-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-[#f3e5ab] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </button>

          <a
            href="https://t.me/TheLostTradingClub"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-blue-500/35 dark:border-[#d4af37]/40 bg-white/90 dark:bg-[#0d1017]/90 text-blue-900 dark:text-[#f3e5ab] text-xs font-medium uppercase tracking-[0.22em] hover:border-blue-600 dark:hover:border-[#d4af37] hover:bg-blue-50/80 dark:hover:bg-[#d4af37]/15 hover:shadow-[0_0_35px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Join Telegram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}
