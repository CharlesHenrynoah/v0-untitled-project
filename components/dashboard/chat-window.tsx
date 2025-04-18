"use client"

import { useRef, useEffect } from "react"
import { type ChatGroup, useChatStore } from "@/components/dashboard/chat-store"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Paperclip } from "lucide-react"

interface ChatWindowProps {
  chat: ChatGroup
}

export default function ChatWindow({ chat }: ChatWindowProps) {
  const { chats } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUserId = "user-1" // ID de l'utilisateur connecté (représentant)

  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat.messages])

  // Fonction pour formater la date du message
  const formatMessageDate = (dateString: string) => {
    try {
      const date = new Date(dateString.replace(" ", "T"))
      return format(date, "d MMMM à HH:mm", { locale: fr })
    } catch (error) {
      return dateString
    }
  }

  // Fonction pour obtenir les informations de l'expéditeur
  const getSender = (senderId: string) => {
    return chat.participants.find((p) => p.id === senderId)
  }

  // Fonction pour regrouper les messages par date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: typeof chat.messages }[] = []

    chat.messages.forEach((message) => {
      const messageDate = message.timestamp.split(" ")[0]
      const existingGroup = groups.find((group) => group.date === messageDate)

      if (existingGroup) {
        existingGroup.messages.push(message)
      } else {
        groups.push({ date: messageDate, messages: [message] })
      }
    })

    return groups
  }

  const messageGroups = groupMessagesByDate()

  return (
    <div className="flex flex-col h-[500px] overflow-y-auto p-4">
      {messageGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {formatMessageDate(group.date).split(" à")[0]}
            </span>
          </div>

          {group.messages.map((message, index) => {
            const sender = getSender(message.senderId)
            const isCurrentUser = message.senderId === currentUserId

            return (
              <div key={message.id} className={cn("mb-4 flex", isCurrentUser ? "justify-end" : "justify-start")}>
                {!isCurrentUser && (
                  <div className="mr-2 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        src={sender?.avatar || "/placeholder.svg?height=32&width=32&query=user"}
                        alt={sender?.name || "Utilisateur"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={cn("max-w-[70%]")}>
                  {!isCurrentUser && (
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      {sender?.name || "Utilisateur"} • {sender?.role}
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-lg p-3",
                      isCurrentUser ? "bg-lime-500 text-navy-900" : "bg-gray-100 text-gray-800",
                    )}
                  >
                    <p className="text-sm">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment, i) => (
                          <div key={i} className="mt-1 flex items-center rounded bg-white bg-opacity-20 p-1 text-xs">
                            <Paperclip className="mr-1 h-3 w-3" />
                            <span className="truncate">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className={cn(
                        "mt-1 text-right text-xs",
                        isCurrentUser ? "text-navy-900 text-opacity-70" : "text-gray-500",
                      )}
                    >
                      {formatMessageDate(message.timestamp).split(" à")[1]}
                      {isCurrentUser && <span className="ml-1">{message.read ? "✓✓" : "✓"}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
