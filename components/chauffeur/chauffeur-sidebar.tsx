"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Truck, MessageSquare, User, Settings, LogOut } from "lucide-react"

export function ChauffeurSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  const navItems = [
    {
      name: "Mes Missions",
      href: "/espacechauffeur/missions",
      icon: Truck,
    },
    {
      name: "Chat",
      href: "/espacechauffeur/chat",
      icon: MessageSquare,
    },
    {
      name: "Mon Profil",
      href: "/espacechauffeur/profil",
      icon: User,
    },
    {
      name: "Paramètres",
      href: "/espacechauffeur/parametres",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-full flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-md ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/">
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500">
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
