"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeType = "light" | "dark" | "system"
type FontSizeType = "small" | "medium" | "large"
type DateFormatType = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"
type TimeFormatType = "12h" | "24h"
type LanguageType = "fr" | "en" | "es" | "de"
type RegionType = "FR" | "BE" | "CH" | "CA"

interface UserPreferences {
  theme: ThemeType
  fontSize: FontSizeType
  compactMode: boolean
  language: LanguageType
  region: RegionType
  dateFormat: DateFormatType
  timeFormat: TimeFormatType
}

interface PreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void
  formatDate: (date: Date | string) => string
  formatTime: (date: Date | string) => string
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  fontSize: "medium",
  compactMode: false,
  language: "fr",
  region: "FR",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h",
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [loaded, setLoaded] = useState(false)

  // Charger les préférences depuis localStorage au démarrage
  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences")
    if (storedPreferences) {
      try {
        const parsedPreferences = JSON.parse(storedPreferences)
        setPreferences({ ...defaultPreferences, ...parsedPreferences })
      } catch (error) {
        console.error("Erreur lors du chargement des préférences:", error)
      }
    }
    setLoaded(true)
  }, [])

  // Sauvegarder les préférences dans localStorage lorsqu'elles changent
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }
  }, [preferences, loaded])

  // Appliquer le thème
  useEffect(() => {
    if (!loaded) return

    const root = window.document.documentElement
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const themeToApply = preferences.theme === "system" ? systemTheme : preferences.theme

    root.classList.remove("light", "dark")
    root.classList.add(themeToApply)
  }, [preferences.theme, loaded])

  // Appliquer la taille de police et le mode compact
  useEffect(() => {
    if (!loaded) return

    const root = window.document.documentElement

    // Appliquer la taille de police
    root.classList.remove("text-size-small", "text-size-medium", "text-size-large")
    root.classList.add(`text-size-${preferences.fontSize}`)

    // Appliquer le mode compact
    if (preferences.compactMode) {
      root.classList.add("compact-mode")
    } else {
      root.classList.remove("compact-mode")
    }
  }, [preferences.fontSize, preferences.compactMode, loaded])

  // Mettre à jour les préférences
  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }))
  }

  // Formater une date selon le format choisi
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date
    const day = d.getDate().toString().padStart(2, "0")
    const month = (d.getMonth() + 1).toString().padStart(2, "0")
    const year = d.getFullYear()

    switch (preferences.dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`
      default:
        return `${day}/${month}/${year}`
    }
  }

  // Formater une heure selon le format choisi
  const formatTime = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date
    const hours = d.getHours()
    const minutes = d.getMinutes().toString().padStart(2, "0")

    if (preferences.timeFormat === "24h") {
      return `${hours}:${minutes}`
    } else {
      const period = hours >= 12 ? "PM" : "AM"
      const hours12 = hours % 12 || 12
      return `${hours12}:${minutes} ${period}`
    }
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, formatDate, formatTime }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
