"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  // Modifier la condition pour ne pas afficher le header sur les pages de l'espace représentant
  // Ne pas afficher le header sur les pages espacererepresentantentreprise
  if (pathname?.startsWith("/espacererepresentantentreprise")) {
    return null
  }

  return (
    <header className="w-full bg-navy-950 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-lime-400">NEOTRAVEL</span>
        </Link>
      </div>
    </header>
  )
}
