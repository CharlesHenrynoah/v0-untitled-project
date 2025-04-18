import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChauffeurMissionsList } from "@/components/chauffeur/chauffeur-missions-list"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ChauffeurDashboard() {
  // Données fictives pour le tableau de bord
  const nextMission = {
    id: "M001",
    title: "Excursion groupe scolaire",
    date: "2023-05-15",
    time: "08:00 - 18:00",
    departure: "École Primaire Saint-Michel, Paris",
    destination: "Parc d'attractions, Marne-la-Vallée",
  }

  const stats = {
    missionsThisMonth: 12,
    completedMissions: 8,
    upcomingMissions: 4,
    totalHours: 86,
    totalDistance: 1250,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Missions ce mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.missionsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedMissions} terminées, {stats.upcomingMissions} à venir
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Heures de conduite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distance parcourue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDistance} km</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.completedMissions / stats.missionsThisMonth) * 100)}%
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(stats.completedMissions / stats.missionsThisMonth) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Prochaine mission</CardTitle>
            <CardDescription>Détails de votre prochaine mission prévue</CardDescription>
          </CardHeader>
          <CardContent>
            {nextMission ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{nextMission.title}</h3>
                  <Button size="sm" asChild>
                    <Link href={`/espacechauffeur/missions`}>Voir toutes les missions</Link>
                  </Button>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Date: {new Date(nextMission.date).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Horaire: {nextMission.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Départ: {nextMission.departure}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Destination: {nextMission.destination}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Démarrer
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/espacechauffeur/chat?mission=${nextMission.id}`}>Contacter</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">Aucune mission à venir</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Missions récentes</CardTitle>
          <CardDescription>Aperçu de vos dernières missions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChauffeurMissionsList />
        </CardContent>
      </Card>
    </div>
  )
}
