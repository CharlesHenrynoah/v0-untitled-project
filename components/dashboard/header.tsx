"use client"

import { useState } from "react"
import { Bell, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/contexts/theme-context"

interface HeaderProps {
  userRole?: "chauffeur" | "gestionnaireflotte" | "client"
}

export default function Header({ userRole = "gestionnaireflotte" }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nouvelle mission",
      description: "Vous avez une nouvelle mission pour demain",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: 2,
      title: "Message de Jean Dupont",
      description: "Bonjour, pouvez-vous confirmer l'heure d'arrivée ?",
      time: "Il y a 30 minutes",
      read: false,
    },
    {
      id: 3,
      title: "Rappel",
      description: "Mission M-2023-045 dans 2 heures",
      time: "Il y a 1 heure",
      read: true,
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => {
        if (n.id === id) {
          return { ...n, read: true }
        }
        return n
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getUserTitle = () => {
    switch (userRole) {
      case "chauffeur":
        return "Chauffeur"
      case "client":
        return "Client"
      case "gestionnaireflotte":
      default:
        return "Gestionnaire de flottes"
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-navy-900 dark:text-white">{getUserTitle()}</h1>
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Rechercher..." className="pl-8 w-[300px]" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800">
                <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <h3 className="font-medium">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Tout marquer comme lu
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`mb-2 cursor-pointer rounded-md p-2 ${
                          notification.read ? "" : "bg-gray-100 dark:bg-gray-700"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-center text-sm text-gray-500">Aucune notification</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700">
              <img src="/abstract-geometric-TD.png" alt="Avatar" className="h-full w-full rounded-full object-cover" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Marie Lefevre</p>
              <p className="text-xs text-gray-500">Gestionnaire de flottes</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
