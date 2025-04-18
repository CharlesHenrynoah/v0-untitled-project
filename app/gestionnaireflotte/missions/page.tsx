"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import MissionsList from "@/components/dashboard/missions-list"

// Type pour les filtres de date
type DateFilter = "all" | "today" | "week" | "month"

export default function MissionsPage() {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState("")
  // État pour le filtre de date actif
  const [dateFilter, setDateFilter] = useState<DateFilter>("all")
  // État pour le statut actif
  const [statusFilter, setStatusFilter] = useState("all")
  // État pour stocker les missions filtrées
  const [filteredMissions, setFilteredMissions] = useState<any[]>([])

  // Fonction pour gérer le changement de filtre de date
  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter)
  }

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setDateFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">Missions</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les missions</CardTitle>
          <CardDescription>Gérez et suivez toutes les missions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une mission..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={dateFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDateFilterChange("all")}
                className={dateFilter === "all" ? "bg-lime-500 hover:bg-lime-600 text-navy-900" : ""}
              >
                Toutes
              </Button>
              <Button
                variant={dateFilter === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDateFilterChange("today")}
                className={dateFilter === "today" ? "bg-lime-500 hover:bg-lime-600 text-navy-900" : ""}
              >
                Aujourd'hui
              </Button>
              <Button
                variant={dateFilter === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDateFilterChange("week")}
                className={dateFilter === "week" ? "bg-lime-500 hover:bg-lime-600 text-navy-900" : ""}
              >
                Cette semaine
              </Button>
              <Button
                variant={dateFilter === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => handleDateFilterChange("month")}
                className={dateFilter === "month" ? "bg-lime-500 hover:bg-lime-600 text-navy-900" : ""}
              >
                Ce mois
              </Button>
              {(dateFilter !== "all" || searchQuery) && (
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="planned">Planifiées</TabsTrigger>
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
              <TabsTrigger value="cancelled">Annulées</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <MissionsList filter={statusFilter} searchQuery={searchQuery} dateFilter={dateFilter} />
            </TabsContent>
            <TabsContent value="planned" className="pt-4">
              <MissionsList filter="planned" searchQuery={searchQuery} dateFilter={dateFilter} />
            </TabsContent>
            <TabsContent value="in-progress" className="pt-4">
              <MissionsList filter="in-progress" searchQuery={searchQuery} dateFilter={dateFilter} />
            </TabsContent>
            <TabsContent value="completed" className="pt-4">
              <MissionsList filter="completed" searchQuery={searchQuery} dateFilter={dateFilter} />
            </TabsContent>
            <TabsContent value="cancelled" className="pt-4">
              <MissionsList filter="cancelled" searchQuery={searchQuery} dateFilter={dateFilter} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
