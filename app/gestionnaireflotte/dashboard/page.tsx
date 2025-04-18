"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, Download, Filter, Calendar } from "lucide-react"
import MissionsOverview from "@/components/dashboard/missions-overview"
import ProfitChart from "@/components/dashboard/profit-chart"
import EcoScoreChart from "@/components/dashboard/eco-score-chart"
import { useRouter } from "next/navigation"
import { useChatStore } from "@/components/dashboard/chat-store"

export default function DashboardPage() {
  const router = useRouter()

  // Données réelles des missions
  const missions = [
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
  ]

  // Données des flottes
  const flottes = [
    {
      id: "F-001",
      name: "Transferts VIP",
      description: "Chauffeurs premium pour accueil clients importants",
      drivers: 5,
      ecoScore: "A",
      avgRating: 4.9,
    },
    {
      id: "F-002",
      name: "Voyages scolaires",
      description: "Chauffeurs spécialisés pour groupes d'enfants",
      drivers: 8,
      ecoScore: "B",
      avgRating: 4.7,
    },
    {
      id: "F-003",
      name: "Événements d'entreprise",
      description: "Transport pour séminaires et team buildings",
      drivers: 12,
      ecoScore: "B+",
      avgRating: 4.8,
    },
    {
      id: "F-004",
      name: "Navettes aéroport",
      description: "Transferts depuis/vers les aéroports",
      drivers: 6,
      ecoScore: "A-",
      avgRating: 4.6,
    },
  ]

  // Calcul des KPI à partir des données réelles
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Filtrer les missions du mois en cours
  const currentMonthMissions = missions.filter((mission) => {
    const missionDate = new Date(mission.date)
    return missionDate.getMonth() === currentMonth && missionDate.getFullYear() === currentYear
  })

  // Compter les missions par statut
  const completedMissions = currentMonthMissions.filter((m) => m.status === "completed").length
  const plannedMissions = currentMonthMissions.filter((m) => m.status === "planned").length
  const inProgressMissions = currentMonthMissions.filter((m) => m.status === "in-progress").length
  const totalMissions = currentMonthMissions.length

  // Calculer le pourcentage d'augmentation par rapport au mois précédent
  // Pour cet exemple, nous utilisons une valeur fixe, mais dans une application réelle,
  // cela serait calculé en comparant avec les données du mois précédent
  const missionIncrease = 12 // 12%

  // Calculer la note moyenne des chauffeurs à partir des flottes
  const avgRating = flottes.reduce((sum, flotte) => sum + flotte.avgRating, 0) / flottes.length

  // Calculer le coût total des missions du mois
  const totalCost = currentMonthMissions.reduce((sum, mission) => sum + mission.cost, 0)

  // Calculer le budget mensuel (pour cet exemple, nous utilisons une valeur fixe)
  const monthlyBudget = 1200

  // Calculer la répartition des types de missions
  const missionTypes = currentMonthMissions.reduce((acc, mission) => {
    acc[mission.type] = (acc[mission.type] || 0) + 1
    return acc
  }, {})

  // Calculer la répartition des véhicules
  const vehicleTypes = currentMonthMissions.reduce((acc, mission) => {
    acc[mission.vehicle] = (acc[mission.vehicle] || 0) + 1
    return acc
  }, {})

  // Récupérer les conversations non lues
  const { chats } = useChatStore()
  const unreadMessages = chats.reduce((sum, chat) => sum + chat.unread, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">Tableau de bord</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="border-lime-500 text-navy-900"
            onClick={() => router.push("/gestionnaireflotte/flottes")}
          >
            <Users className="mr-2 h-4 w-4" />
            Gérer les flottes
          </Button>
          <Button
            variant="outline"
            className="border-lime-500 text-navy-900"
            onClick={() => router.push("/gestionnaireflotte/missions")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Voir les missions
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missions ce mois</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-lime-500"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMissions}</div>
            <p className="text-xs text-muted-foreground">+{missionIncrease}% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-amber-500"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plannedMissions}</div>
            <p className="text-xs text-muted-foreground">En attente de confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-500"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressMissions}</div>
            <p className="text-xs text-muted-foreground">Missions actuellement en cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-green-500"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMissions}</div>
            <p className="text-xs text-muted-foreground">Missions terminées ce mois</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
            <CardDescription>Performances et qualité de service</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ratings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ratings">Bénéfices</TabsTrigger>
                <TabsTrigger value="eco">Score écologique</TabsTrigger>
              </TabsList>
              <TabsContent value="ratings" className="pt-4">
                <div className="h-[300px]">
                  <ProfitChart />
                </div>
                <div className="mt-2 text-center text-sm font-medium">
                  Bénéfice moyen mensuel: <span className="text-lime-600">457 €</span>
                </div>
              </TabsContent>
              <TabsContent value="eco" className="pt-4">
                <div className="h-[300px]">
                  <EcoScoreChart />
                </div>
                <div className="mt-2 text-center text-sm font-medium">
                  Score écologique: <span className="text-lime-600">B+</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Aperçu des missions récentes</CardTitle>
            <CardDescription>Vos 5 dernières missions</CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-lime-500 text-navy-900"
            onClick={() => router.push("/gestionnaireflotte/missions")}
          >
            Voir toutes les missions
          </Button>
        </CardHeader>
        <CardContent>
          <MissionsOverview />
        </CardContent>
      </Card>
    </div>
  )
}
