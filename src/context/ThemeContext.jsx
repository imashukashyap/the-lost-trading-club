import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') {
        return saved
      }
    }
    return 'dark' // Default to dark mode for first-time visitors
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
