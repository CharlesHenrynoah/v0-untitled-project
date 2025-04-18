"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Paperclip, Send } from "lucide-react"
import "@/app/chat-theme.css"
import type { Conversation, Message, Participant } from "@/types/shared"

export default function ChauffeurChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const missionId = searchParams.get("mission")
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [showParticipants, setShowParticipants] = useState(false)

  // Données fictives des conversations
  useEffect(() => {
    setConversations([
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
    ])
  }, [])

  // Données fictives des messages
  useEffect(() => {
    if (missionId) {
      if (missionId === "M-2023-046") {
        setMessages([
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
        ])

        setParticipants([
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
        ])
      } else if (missionId === "M001") {
        // Messages pour la mission M001
        setMessages([
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
        ])

        setParticipants([
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
        ])
      } else {
        // Messages par défaut pour les autres conversations
        setMessages([
          {
            id: "MSG001",
            senderId: "U001",
            senderName: "Marie Dubois",
            senderRole: "Responsable groupe",
            content: "Bonjour, pouvez-vous confirmer l'heure de départ pour notre excursion ?",
            timestamp: "2023-05-14T10:30:00",
            time: "10:30",
            isCurrentUser: false,
          },
          {
            id: "MSG002",
            senderId: "U003",
            senderName: "Thomas Dubois",
            senderRole: "Chauffeur",
            content: "Bonjour, je serai à l'école à 7h45 pour un départ à 8h00 précises.",
            timestamp: "2023-05-14T10:35:00",
            time: "10:35",
            isCurrentUser: true,
          },
        ])

        setParticipants([
          {
            id: "U001",
            name: "Marie Dubois",
            role: "Responsable groupe",
            isOnline: true,
          },
          {
            id: "U003",
            name: "Thomas Dubois",
            role: "Chauffeur",
            isOnline: true,
          },
          {
            id: "U004",
            name: "Groupe Scolaire",
            role: "Client",
            isOnline: false,
          },
        ])
      }
    } else {
      setMessages([])
      setParticipants([])
    }
  }, [missionId])

  const filteredConversations = conversations.filter((conversation) => {
    if (activeTab === "unread" && conversation.unread === 0) return false
    return conversation.missionTitle.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSendMessage = () => {
    if (!newMessage.trim() || !missionId) return

    const newMsg: Message = {
      id: `MSG${Date.now()}`,
      senderId: "U003",
      senderName: "Thomas Dubois",
      senderRole: "Chauffeur",
      content: newMessage,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleConversationClick = (missionId: string) => {
    router.push(`/espacechauffeur/chat?mission=${missionId}`)
  }

  const handleBackToList = () => {
    router.push("/espacechauffeur/chat")
  }

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants)
  }

  return (
    <div className="chat-container">
      <h1 className="text-4xl font-bold p-6">Messagerie</h1>

      {!missionId ? (
        // Vue liste des conversations
        <div className="chat-card mx-4 mb-4">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2">Conversations</h2>
            <p className="text-muted-foreground mb-6">Vos conversations par mission</p>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une conversation..."
                className="chat-input pl-10 py-6 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex mb-4 border-b border-border">
              <button className={`chat-tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
                Toutes
              </button>
              <button
                className={`chat-tab ${activeTab === "unread" ? "active" : ""}`}
                onClick={() => setActiveTab("unread")}
              >
                Non lues
              </button>
            </div>

            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`chat-conversation-item p-4 rounded-lg cursor-pointer`}
                  onClick={() => handleConversationClick(conversation.missionId)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg">{conversation.missionTitle}</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">{conversation.date}</span>
                      {conversation.unread > 0 && <span className="chat-badge ml-2">{conversation.unread}</span>}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">{conversation.missionSubtitle}</p>
                  <p className="text-base">{conversation.lastMessage}</p>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">Aucune conversation trouvée</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Vue conversation
        <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] mx-4 gap-4">
          <div className={`chat-card flex-1 flex flex-col ${showParticipants ? "md:w-2/3" : "w-full"}`}>
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  {conversations.find((c) => c.missionId === missionId)?.missionTitle || missionId}
                </h2>
                <p className="text-muted-foreground">
                  {conversations.find((c) => c.missionId === missionId)?.missionSubtitle || ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="md:hidden" onClick={toggleParticipants}>
                  Participants
                </Button>
                <Button variant="ghost" onClick={handleBackToList} className="md:hidden">
                  Retour
                </Button>
                <Button variant="outline" onClick={toggleParticipants} className="hidden md:flex">
                  Participants
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className="mb-6">
                  <div className="flex items-start gap-3">
                    {!message.isCurrentUser && (
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col ${message.isCurrentUser ? "items-end" : "items-start"} flex-1`}>
                      {!message.isCurrentUser && (
                        <div className="flex items-center mb-1">
                          <span className="font-medium">{message.senderName}</span>
                          <span className="text-xs text-muted-foreground ml-2">• {message.senderRole}</span>
                        </div>
                      )}
                      <div className="flex items-end gap-2">
                        <div className={`chat-message-bubble ${message.isCurrentUser ? "sent" : "received"}`}>
                          {message.content}
                        </div>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                    </div>
                    {message.isCurrentUser && (
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 flex items-center gap-2">
              <button className="chat-attachment-button">
                <Paperclip className="h-5 w-5" />
              </button>
              <Input
                placeholder="Écrivez votre message..."
                className="chat-input py-6 text-base"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <button className="chat-send-button" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {(showParticipants || window.innerWidth >= 768) && (
            <div className="chat-card md:w-1/3 flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-2xl font-bold">Participants</h2>
                <p className="text-muted-foreground">Membres de cette conversation</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{participant.name}</h3>
                        <p className="text-muted-foreground flex items-center">
                          {participant.role}
                          {participant.lastSeen && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{participant.lastSeen}</span>
                            </>
                          )}
                        </p>
                      </div>
                      {participant.isOnline && <div className="chat-online-indicator ml-auto"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
