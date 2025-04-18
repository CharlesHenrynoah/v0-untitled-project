"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FlottesList from "@/components/dashboard/flottes-list"
import { useState } from "react"

export default function FlottesPage() {
  const [newFlotteDialogOpen, setNewFlotteDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">Mes Flottes personnalisées</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flottes personnalisées</CardTitle>
          <CardDescription>Créez et gérez vos groupes de chauffeurs favoris</CardDescription>
        </CardHeader>
        <CardContent>
          <FlottesList />
        </CardContent>
      </Card>
    </div>
  )
}
