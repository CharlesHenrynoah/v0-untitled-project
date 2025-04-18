"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ClientSidebar from "@/components/client/client-sidebar"
import { usePathname } from "next/navigation"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-navy-900">
      <ClientSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
