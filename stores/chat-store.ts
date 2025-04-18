import { create } from "zustand"
import type { Conversation, Message, Participant } from "@/types/shared"

interface ChatStore {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  messages: Message[]
  participants: Participant[]
  setSelectedConversation: (conversationId: string | null) => void
  sendMessage: (content: string) => void
  markAsRead: (conversationId: string) => void
  searchConversations: (query: string) => Conversation[]
  filterConversations: (filter: "all" | "unread") => Conversation[]
}

// Données fictives pour initialiser le store
const initialConversations: Conversation[] = [
  {
    id: "C001",
    missionId: "M-2023-049",
    missionTitle: "M-2023-049",
    missionSubtitle: "Transfert Aéroport",
    lastMessage: "Invité International: L'avion a 30 minutes de retard",
    timestamp: "2023-04-27T10:30:00",
    date: "27/04/2023",
    unread: 1,
  },
  {
    id: "C002",
    missionId: "M-2023-046",
    missionTitle: "M-2023-046 - Visite clients",
    missionSubtitle: "Aujourd'hui à 14:30",
    lastMessage: "Le chauffeur sera là dans 10 minutes",
    timestamp: "2023-05-14T14:25:00",
    date: "Aujourd'hui",
    unread: 0,
  },
  {
    id: "C003",
    missionId: "M001",
    missionTitle: "M001 - Excursion groupe scolaire",
    missionSubtitle: "15/05/2023",
    lastMessage: "Nous serons 28 élèves et 3 accompagnateurs",
    timestamp: "2023-05-13T08:45:00",
    date: "Hier",
    unread: 0,
  },
  {
    id: "C004",
    missionId: "M-2023-044",
    missionTitle: "M-2023-044",
    missionSubtitle: "Excursion journée",
    lastMessage: "Merci pour votre professionnalisme !",
    timestamp: "2023-05-12T16:20:00",
    date: "12/05/2023",
    unread: 0,
  },
]

// Mapping des messages par conversation
const messagesMap: Record<string, Message[]> = {
  "M-2023-046": [
    {
      id: "MSG001",
      senderId: "U001",
      senderName: "Thomas Dubois",
      senderRole: "Représentant",
      content: "Est-ce que le chauffeur pourrait arriver 15 minutes plus tôt ?",
      timestamp: "2023-05-14T11:05:00",
      time: "11:05",
      isCurrentUser: false,
    },
    {
      id: "MSG002",
      senderId: "U003",
      senderName: "Sophie Martin",
      senderRole: "Chauffeur",
      content: "Le chauffeur sera là dans 10 minutes",
      timestamp: "2023-05-14T14:25:00",
      time: "14:25",
      isCurrentUser: true,
    },
  ],
  M001: [
    {
      id: "MSG003",
      senderId: "U005",
      senderName: "Marie Dupont",
      senderRole: "Responsable groupe",
      content: "Bonjour, nous serons 28 élèves et 3 accompagnateurs pour l'excursion de demain.",
      timestamp: "2023-05-13T08:45:00",
      time: "08:45",
      isCurrentUser: false,
    },
    {
      id: "MSG004",
      senderId: "U003",
      senderName: "Thomas Dubois",
      senderRole: "Chauffeur",
      content:
        "Bonjour, merci pour l'information. J'ai bien noté le nombre de participants. Je serai à l'école à 7h45 pour un départ à 8h00 comme prévu.",
      timestamp: "2023-05-13T09:15:00",
      time: "09:15",
      isCurrentUser: true,
    },
    {
      id: "MSG005",
      senderId: "U005",
      senderName: "Marie Dupont",
      senderRole: "Responsable groupe",
      content: "Parfait, merci pour votre ponctualité. Les enfants sont très excités pour cette sortie!",
      timestamp: "2023-05-13T10:30:00",
      time: "10:30",
      isCurrentUser: false,
    },
  ],
}

// Mapping des participants par conversation
const participantsMap: Record<string, Participant[]> = {
  "M-2023-046": [
    {
      id: "U001",
      name: "Thomas Dubois",
      role: "Représentant",
      isOnline: true,
    },
    {
      id: "U002",
      name: "Marie Lefevre",
      role: "Gestionnaire",
      isOnline: false,
      lastSeen: "Il y a 1 heure",
    },
    {
      id: "U003",
      name: "Sophie Martin",
      role: "Chauffeur",
      isOnline: true,
    },
    {
      id: "U004",
      name: "Client Entreprise",
      role: "Client",
      isOnline: false,
      lastSeen: "Il y a 30 minutes",
    },
  ],
  M001: [
    {
      id: "U003",
      name: "Thomas Dubois",
      role: "Chauffeur",
      isOnline: true,
    },
    {
      id: "U005",
      name: "Marie Dupont",
      role: "Responsable groupe",
      isOnline: false,
      lastSeen: "Il y a 3 heures",
    },
    {
      id: "U006",
      name: "École Primaire Saint-Michel",
      role: "Client",
      isOnline: false,
    },
  ],
}

// Créer le store
export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: initialConversations,
  selectedConversation: null,
  messages: [],
  participants: [],

  setSelectedConversation: (missionId: string | null) => {
    if (!missionId) {
      set({
        selectedConversation: null,
        messages: [],
        participants: [],
      })
      return
    }

    const conversation = get().conversations.find((c) => c.missionId === missionId) || null

    if (conversation) {
      // Marquer comme lu
      set((state) => ({
        conversations: state.conversations.map((c) => (c.id === conversation.id ? { ...c, unread: 0 } : c)),
        selectedConversation: conversation,
        messages: messagesMap[missionId] || [],
        participants: participantsMap[missionId] || [],
      }))
    } else {
      set({
        selectedConversation: null,
        messages: [],
        participants: [],
      })
    }
  },

  sendMessage: (content: string) => {
    const { selectedConversation } = get()
    if (!selectedConversation) return

    const newMessage: Message = {
      id: `MSG${Date.now()}`,
      senderId: "U003", // ID du chauffeur
      senderName: "Thomas Dubois",
      senderRole: "Chauffeur",
      content,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    }

    set((state) => ({
      messages: [...state.messages, newMessage],
      conversations: state.conversations.map((c) =>
        c.id === selectedConversation.id
          ? {
              ...c,
              lastMessage: `Thomas Dubois: ${content}`,
              timestamp: new Date().toISOString(),
              date: "Aujourd'hui",
            }
          : c,
      ),
    }))
  },

  markAsRead: (conversationId: string) => {
    set((state) => ({
      conversations: state.conversations.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c)),
    }))
  },

  searchConversations: (query: string) => {
    const { conversations } = get()
    if (!query.trim()) return conversations

    return conversations.filter(
      (c) =>
        c.missionTitle.toLowerCase().includes(query.toLowerCase()) ||
        c.missionSubtitle.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(query.toLowerCase()),
    )
  },

  filterConversations: (filter: "all" | "unread") => {
    const { conversations } = get()
    if (filter === "all") return conversations
    return conversations.filter((c) => c.unread > 0)
  },
}))
