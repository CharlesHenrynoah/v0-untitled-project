"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, MessageSquare, Users, Settings, User, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  userRole?: "chauffeur" | "gestionnaireflotte" | "client"
}

export default function Sidebar({ userRole = "gestionnaireflotte" }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Déterminer les liens de navigation en fonction du rôle
  const getNavLinks = () => {
    switch (userRole) {
      case "chauffeur":
        return [
          {
            href: "/espacechauffeur",
            icon: <LayoutDashboard className="h-5 w-5" />,
            label: "Tableau de bord",
          },
          {
            href: "/espacechauffeur/missions",
            icon: <Calendar className="h-5 w-5" />,
            label: "Mes missions",
          },
          {
            href: "/espacechauffeur/chat",
            icon: <MessageSquare className="h-5 w-5" />,
            label: "Chat",
          },
          {
            href: "/espacechauffeur/profil",
            icon: <User className="h-5 w-5" />,
            label: "Mon profil",
          },
          {
            href: "/espacechauffeur/parametres",
            icon: <Settings className="h-5 w-5" />,
            label: "Paramètres",
          },
        ]
      case "client":
        return [
          {
            href: "/client",
            icon: <LayoutDashboard className="h-5 w-5" />,
            label: "Tableau de bord",
          },
          {
            href: "/client/reservations",
            icon: <Calendar className="h-5 w-5" />,
            label: "Réservations",
          },
          {
            href: "/client/messages",
            icon: <MessageSquare className="h-5 w-5" />,
            label: "Messages",
          },
          {
            href: "/client/profil",
            icon: <User className="h-5 w-5" />,
            label: "Mon profil",
          },
          {
            href: "/client/parametres",
            icon: <Settings className="h-5 w-5" />,
            label: "Paramètres",
          },
        ]
      case "gestionnaireflotte":
      default:
        return [
          {
            href: "/gestionnaireflotte/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            label: "Tableau de bord",
          },
          {
            href: "/gestionnaireflotte/missions",
            icon: <Calendar className="h-5 w-5" />,
            label: "Missions",
          },
          {
            href: "/gestionnaireflotte/flottes",
            icon: <Users className="h-5 w-5" />,
            label: "Flottes",
          },
          {
            href: "/gestionnaireflotte/chat",
            icon: <MessageSquare className="h-5 w-5" />,
            label: "Chat",
          },
          {
            href: "/gestionnaireflotte/profil",
            icon: <User className="h-5 w-5" />,
            label: "Profil",
          },
          {
            href: "/gestionnaireflotte/parametres",
            icon: <Settings className="h-5 w-5" />,
            label: "Paramètres",
          },
        ]
    }
  }

  const navLinks = getNavLinks()

  return (
    <>
      {/* Bouton de menu mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar pour mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform duration-200 ease-in-out dark:bg-gray-800 md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link
              href={
                userRole === "chauffeur"
                  ? "/espacechauffeur"
                  : userRole === "client"
                    ? "/client"
                    : "/gestionnaireflotte"
              }
            >
              <div className="flex items-center justify-center">
                <img src="/abstract-geometric-logo.png" alt="Logo" className="h-10 w-10" />
                <span className="ml-2 text-xl font-bold text-navy-900 dark:text-white">
                  {userRole === "chauffeur"
                    ? "Espace Chauffeur"
                    : userRole === "client"
                      ? "Espace Client"
                      : "Gestionnaire Flottes"}
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
                  )}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="mr-2 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
