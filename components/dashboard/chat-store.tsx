"use client"

import { create } from "zustand"

export type ParticipantRole = "client" | "gestionnaire" | "chauffeur" | "représentant"

export interface Participant {
  id: string
  name: string
  role: ParticipantRole
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
  attachments?: {
    name: string
    url: string
    type: "image" | "document" | "other"
  }[]
}

export interface ChatGroup {
  id: string
  missionId: string
  missionName: string
  lastMessage: string
  lastActivity: string
  unread: number
  participants: Participant[]
  messages: Message[]
}

interface ChatStore {
  chats: ChatGroup[]
  selectedChat: ChatGroup | null
  setSelectedChat: (chat: ChatGroup | null) => void
  sendMessage: (chatId: string, content: string, senderId: string) => void
  markAsRead: (chatId: string) => void
}

// Données fictives pour les chats
const initialChats: ChatGroup[] = [
  {
    id: "chat-1",
    missionId: "M-2023-046",
    missionName: "Visite clients",
    lastMessage: "Le chauffeur sera là dans 10 minutes",
    lastActivity: "Aujourd'hui à 14:30",
    unread: 2,
    participants: [
      {
        id: "user-1",
        name: "Thomas Dubois",
        role: "représentant",
        avatar: "/abstract-geometric-TD.png",
        status: "online",
      },
      {
        id: "user-2",
        name: "Sophie Martin",
        role: "chauffeur",
        avatar: "/abstract-geometric-sm.png",
        status: "online",
      },
      {
        id: "user-3",
        name: "Marie Lefevre",
        role: "gestionnaire",
        avatar: "/machine-learning-concept.png",
        status: "offline",
        lastSeen: "Il y a 1 heure",
      },
      {
        id: "user-4",
        name: "Client Entreprise",
        role: "client",
        avatar: "/circuit-elements.png",
        status: "away",
        lastSeen: "Il y a 30 minutes",
      },
    ],
    messages: [
      {
        id: "msg-1",
        senderId: "user-3",
        content: "Bonjour, la mission est confirmée pour demain à 9h00.",
        timestamp: "2023-04-27 10:15",
        read: true,
      },
      {
        id: "msg-2",
        senderId: "user-1",
        content: "Parfait, merci pour la confirmation.",
        timestamp: "2023-04-27 10:20",
        read: true,
      },
      {
        id: "msg-3",
        senderId: "user-4",
        content: "Est-ce que le chauffeur pourrait arriver 15 minutes plus tôt ?",
        timestamp: "2023-04-27 11:05",
        read: true,
      },
      {
        id: "msg-4",
        senderId: "user-2",
        content: "Oui, je peux être là à 8h45 sans problème.",
        timestamp: "2023-04-27 11:10",
        read: true,
      },
      {
        id: "msg-5",
        senderId: "user-4",
        content: "Merci beaucoup !",
        timestamp: "2023-04-27 11:12",
        read: true,
      },
      {
        id: "msg-6",
        senderId: "user-2",
        content: "Le chauffeur sera là dans 10 minutes",
        timestamp: "2023-04-28 14:25",
        read: false,
      },
    ],
  },
  {
    id: "chat-2",
    missionId: "M-2023-048",
    missionName: "Visite clients Paris",
    lastMessage: "Nous sommes arrivés à l'hôtel",
    lastActivity: "Hier à 18:45",
    unread: 0,
    participants: [
      {
        id: "user-1",
        name: "Thomas Dubois",
        role: "représentant",
        avatar: "/abstract-geometric-TD.png",
        status: "online",
      },
      {
        id: "user-5",
        name: "Jean Dupont",
        role: "chauffeur",
        avatar: "/green-tractor-field.png",
        status: "offline",
        lastSeen: "Hier",
      },
      {
        id: "user-3",
        name: "Marie Lefevre",
        role: "gestionnaire",
        avatar: "/machine-learning-concept.png",
        status: "offline",
        lastSeen: "Il y a 1 heure",
      },
      {
        id: "user-6",
        name: "Entreprise Parisienne",
        role: "client",
        avatar: "/placeholder.svg?height=40&width=40&query=EP",
        status: "offline",
        lastSeen: "Hier",
      },
    ],
    messages: [
      {
        id: "msg-7",
        senderId: "user-1",
        content: "Bonjour à tous, nous partons demain pour Paris.",
        timestamp: "2023-05-01 09:00",
        read: true,
      },
      {
        id: "msg-8",
        senderId: "user-5",
        content: "Je serai à l'adresse indiquée à 7h00 précises.",
        timestamp: "2023-05-01 09:15",
        read: true,
      },
      {
        id: "msg-9",
        senderId: "user-6",
        content: "Nous vous attendrons à l'accueil de notre siège à 11h00.",
        timestamp: "2023-05-01 10:30",
        read: true,
      },
      {
        id: "msg-10",
        senderId: "user-5",
        content: "Nous sommes arrivés à l'hôtel",
        timestamp: "2023-05-02 18:45",
        read: true,
      },
    ],
  },
  {
    id: "chat-3",
    missionId: "M-2023-049",
    missionName: "Transfert Aéroport",
    lastMessage: "L'avion a 30 minutes de retard",
    lastActivity: "27/04/2023",
    unread: 1,
    participants: [
      {
        id: "user-1",
        name: "Thomas Dubois",
        role: "représentant",
        avatar: "/abstract-geometric-TD.png",
        status: "online",
      },
      {
        id: "user-2",
        name: "Sophie Martin",
        role: "chauffeur",
        avatar: "/abstract-geometric-sm.png",
        status: "online",
      },
      {
        id: "user-3",
        name: "Marie Lefevre",
        role: "gestionnaire",
        avatar: "/machine-learning-concept.png",
        status: "offline",
        lastSeen: "Il y a 1 heure",
      },
      {
        id: "user-7",
        name: "Invité International",
        role: "client",
        avatar: "/placeholder.svg?height=40&width=40&query=II",
        status: "offline",
        lastSeen: "27/04/2023",
      },
    ],
    messages: [
      {
        id: "msg-11",
        senderId: "user-3",
        content: "Transfert prévu pour le 05/05 à 14h30 depuis l'aéroport.",
        timestamp: "2023-04-25 11:00",
        read: true,
      },
      {
        id: "msg-12",
        senderId: "user-7",
        content: "Merci, je vous confirme mon numéro de vol : AF1234.",
        timestamp: "2023-04-25 15:20",
        read: true,
      },
      {
        id: "msg-13",
        senderId: "user-2",
        content: "Je serai à l'aéroport à l'heure prévue. J'aurai une pancarte avec votre nom.",
        timestamp: "2023-04-26 09:45",
        read: true,
      },
      {
        id: "msg-14",
        senderId: "user-7",
        content: "L'avion a 30 minutes de retard",
        timestamp: "2023-04-27 13:10",
        read: false,
      },
    ],
  },
]

export const useChatStore = create<ChatStore>((set) => ({
  chats: initialChats,
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  sendMessage: (chatId, content, senderId) =>
    set((state) => {
      const now = new Date()
      const timestamp = now.toISOString().slice(0, 16).replace("T", " ")

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId,
        content,
        timestamp,
        read: false,
      }

      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: content,
            lastActivity: "À l'instant",
          }
        }
        return chat
      })

      return { chats: updatedChats }
    }),
  markAsRead: (chatId) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            unread: 0,
            messages: chat.messages.map((msg) => ({ ...msg, read: true })),
          }
        }
        return chat
      })

      return { chats: updatedChats }
    }),
}))
