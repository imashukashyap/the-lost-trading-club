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
      <rect
        width="36"
        height="36"
        rx="8"
        className="fill-[#090d16] stroke-slate-700/60 dark:fill-[#d4af37]/[0.08] dark:stroke-[#d4af37]/25"
      />
      {/* Pure White Monochrome XM Monogram */}
      <path
        d="M8.45 13.24 L11.78 13.24 L13.38 15.26 L13.45 15.53 L12.34 16.85 L12.13 17.27 L11.71 17.55 L9.21 14.21 L8.65 13.66Z M15.81 13.24 L22.27 13.24 L23.94 15.46 L24.22 15.67 L24.22 15.81 L24.64 15.53 L26.30 13.24 L29.50 13.24 L29.50 13.59 L28.18 15.12 L25.96 18.10 L25.61 18.38 L25.47 18.73 L25.19 18.94 L24.43 20.05 L24.15 19.98 L22.41 17.62 L22.06 17.34 L22.06 22.76 L15.81 22.76 L13.80 20.19 L13.52 20.40 L11.78 22.76 L8.45 22.76 L8.65 22.34 L9.21 21.79 L9.42 21.37 L9.70 21.16 L10.60 19.84 L11.16 19.29 L11.36 18.87 L11.64 18.66 L11.85 18.24 L12.41 17.69 L12.82 16.99 L13.38 16.44 L13.59 16.02 L13.87 15.81 L14.28 15.12 L14.56 14.91Z M19.15 13.31 L15.46 17.97 L19.08 22.69Z M6.57 13.31 L7.13 13.87 L9.97 17.69 L10.25 17.90 L10.25 18.10 L9.77 18.59 L9.63 18.94 L9.28 19.22 L9.07 19.63 L8.79 19.84 L8.38 20.54 L8.10 20.74 L6.64 22.69 L6.50 22.69Z M29.43 14.35 L29.50 22.76 L26.51 22.76 L26.51 18.10Z"
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
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
      <rect
        width="36"
        height="36"
        rx="8"
        className="fill-[#090d16] stroke-slate-700/60 dark:fill-[#d4af37]/[0.08] dark:stroke-[#d4af37]/25"
      />
      {/* Pure White Monochrome Exness Emblem */}
      <path
        d="M11.56 12.54 L13.76 12.62 L15.47 13.36 L16.13 13.84 L16.13 14.01 L16.37 14.09 L17.10 14.99 L17.67 16.13 L17.92 17.10 L17.84 18.90 L8.96 18.98 L9.36 19.96 L10.26 20.93 L11.73 21.59 L13.27 21.59 L13.84 21.42 L15.07 20.61 L15.15 20.36 L17.35 20.36 L17.35 20.61 L16.86 21.34 L15.80 22.40 L14.66 23.05 L13.68 23.38 L11.24 23.38 L9.53 22.64 L7.98 21.18 L7.65 20.44 L7.49 20.36 L7.08 19.14 L7.08 16.86 L7.41 15.80 L7.90 14.90 L8.55 14.25 L8.55 14.09 L8.71 14.09 L9.61 13.27 L10.59 12.79Z M19.55 12.54 L19.71 12.54 L21.18 14.01 L21.18 14.17 L23.38 16.29 L23.38 16.45 L23.54 16.45 L23.54 16.61 L23.87 16.53 L24.11 16.13 L24.44 15.96 L24.44 15.80 L26.56 13.76 L26.56 13.60 L26.80 13.52 L26.80 13.36 L26.96 13.36 L26.96 13.19 L27.61 12.54 L29.00 13.76 L25.01 17.92 L25.58 18.73 L25.99 18.98 L25.99 19.14 L28.92 22.07 L28.92 22.32 L28.59 22.48 L28.51 22.73 L28.35 22.73 L27.78 23.38 L27.53 23.38 L27.37 23.05 L23.79 19.39 L23.54 19.39 L22.73 20.20 L22.73 20.36 L22.56 20.36 L22.48 20.61 L22.32 20.61 L22.32 20.77 L20.44 22.56 L20.44 22.73 L19.79 23.21 L19.71 23.46 L18.65 22.40 L18.49 22.40 L18.41 22.07 L22.32 18.08 L22.32 17.84 L21.67 17.35 L21.67 17.19 L18.33 13.84 L19.22 12.87 L19.47 12.79Z M12.05 14.33 L10.91 14.66 L9.93 15.31 L9.93 15.47 L9.36 16.04 L8.96 16.94 L9.04 17.10 L15.96 17.10 L15.56 15.96 L14.82 15.15 L13.36 14.41Z"
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ElefinLogo({ className = 'w-7 h-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="36"
        height="36"
        rx="8"
        className="fill-[#090d16] stroke-slate-700/60 dark:fill-[#d4af37]/[0.08] dark:stroke-[#d4af37]/25"
      />
      {/* Pure White Monochrome Elefin Stylized 'e' */}
      <path
        d="M19.85 9.58 L21.40 9.58 L23.02 9.88 L24.57 10.47 L26.05 11.43 L27.30 12.68 L28.04 13.79 L28.78 15.64 L29.00 16.82 L28.93 19.18 L27.15 19.70 L24.79 19.99 L21.91 20.07 L19.26 19.92 L15.86 19.48 L16.01 20.29 L16.67 21.54 L17.93 22.65 L19.48 23.24 L21.32 23.32 L22.13 23.17 L23.54 22.58 L24.50 21.69 L28.34 21.69 L28.19 22.13 L27.38 23.32 L25.83 24.79 L23.98 25.83 L21.54 26.42 L19.92 26.42 L18.37 26.12 L16.45 25.31 L15.49 24.64 L14.16 23.32 L13.42 22.21 L12.61 20.21 L12.39 18.44 L11.06 17.93 L9.44 17.04 L7.81 15.49 L7.00 14.31 L7.00 14.09 L7.15 14.09 L8.18 14.68 L9.73 15.27 L12.61 15.93 L13.13 14.38 L13.64 13.42 L15.12 11.65 L17.11 10.32 L18.30 9.88Z M20.14 12.68 L18.81 12.98 L17.48 13.72 L16.38 14.97 L16.01 15.71 L15.86 16.38 L19.92 16.67 L24.35 16.60 L25.60 16.45 L25.01 15.05 L23.61 13.57 L22.06 12.83 L21.40 12.68Z"
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}
