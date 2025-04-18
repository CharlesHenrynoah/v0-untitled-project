"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Paperclip, Send, ArrowLeft } from "lucide-react"
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
      // Participants standard pour toutes les conversations
      const standardParticipants = [
        {
          id: "U001",
          name: "Thomas Dubois",
          role: "chauffeur",
          status: "online",
          avatar: "/abstract-geometric-TD.png",
        },
        {
          id: "U002",
          name: "Marie Lefevre",
          role: "gestionnaire",
          status: "away",
          lastSeen: "Il y a 1 heure",
          avatar: "/machine-learning-concept.png",
        },
        {
          id: "U003",
          name: "Jean Martin",
          role: "représentant",
          status: "online",
          avatar: "/abstract-jm.png",
        },
        {
          id: "U004",
          name: "Client Entreprise",
          role: "client",
          status: "offline",
          lastSeen: "Il y a 30 minutes",
          avatar: "/circuit-elements.png",
        },
      ]

      setParticipants(standardParticipants)

      if (missionId === "M-2023-046") {
        setMessages([
          {
            id: "MSG001",
            senderId: "U003",
            senderName: "Jean Martin",
            senderRole: "Représentant",
            content: "Est-ce que le chauffeur pourrait arriver 15 minutes plus tôt ?",
            timestamp: "2023-05-14T11:05:00",
            time: "11:05",
            isCurrentUser: false,
          },
          {
            id: "MSG002",
            senderId: "U001",
            senderName: "Thomas Dubois",
            senderRole: "Chauffeur",
            content: "Le chauffeur sera là dans 10 minutes",
            timestamp: "2023-05-14T14:25:00",
            time: "14:25",
            isCurrentUser: true,
          },
        ])
      } else if (missionId === "M001") {
        // Messages pour la mission M001
        setMessages([
          {
            id: "MSG003",
            senderId: "U004",
            senderName: "Marie Dupont",
            senderRole: "Responsable groupe",
            content: "Bonjour, nous serons 28 élèves et 3 accompagnateurs pour l'excursion de demain.",
            timestamp: "2023-05-13T08:45:00",
            time: "08:45",
            isCurrentUser: false,
          },
          {
            id: "MSG004",
            senderId: "U001",
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
            senderId: "U004",
            senderName: "Marie Dupont",
            senderRole: "Responsable groupe",
            content: "Parfait, merci pour votre ponctualité. Les enfants sont très excités pour cette sortie!",
            timestamp: "2023-05-13T10:30:00",
            time: "10:30",
            isCurrentUser: false,
          },
        ])
      } else {
        // Messages par défaut pour les autres conversations
        setMessages([
          {
            id: "MSG001",
            senderId: "U004",
            senderName: "Marie Dubois",
            senderRole: "Responsable groupe",
            content: "Bonjour, pouvez-vous confirmer l'heure de départ pour notre excursion ?",
            timestamp: "2023-05-14T10:30:00",
            time: "10:30",
            isCurrentUser: false,
          },
          {
            id: "MSG002",
            senderId: "U001",
            senderName: "Thomas Dubois",
            senderRole: "Chauffeur",
            content: "Bonjour, je serai à l'école à 7h45 pour un départ à 8h00 précises.",
            timestamp: "2023-05-14T10:35:00",
            time: "10:35",
            isCurrentUser: true,
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
      senderId: "U001",
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

  return (
    <div className="chat-container bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold p-6">Chat</h1>

      {!missionId ? (
        // Vue liste des conversations
        <div className="chat-card mx-4 mb-4 shadow-lg rounded-xl border border-gray-700 bg-gray-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Conversations</h2>
            <p className="text-gray-400 mb-6">Vos conversations par mission</p>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher une conversation..."
                className="chat-input pl-10 py-6 text-base border-gray-600 bg-gray-700 focus:border-lime-500 focus:ring-lime-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex mb-4 border-b border-gray-700">
              <button
                className={`chat-tab px-4 py-2 font-medium ${activeTab === "all" ? "text-lime-400 border-b-2 border-lime-500" : "text-gray-400 hover:text-white"}`}
                onClick={() => setActiveTab("all")}
              >
                Toutes
              </button>
              <button
                className={`chat-tab px-4 py-2 font-medium ${activeTab === "unread" ? "text-lime-400 border-b-2 border-lime-500" : "text-gray-400 hover:text-white"}`}
                onClick={() => setActiveTab("unread")}
              >
                Non lues
              </button>
            </div>

            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`chat-conversation-item p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700 border border-gray-700 hover:border-lime-700 ${conversation.unread > 0 ? "bg-gray-700" : ""}`}
                  onClick={() => handleConversationClick(conversation.missionId)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg">{conversation.missionTitle}</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">{conversation.date}</span>
                      {conversation.unread > 0 && (
                        <span className="chat-badge ml-2 bg-lime-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{conversation.missionSubtitle}</p>
                  <p className="text-base truncate">{conversation.lastMessage}</p>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-gray-400 bg-gray-700 rounded-lg">Aucune conversation trouvée</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Vue conversation
        <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] mx-4 gap-4">
          <div className="chat-card flex-1 flex flex-col rounded-xl shadow-lg border border-gray-700 bg-gray-800 md:w-2/3">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-700 rounded-t-xl">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={handleBackToList}
                  className="hover:bg-gray-600 text-white p-2 rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">
                    {conversations.find((c) => c.missionId === missionId)?.missionTitle || missionId}
                  </h2>
                  <p className="text-gray-400">
                    {conversations.find((c) => c.missionId === missionId)?.missionSubtitle || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
              {messages.map((message) => (
                <div key={message.id} className="mb-6">
                  <div className="flex items-start gap-3">
                    {!message.isCurrentUser && (
                      <Avatar className="h-10 w-10 mt-1 border-2 border-gray-600">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-600 text-white">
                          {message.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col ${message.isCurrentUser ? "items-end" : "items-start"} flex-1`}>
                      {!message.isCurrentUser && (
                        <div className="flex items-center mb-1">
                          <span className="font-medium">{message.senderName}</span>
                          <span className="text-xs text-gray-400 ml-2">• {message.senderRole}</span>
                        </div>
                      )}
                      <div className="flex items-end gap-2">
                        <div
                          className={`chat-message-bubble ${message.isCurrentUser ? "bg-lime-500 text-black rounded-tr-none" : "bg-gray-700 text-white rounded-tl-none"} p-3 rounded-2xl shadow-sm max-w-[80%]`}
                        >
                          {message.content}
                        </div>
                        <span className="text-xs text-gray-400">{message.time}</span>
                      </div>
                    </div>
                    {message.isCurrentUser && (
                      <Avatar className="h-10 w-10 mt-1 border-2 border-lime-700">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-lime-600 text-white">
                          {message.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 flex items-center gap-2 bg-gray-700 rounded-b-xl border-t border-gray-600">
              <button className="chat-attachment-button p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Paperclip className="h-5 w-5 text-white" />
              </button>
              <Input
                placeholder="Écrivez votre message..."
                className="chat-input py-6 text-base border-gray-600 bg-gray-800 focus:border-lime-500 focus:ring-lime-500 rounded-full text-white"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <button
                className={`chat-send-button p-3 rounded-full ${newMessage.trim() ? "bg-lime-500 hover:bg-lime-600" : "bg-gray-600"} transition-colors`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

          <div className="chat-card md:w-1/3 flex flex-col rounded-xl shadow-lg border border-gray-700 bg-gray-800">
            <div className="p-4 border-b border-gray-700 bg-gray-700 rounded-t-xl">
              <h2 className="text-2xl font-bold">Participants</h2>
              <p className="text-gray-400">Membres de cette conversation</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Avatar className="h-12 w-12 border-2 border-gray-600">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-600 text-white">{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{participant.name}</h3>
                      <p className="text-gray-400 flex items-center">
                        {participant.role === "chauffeur"
                          ? "Chauffeur"
                          : participant.role === "gestionnaire"
                            ? "Gestionnaire de flottes"
                            : participant.role === "représentant"
                              ? "Responsable entreprise"
                              : participant.role === "client"
                                ? "Client"
                                : participant.role}
                        {participant.status !== "online" && participant.lastSeen && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{participant.lastSeen}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <div
                      className={`ml-auto h-3 w-3 rounded-full ${
                        participant.status === "online"
                          ? "bg-green-500"
                          : participant.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      } ring-2 ring-gray-800`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
