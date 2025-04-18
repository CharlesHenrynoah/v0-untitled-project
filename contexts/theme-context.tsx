"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeType = "light" | "dark" | "system"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("system")
  const [loaded, setLoaded] = useState(false)

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeType | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
    setLoaded(true)
  }, [])

  // Sauvegarder le thème dans localStorage lorsqu'il change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("theme", theme)
    }
  }, [theme, loaded])

  // Appliquer le thème
  useEffect(() => {
    if (!loaded) return

    const root = window.document.documentElement
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const themeToApply = theme === "system" ? systemTheme : theme

    root.classList.remove("light", "dark")
    root.classList.add(themeToApply)
  }, [theme, loaded])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
