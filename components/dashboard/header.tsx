"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm">
      {searchOpen ? (
        <div className="flex w-full items-center">
          <Input
            type="search"
            placeholder="Rechercher..."
            className="mr-2"
            autoFocus
            onBlur={() => setSearchOpen(false)}
          />
          <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>
            Annuler
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-navy-900">QuantumBridge Technologies</h1>
          </div>
        </>
      )}
    </header>
  )
}
