"use client"

import type { Participant } from "@/components/dashboard/chat-store"
import { cn } from "@/lib/utils"

interface ChatParticipantsProps {
  participants: Participant[]
}

export default function ChatParticipants({ participants }: ChatParticipantsProps) {
  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-amber-500"
      case "offline":
      default:
        return "bg-gray-400"
    }
  }

  // Fonction pour obtenir le libellé du rôle
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "client":
        return "Client"
      case "chauffeur":
        return "Chauffeur"
      case "gestionnaire":
        return "Gestionnaire"
      case "représentant":
        return "Représentant"
      default:
        return role.charAt(0).toUpperCase() + role.slice(1)
    }
  }

  // Trier les participants par rôle
  const sortedParticipants = [...participants].sort((a, b) => {
    const roleOrder: Record<string, number> = {
      représentant: 1,
      gestionnaire: 2,
      chauffeur: 3,
      client: 4,
    }
    return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99)
  })

  return (
    <div className="space-y-4">
      {sortedParticipants.map((participant) => (
        <div key={participant.id} className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={participant.avatar || "/placeholder.svg?height=40&width=40&query=user"}
                alt={participant.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                getStatusColor(participant.status),
              )}
            />
          </div>
          <div>
            <div className="font-medium">{participant.name}</div>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">{getRoleLabel(participant.role)}</span>
              {participant.status !== "online" && <span>• {participant.lastSeen}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
