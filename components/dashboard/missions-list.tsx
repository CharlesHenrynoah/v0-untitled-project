"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Trash } from "lucide-react"

interface MissionsListProps {
  filter?: string
  searchQuery?: string
  dateFilter?: string
}

// Ajouter une fonction pour gérer la suppression d'une mission
export default function MissionsList({ filter = "all", searchQuery = "", dateFilter = "all" }: MissionsListProps) {
  // Données des missions
  const [missions, setMissions] = useState([
    {
      id: "M-2023-042",
      date: "2023-04-15",
      displayDate: "15/04/2023",
      type: "Transfert",
      from: "Aéroport Lyon Saint-Exupéry",
      to: "Siège QuantumBridge",
      driver: "Jean Dupont",
      vehicle: "Berline",
      status: "completed",
      cost: 120,
      satisfaction: 4.9,
      emissions: 8.5,
      profit: 30,
    },
    {
      id: "M-2023-043",
      date: "2023-04-18",
      displayDate: "18/04/2023",
      type: "Journée",
      from: "Siège QuantumBridge",
      to: "Salon Tech Lyon",
      driver: "Sophie Martin",
      vehicle: "Van",
      status: "completed",
      cost: 450,
      satisfaction: 4.8,
      emissions: 22.3,
      profit: 112,
    },
    {
      id: "M-2023-044",
      date: "2023-04-22",
      displayDate: "22/04/2023",
      type: "Transfert",
      from: "Gare Part-Dieu",
      to: "Siège QuantumBridge",
      driver: "Marc Leroy",
      vehicle: "Berline",
      status: "completed",
      cost: 85,
      satisfaction: 5.0,
      emissions: 6.2,
      profit: 21,
    },
    {
      id: "M-2023-045",
      date: "2023-04-25",
      displayDate: "25/04/2023",
      type: "Transfert",
      from: "Siège QuantumBridge",
      to: "Aéroport Lyon Saint-Exupéry",
      driver: "Jean Dupont",
      vehicle: "SUV",
      status: "in-progress",
      cost: 135,
    },
    {
      id: "M-2023-046",
      date: "2023-04-28",
      displayDate: "28/04/2023",
      type: "Demi-journée",
      from: "Siège QuantumBridge",
      to: "Visite clients",
      driver: "Sophie Martin",
      vehicle: "Berline",
      status: "planned",
      cost: 220,
    },
    {
      id: "M-2023-047",
      date: "2023-04-30",
      displayDate: "30/04/2023",
      type: "Transfert",
      from: "Siège QuantumBridge",
      to: "Restaurant Le Grand Lyon",
      driver: "Marc Leroy",
      vehicle: "Berline",
      status: "planned",
      cost: 75,
    },
    {
      id: "M-2023-048",
      date: "2023-05-02",
      displayDate: "02/05/2023",
      type: "Journée",
      from: "Siège QuantumBridge",
      to: "Visite clients Paris",
      driver: "Jean Dupont",
      vehicle: "Berline",
      status: "planned",
      cost: 580,
    },
    {
      id: "M-2023-049",
      date: "2023-05-05",
      displayDate: "05/05/2023",
      type: "Transfert",
      from: "Aéroport Lyon Saint-Exupéry",
      to: "Hôtel Mercure Lyon",
      driver: "Sophie Martin",
      vehicle: "Van",
      status: "planned",
      cost: 150,
    },
    {
      id: "M-2023-050",
      date: "2023-05-10",
      displayDate: "10/05/2023",
      type: "Transfert",
      from: "Hôtel Mercure Lyon",
      to: "Aéroport Lyon Saint-Exupéry",
      driver: "Marc Leroy",
      vehicle: "Berline",
      status: "planned",
      cost: 150,
    },
    {
      id: "M-2023-051",
      date: "2023-05-15",
      displayDate: "15/05/2023",
      type: "Demi-journée",
      from: "Siège QuantumBridge",
      to: "Conférence Tech Lyon",
      driver: "Jean Dupont",
      vehicle: "SUV",
      status: "planned",
      cost: 250,
    },
    {
      id: "M-2023-052",
      date: "2023-05-20",
      displayDate: "20/05/2023",
      type: "Journée",
      from: "Siège QuantumBridge",
      to: "Salon de l'innovation",
      driver: "Sophie Martin",
      vehicle: "Van",
      status: "cancelled",
      cost: 450,
    },
  ])

  // Ajouter une fonction pour supprimer une mission
  const handleDeleteMission = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")) {
      setMissions(missions.filter((mission) => mission.id !== id))
    }
  }

  // État pour stocker les missions filtrées
  const [filteredMissions, setFilteredMissions] = useState(missions)

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    let result = missions

    // Filtrer par statut
    if (filter !== "all") {
      result = result.filter((mission) => mission.status === filter)
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (mission) =>
          mission.id.toLowerCase().includes(query) ||
          mission.from.toLowerCase().includes(query) ||
          mission.to.toLowerCase().includes(query) ||
          mission.driver.toLowerCase().includes(query) ||
          mission.type.toLowerCase().includes(query),
      )
    }

    // Filtrer par date
    if (dateFilter !== "all") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay()) // Début de la semaine (dimanche)

      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1) // Début du mois

      result = result.filter((mission) => {
        const missionDate = new Date(mission.date)

        if (dateFilter === "today") {
          return missionDate.toDateString() === today.toDateString()
        } else if (dateFilter === "week") {
          return missionDate >= weekStart && missionDate <= today
        } else if (dateFilter === "month") {
          return missionDate.getMonth() === today.getMonth() && missionDate.getFullYear() === today.getFullYear()
        }
        return true
      })
    }

    setFilteredMissions(result)
  }, [filter, searchQuery, dateFilter, missions])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Terminée</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
      case "planned":
        return <Badge className="bg-amber-100 text-amber-800">Planifiée</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulée</Badge>
      default:
        return <Badge>Inconnue</Badge>
    }
  }

  // Afficher un message si aucune mission ne correspond aux filtres
  if (filteredMissions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucune mission ne correspond à vos critères de recherche.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Réinitialiser tous les filtres
        </Button>
      </div>
    )
  }

  // Modifier le rendu des cartes de mission pour afficher les informations supplémentaires pour les missions terminées
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredMissions.map((mission) => (
        <Card key={mission.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{mission.id}</CardTitle>
                <CardDescription>{mission.displayDate}</CardDescription>
              </div>
              {getStatusBadge(mission.status)}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Type:</span>
                <span className="ml-2">{mission.type}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Trajet:</span>
                <div className="ml-2 text-sm">
                  <div>{mission.from}</div>
                  <div>↓</div>
                  <div>{mission.to}</div>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Chauffeur:</span>
                <span className="ml-2">{mission.driver}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Véhicule:</span>
                <span className="ml-2">{mission.vehicle}</span>
              </div>

              {mission.status === "completed" ? (
                <>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Bénéfice:</span>
                    <span className="ml-2 font-semibold text-lime-600">{mission.profit} €</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Satisfaction:</span>
                    <div className="ml-2 flex items-center">
                      <span className="mr-1 font-semibold text-lime-600">{mission.satisfaction}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-3 w-3 ${star <= Math.round(mission.satisfaction) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Émissions:</span>
                    <div className="ml-2 flex items-center">
                      <span className="mr-1 font-semibold text-lime-600">{mission.emissions} kg</span>
                      <span className="text-xs text-gray-500">CO₂</span>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <span className="text-sm font-medium text-gray-500">Coût:</span>
                  <span className="ml-2 font-semibold text-lime-600">{mission.cost} €</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <div>
              {mission.status === "planned" && (
                <Button variant="destructive" size="sm" onClick={() => handleDeleteMission(mission.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
