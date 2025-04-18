import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/contexts/theme-context"
import { ChauffeurSidebar } from "@/components/chauffeur/chauffeur-sidebar"

export default function ChauffeurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <ChauffeurSidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
