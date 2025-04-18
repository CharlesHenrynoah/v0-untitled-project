"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import type { Mission, MissionStatus, DateFilter } from "@/types/shared"

interface ChauffeurMissionsListProps {
  filter?: MissionStatus | "all"
  searchQuery?: string
  dateFilter?: DateFilter
}

// Données fictives des missions adaptées au transport de personnes en car/autobus
const missionsData: Mission[] = [
  {
    id: "M001",
    title: "Excursion groupe scolaire",
    date: "2023-05-15",
    displayDate: "15/05/2023",
    type: "Journée",
    departure: "École Primaire Saint-Michel, Paris",
    destination: "Parc d'attractions, Marne-la-Vallée",
    driver: "Thomas Dubois",
    vehicle: "Car 50 places",
    status: "planned",
    passengers: 42,
    companyName: "TransportCo",
    contactPerson: "Marie Dupont",
    notes: "Prévoir 2 arrêts sur l'autoroute. Groupe avec 3 accompagnateurs.",
  },
  {
    id: "M002",
    title: "Voyage club seniors",
    date: "2023-05-16",
    displayDate: "16/05/2023",
    type: "Journée",
    departure: "Maison des associations, Lyon",
    destination: "Vignobles de Beaune, Bourgogne",
    driver: "Thomas Dubois",
    vehicle: "Car 30 places",
    status: "planned",
    passengers: 28,
    companyName: "TransportCo",
    contactPerson: "Jean Martin",
    notes: "Groupe de seniors. Prévoir climatisation et accès PMR.",
  },
  {
    id: "M003",
    title: "Transfert équipe sportive",
    date: "2023-05-14",
    displayDate: "14/05/2023",
    type: "Journée",
    departure: "Stade municipal, Bordeaux",
    destination: "Stade national, Paris",
    driver: "Thomas Dubois",
    vehicle: "Car 40 places VIP",
    status: "in-progress",
    passengers: 35,
    companyName: "TransportCo",
    contactPerson: "Pierre Lefebvre",
    notes: "Équipement sportif à charger. Prévoir espace supplémentaire.",
  },
  {
    id: "M004",
    title: "Sortie culturelle",
    date: "2023-05-10",
    displayDate: "10/05/2023",
    type: "Journée",
    departure: "Lycée International, Toulouse",
    destination: "Musée d'art contemporain, Toulouse",
    driver: "Thomas Dubois",
    vehicle: "Car 50 places",
    status: "completed",
    passengers: 45,
    companyName: "TransportCo",
    contactPerson: "Sophie Bernard",
    notes: "4 accompagnateurs. Prévoir liste des élèves à l'entrée.",
    satisfaction: 4.8,
    emissions: 15.3,
    profit: 120,
  },
  {
    id: "M005",
    title: "Transfert aéroport",
    date: "2023-05-08",
    displayDate: "08/05/2023",
    type: "Transfert",
    departure: "Hôtel Concorde, Rennes",
    destination: "Aéroport de Rennes",
    driver: "Thomas Dubois",
    vehicle: "Car 25 places",
    status: "completed",
    passengers: 22,
    companyName: "TransportCo",
    contactPerson: "Lucie Moreau",
    notes: "Groupe de touristes avec bagages. Prévoir espace suffisant.",
    satisfaction: 5.0,
    emissions: 8.2,
    profit: 75,
  },
]

