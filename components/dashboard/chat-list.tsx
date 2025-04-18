"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useChatStore, type ChatGroup } from "@/components/dashboard/chat-store"
import { cn } from "@/lib/utils"

interface ChatListProps {
  searchQuery?: string
  filter?: "all" | "unread"
}

export default function ChatList({ searchQuery = "", filter = "all" }: ChatListProps) {
  const { chats, selectedChat, setSelectedChat, markAsRead } = useChatStore()
  const [filteredChats, setFilteredChats] = useState<ChatGroup[]>(chats)

  // Filtrer les chats en fonction de la recherche
  useEffect(() => {
    let filtered = chats

    // Filtrer par statut de lecture
    if (filter === "unread") {
      filtered = filtered.filter((chat) => chat.unread > 0)
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (chat) =>
          chat.missionId.toLowerCase().includes(query) ||
          chat.missionName.toLowerCase().includes(query) ||
          chat.participants.some((p) => p.name.toLowerCase().includes(query)),
      )
    }

    setFilteredChats(filtered)
  }, [searchQuery, chats, filter])

  const handleSelectChat = (chat: ChatGroup) => {
    setSelectedChat(chat)
    markAsRead(chat.id)
  }

  // Fonction pour obtenir le nom du dernier expéditeur
  const getLastSenderName = (chat: ChatGroup) => {
    if (chat.messages.length === 0) return ""
    const lastMessage = chat.messages[chat.messages.length - 1]
    const sender = chat.participants.find((p) => p.id === lastMessage.senderId)
    return sender ? sender.name : "Inconnu"
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex cursor-pointer items-start border-b p-4 hover:bg-gray-50",
              selectedChat?.id === chat.id && "bg-gray-50",
            )}
            onClick={() => handleSelectChat(chat)}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-navy-900">{chat.missionId}</h4>
                <span className="text-xs text-gray-500">{chat.lastActivity}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{chat.missionName}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">
                <span className="font-medium">{getLastSenderName(chat)}:</span> {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && <Badge className="ml-2 bg-lime-500 text-navy-900">{chat.unread}</Badge>}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">Aucune conversation trouvée</div>
      )}
    </div>
  )
}
