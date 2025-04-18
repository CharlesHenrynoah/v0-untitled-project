// Types partagés entre les différentes parties de l'application

// 1. Mission
export interface Mission {
  id: string // commun
  title: string // commun (ex. "M-2023-046 – Visite clients")
  date: string // ISO (2023-05-14)
  displayDate: string // format FR ("14/05/2023")
  type: string // commun ("Transfert", "Journée", …)
  departure: string // commun (au lieu de "from")
  destination: string // commun (au lieu de "to")
  driver: string // commun (nom du chauffeur)
  vehicle: string // commun
  status: MissionStatus // commun ("planned", "in-progress", "completed", "cancelled")
  cost?: number // **varie** : seulement pour Représentant
  passengers?: number // nombre de passagers (pour chauffeur)
  companyName?: string // nom de l'entreprise (pour chauffeur)
  contactPerson?: string // personne de contact (pour chauffeur)
  notes?: string // notes spécifiques (pour chauffeur)
  satisfaction?: number // satisfaction client (pour missions terminées)
  emissions?: number // émissions CO2 (pour missions terminées)
  profit?: number // bénéfice (pour missions terminées)
}

export type MissionStatus = "planned" | "in-progress" | "completed" | "cancelled"

// 2. Conversation
export interface Conversation {
  id: string // commun
  missionId: string // commun
  missionTitle: string // commun (même que title de Mission)
  missionSubtitle: string // commun (ex. lieu ou horaire)
  lastMessage: string // commun
  timestamp: string // commun (ISO)
  date: string // commun (displayDate ou "Aujourd'hui", "Hier")
  unread: number // commun
}

// 3. Message
export interface Message {
  id: string // commun
  senderId: string // commun (UID)
  senderName: string // commun
  senderRole: string // commun ("Chauffeur", "Représentant", "Client", …)
  content: string // commun
  timestamp: string // commun (ISO)
  time: string // commun (hh:mm)
  isCurrentUser: boolean // commun (pour l'affichage du chat)
  senderAvatar?: string // optionnel
  attachments?: {
    name: string
    url: string
    type: "image" | "document" | "other"
  }[]
}

// 4. Participant
export interface Participant {
  id: string // commun
  name: string // commun
  role: string // commun
  isOnline: boolean // commun
  avatar?: string // optionnel
  lastSeen?: string // optionnel ("Il y a X minutes")
}

// 5. DriverProfile (nouvel objet)
export interface DriverProfile {
  id: string
  name: string
  avatar?: string
  company: string
  companyLogo?: string
  position: string
  email: string
  phone: string
  address: string
  licenseNumber: string
  licenseExpiry: string
  vtcCardNumber: string
  vtcCardExpiry: string
  experience: string
  specializations: string[]
  languages: string[]
  overallRating: number // note globale
  missionsCompleted: number // KPI
  totalPassengers: number
  totalDistance: number
  certifications: {
    name: string
    issuer: string
    date: string
  }[]
}

// 6. NotificationSettings
export interface NotificationSettings {
  // canaux – communs aux deux
  email: boolean
  sms: boolean
  push: boolean

  // types de notif – **variations** par rôle
  // Chauffeur
  nouveauxMissions?: boolean
  missionUpdates?: boolean
  messages?: boolean
  appUpdates?: boolean

  // Représentant
  nouveauxMessages?: boolean
  missionChangements?: boolean
  rappels?: boolean
}

// 7. PrivacySettings
export interface PrivacySettings {
  showOnlineStatus: boolean // commun
  showReadReceipts: boolean // commun
  shareAnalytics: boolean // commun
  locationSharing?: boolean // pour chauffeur
  dataCollection?: boolean // pour chauffeur
}

// 8. DateFilter - helper commun pour les filtres de date
export type DateFilter = "all" | "today" | "week" | "month"

// 9. UserRole - rôles d'utilisateur dans l'application
export type UserRole = "chauffeur" | "représentant" | "gestionnaire" | "client"