export function ChauffeurMissionsList({
  filter = "all",
  searchQuery = "",
  dateFilter = "all",
}: ChauffeurMissionsListProps) {
  const [missions, setMissions] = useState<Mission[]>(missionsData)
  const { toast } = useToast()
  const [currentFilter, setFilter] = useState<MissionStatus | "all">(filter)
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([])

  // Effet pour filtrer les missions à chaque changement de filtre
  useEffect(() => {
    const filtered = missions.filter((mission) => {
      // Filtrer par statut
      if (currentFilter !== "all" && mission.status !== currentFilter) {
        return false
      }

      // Filtrer par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          mission.id.toLowerCase().includes(query) ||
          mission.departure.toLowerCase().includes(query) ||
          mission.destination.toLowerCase().includes(query) ||
          mission.driver.toLowerCase().includes(query) ||
          mission.type.toLowerCase().includes(query)
        )
      }

      // Filtrer par date
      if (dateFilter !== "all") {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const missionDate = new Date(mission.date)

        if (dateFilter === "today") {
          return missionDate.toDateString() === today.toDateString()
        } else if (dateFilter === "week") {
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - today.getDay())
          return missionDate >= weekStart && missionDate <= today
        } else if (dateFilter === "month") {
          return missionDate.getMonth() === today.getMonth() && missionDate.getFullYear() === today.getFullYear()
        }
      }

      return true
    })

    setFilteredMissions(filtered)
  }, [missions, currentFilter, searchQuery, dateFilter])

  const handleStartMission = (id: string) => {
    setMissions((prev) => prev.map((mission) => (mission.id === id ? { ...mission, status: "in-progress" } : mission)))
    toast({
      title: "Mission démarrée",
      description: "Vous avez commencé la mission. Bon voyage!",
    })
  }

  const handleCompleteMission = (id: string) => {
    setMissions((prev) => prev.map((mission) => (mission.id === id ? { ...mission, status: "completed" } : mission)))
    toast({
      title: "Mission terminée",
      description: "Félicitations! La mission a été marquée comme terminée.",
    })
  }

  const getStatusBadge = (status: MissionStatus) => {
    switch (status) {
      case "planned":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            À venir
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
            En cours
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            Terminée
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
            Annulée
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button variant={currentFilter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          Toutes
        </Button>
        <Button variant={currentFilter === "planned" ? "default" : "outline"} onClick={() => setFilter("planned")}>
          À venir
        </Button>
        <Button
          variant={currentFilter === "in-progress" ? "default" : "outline"}
          onClick={() => setFilter("in-progress")}
        >
          En cours
        </Button>
        <Button variant={currentFilter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
          Terminées
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Aucune mission trouvée pour ce filtre</div>
            ) : (
              filteredMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{mission.title}</h3>
                    {getStatusBadge(mission.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Client: {mission.companyName}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Date: {mission.displayDate}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Type: {mission.type}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <span>Contact: {mission.contactPerson}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Départ: {mission.departure}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Destination: {mission.destination}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Passagers: {mission.passengers}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Véhicule: {mission.vehicle}</span>
                      </div>
                    </div>
                  </div>

                  {mission.notes && (
                    <div className="mt-2 mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      <p className="font-medium mb-1">Notes:</p>
                      <p>{mission.notes}</p>
                    </div>
                  )}

                  {mission.status === "completed" && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        <p className="text-xs text-muted-foreground">Satisfaction</p>
                        <div className="flex items-center">
                          <span className="font-semibold text-lime-600">{mission.satisfaction}</span>
                          <div className="flex ml-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= Math.round(mission.satisfaction || 0) ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        <p className="text-xs text-muted-foreground">Émissions</p>
                        <div className="flex items-center">
                          <span className="font-semibold text-lime-600">{mission.emissions} kg</span>
                          <span className="text-xs text-muted-foreground ml-1">CO₂</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {mission.status === "planned" && (
                        <Button size="sm" onClick={() => handleStartMission(mission.id)}>
                          <Clock className="h-4 w-4 mr-2" />
                          Démarrer
                        </Button>
                      )}

                      {mission.status === "in-progress" && (
                        <Button size="sm" onClick={() => handleCompleteMission(mission.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Terminer
                        </Button>
                      )}

                      {mission.status === "completed" && (
                        <Button size="sm" variant="outline" disabled>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Terminée
                        </Button>
                      )}
                    </div>

                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/espacechauffeur/chat?mission=${mission.id}`}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
