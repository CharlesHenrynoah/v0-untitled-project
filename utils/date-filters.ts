import type { DateFilter } from "@/types/shared"

/**
 * Filtre les éléments par date selon le filtre spécifié
 * @param items Tableau d'éléments à filtrer
 * @param dateFilter Type de filtre de date
 * @param dateAccessor Fonction pour accéder à la date dans chaque élément
 * @returns Tableau filtré
 */
export function filterByDate<T>(items: T[], dateFilter: DateFilter, dateAccessor: (item: T) => string): T[] {
  if (dateFilter === "all") return items

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return items.filter((item) => {
    const itemDate = new Date(dateAccessor(item))

    if (dateFilter === "today") {
      return itemDate.toDateString() === today.toDateString()
    }

    if (dateFilter === "week") {
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay()) // Début de la semaine (dimanche)
      return itemDate >= weekStart && itemDate <= today
    }

    if (dateFilter === "month") {
      return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear()
    }

    return true
  })
}

/**
 * Formate une date ISO en format français
 * @param isoDate Date au format ISO
 * @returns Date au format français (JJ/MM/AAAA)
 */
export function formatDateFR(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString("fr-FR")
}

/**
 * Formate une date ISO en format relatif (Aujourd'hui, Hier, ou date)
 * @param isoDate Date au format ISO
 * @returns Date au format relatif
 */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Hier"
  } else {
    return formatDateFR(isoDate)
  }
}
