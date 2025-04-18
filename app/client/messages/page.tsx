"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClientMessages() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)

  // Données fictives pour les conversations
  const conversations = [
    {
      id: "conv1",
      title: "R-2023-089 - Transfert aéroport",
      lastMessage: "Bonjour, je serai à l'heure pour votre transfert demain.",
      timestamp: "10:42",
      unread: 1,
      participants: [
        { id: "driver1", name: "Thomas Dubois", role: "Chauffeur", isOnline: true },
        { id: "client1", name: "Vous", role: "Client", isOnline: true },
        { id: "manager1", name: "Marie Lefevre", role: "Gestionnaire de flottes", isOnline: false },
        { id: "rep1", name: "Jean Martin", role: "Responsable entreprise", isOnline: false },
      ],
      messages: [
        {
          id: "msg1",
          senderId: "driver1",
          senderName: "Thomas Dubois",
          content:
            "Bonjour, je serai votre chauffeur pour demain. Je confirme le rendez-vous à l'aéroport Charles de Gaulle à 9h30.",
          timestamp: "Aujourd'hui, 10:30",
          isCurrentUser: false,
        },
        {
          id: "msg2",
          senderId: "client1",
          senderName: "Vous",
          content: "Merci pour la confirmation. Je serai au terminal 2E, sortie A.",
          timestamp: "Aujourd'hui, 10:35",
          isCurrentUser: true,
        },
        {
          id: "msg3",
          senderId: "driver1",
          senderName: "Thomas Dubois",
          content: "Parfait, je serai à l'heure pour votre transfert demain. N'hésitez pas si vous avez des questions.",
          timestamp: "Aujourd'hui, 10:42",
          isCurrentUser: false,
        },
      ],
    },
    {
      id: "conv2",
      title: "R-2023-076 - Transfert hôtel",
      lastMessage: "Votre trajet s'est-il bien passé ?",
      timestamp: "Hier",
      unread: 0,
      participants: [
        { id: "driver2", name: "Sophie Martin", role: "Chauffeur", isOnline: false },
        { id: "client1", name: "Vous", role: "Client", isOnline: true },
        { id: "manager1", name: "Marie Lefevre", role: "Gestionnaire de flottes", isOnline: false },
        { id: "rep1", name: "Jean Martin", role: "Responsable entreprise", isOnline: false },
      ],
      messages: [
        {
          id: "msg1",
          senderId: "driver2",
          senderName: "Sophie Martin",
          content: "Bonjour, je suis arrivée à l'hôtel Marriott. Je vous attends à l'entrée principale.",
          timestamp: "22/04/2023, 13:50",
          isCurrentUser: false,
        },
        {
          id: "msg2",
          senderId: "client1",
          senderName: "Vous",
          content: "Merci, je descends dans 5 minutes.",
          timestamp: "22/04/2023, 13:52",
          isCurrentUser: true,
        },
        {
          id: "msg3",
          senderId: "driver2",
          senderName: "Sophie Martin",
          content: "Votre trajet s'est-il bien passé ?",
          timestamp: "22/04/2023, 15:30",
          isCurrentUser: false,
        },
      ],
    },
  ]

  const activeConvo = conversations.find((c) => c.id === activeConversation)

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>

      <div className="grid h-full grid-cols-1 md:grid-cols-3 gap-4">
        {/* Liste des conversations */}
        <Card className={cn("overflow-hidden", activeConversation && "hidden md:block")}>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-12rem)] overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-900 transition-colors",
                    activeConversation === conversation.id && "bg-gray-50 dark:bg-navy-900",
                  )}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{conversation.title}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <div className="mt-2 flex justify-end">
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-lime-500 rounded-full">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation active */}
        {activeConversation ? (
          <Card className="md:col-span-2 overflow-hidden">
            <CardContent className="p-0 flex flex-col h-[calc(100vh-12rem)]">
              {/* En-tête de la conversation */}
              <div className="p-4 border-b flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 md:hidden"
                  onClick={() => setActiveConversation(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h3 className="font-medium">{activeConvo?.title}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConvo?.participants.find((p) => p.role === "Chauffeur")?.name} - Chauffeur
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConvo?.messages.map((message) => (
                  <div key={message.id} className={cn("flex", message.isCurrentUser ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.isCurrentUser ? "bg-lime-500 text-white" : "bg-gray-100 dark:bg-navy-800",
                      )}
                    >
                      {!message.isCurrentUser && (
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saisie de message */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Écrivez votre message..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2 hidden md:flex items-center justify-center">
            <CardContent className="text-center p-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-navy-800 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Sélectionnez une conversation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choisissez une conversation dans la liste pour afficher les messages.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Composant MessageSquare importé localement pour éviter les erreurs
function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
