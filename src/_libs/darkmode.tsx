// useSimpleDarkMode.ts
"use client"
// DarkModeProvider.tsx
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'

type DarkModeContextType = {
  isDarkMode: boolean
  toggle: (isDark?: boolean) => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  const toggle = useCallback((isDark?: boolean | ((prevState: boolean) => boolean)) => {
    if (typeof isDark === 'undefined') {
      setIsDarkMode((state) => !state)
    } else {
      setIsDarkMode(isDark)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}