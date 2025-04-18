"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SearchIcon, Send, Paperclip, User, Users, ArrowLeft } from "lucide-react"
import ChatList from "@/components/dashboard/chat-list"
import ChatWindow from "@/components/dashboard/chat-window"
import ChatParticipants from "@/components/dashboard/chat-participants"
import { useChatStore } from "@/components/dashboard/chat-store"

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { selectedChat, setSelectedChat } = useChatStore()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">Chat</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Liste des conversations */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Conversations par mission</CardDescription>
            <div className="relative mt-2">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une conversation..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="unread">Non lues</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0">
                <ChatList searchQuery={searchQuery} />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <ChatList searchQuery={searchQuery} filter="unread" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Fenêtre de chat */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 h-8 w-8 lg:hidden"
                      onClick={() => setSelectedChat(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <CardTitle>
                        {selectedChat.missionId} - {selectedChat.missionName}
                      </CardTitle>
                      <CardDescription>{selectedChat.lastActivity}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ChatWindow chat={selectedChat} />
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input placeholder="Écrivez votre message..." className="flex-1" />
                    <Button size="icon" className="h-9 w-9 rounded-full bg-lime-500 hover:bg-lime-600 text-navy-900">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-[500px] items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Aucune conversation sélectionnée</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Sélectionnez une conversation dans la liste pour commencer à discuter.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Informations sur les participants */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Participants</CardTitle>
            <CardDescription>Membres de cette conversation</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedChat ? (
              <ChatParticipants participants={selectedChat.participants} />
            ) : (
              <div className="text-center py-8">
                <User className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Sélectionnez une conversation pour voir les participants</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
