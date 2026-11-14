import React from 'react'

export function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function TelegramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

export function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" strokeWidth="1.5" />
    </svg>
  )
}

export function MailIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function YouTubeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function DiamondMonogram({ className = 'w-5 h-5 text-[#d4af37]' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 12L2 9z" />
    </svg>
  )
}

export function XMLogo({ className = 'w-7 h-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="8" className="fill-blue-500/[0.08] stroke-blue-500/25 dark:fill-[#d4af37]/[0.08] dark:stroke-[#d4af37]/25" />
      {/* Stylized XM Monogram */}
      <path
        d="M8 10h4.2l3 5.5 3-5.5h4.2L17.5 18 23 26h-4.3l-3.5-5.8L11.7 26H7.5l5.8-8.2L8 10z"
        fill="currentColor"
      />
      <path
        d="M23.5 10h3.2v16h-3.2V10z"
        className="fill-blue-600 dark:fill-[#d4af37]"
      />
    </svg>
  )
}

export function ExnessLogo({ className = 'w-7 h-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="8" className="fill-blue-500/[0.08] stroke-blue-500/25 dark:fill-[#d4af37]/[0.08] dark:stroke-[#d4af37]/25" />
      {/* Stylized Exness Ribbon Emblem */}
      <path
        d="M12.5 12a4.5 4.5 0 0 0-4.5 4.5c0 2.5 2 4.5 4.5 4.5h4.5v-3h-4.5a1.5 1.5 0 0 1-1.5-1.5c0-.8.7-1.5 1.5-1.5h7.5V12h-7.5z"
        fill="currentColor"
      />
      <path
        d="M23.5 24a4.5 4.5 0 0 0 4.5-4.5c0-2.5-2-4.5-4.5-4.5h-4.5v3h4.5a1.5 1.5 0 0 1 1.5 1.5c0 .8-.7 1.5-1.5 1.5h-7.5V24h7.5z"
        className="fill-blue-600 dark:fill-[#d4af37]"
      />
    </svg>
  )
}
