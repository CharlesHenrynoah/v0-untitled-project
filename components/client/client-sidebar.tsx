"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ClientSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const navigation = [
    { name: "Tableau de bord", href: "/client", icon: LayoutDashboard },
    { name: "Mes Réservations", href: "/client/reservations", icon: Calendar },
    { name: "Messages", href: "/client/messages", icon: MessageSquare },
    { name: "Mon Profil", href: "/client/profil", icon: User },
    { name: "Paramètres", href: "/client/parametres", icon: Settings },
  ]

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r border-gray-200 bg-white dark:bg-navy-950 dark:border-navy-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-navy-800 px-4">
        {!collapsed ? (
          <span className="text-xl font-bold text-lime-500 dark:text-lime-400">NEOTRAVEL</span>
        ) : (
          <span className="text-xl font-bold text-lime-500 dark:text-lime-400">NT</span>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 dark:border-navy-800 bg-white dark:bg-navy-950 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-900"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-lime-50 text-lime-600 dark:bg-navy-800 dark:text-lime-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-lime-600 dark:text-gray-300 dark:hover:bg-navy-800 dark:hover:text-lime-400",
                collapsed ? "justify-center" : "",
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 dark:border-navy-800 p-4">
        <button
          className={cn(
            "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-lime-600 dark:text-gray-300 dark:hover:bg-navy-800 dark:hover:text-lime-400",
            collapsed ? "justify-center" : "",
          )}
        >
          <LogOut className={cn("h-5 w-5 flex-shrink-0", collapsed ? "" : "mr-3")} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  )
}
