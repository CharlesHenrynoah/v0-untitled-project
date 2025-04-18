import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, Car, MapPin, Clock, TrendingUp, MessageSquare } from "lucide-react"

export default function ClientDashboard() {
  // Données fictives pour le tableau de bord
  const upcomingReservation = {
    id: "R-2023-089",
    date: "28/04/2023",
    time: "09:30",
    departure: "Aéroport Charles de Gaulle",
    destination: "Tour Eiffel, Paris",
    driver: "Thomas Dubois",
    vehicle: "Tesla Model S",
    status: "confirmée",
  }

  const stats = [
    { label: "Réservations", value: "12", icon: CalendarClock, change: "+2" },
    { label: "Km parcourus", value: "1 450", icon: Car, change: "+120" },
    { label: "Économie CO2", value: "320kg", icon: TrendingUp, change: "+45" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <Button>Nouvelle réservation</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-lime-100 p-2 dark:bg-lime-900/30">
                  <stat.icon className="h-5 w-5 text-lime-600 dark:text-lime-400" />
                </div>
              </div>
              <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
                {stat.change} depuis le mois dernier
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Prochaine réservation</CardTitle>
            <CardDescription>Détails de votre prochain trajet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{upcomingReservation.id}</div>
                <div className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {upcomingReservation.status}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CalendarClock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{upcomingReservation.date}</p>
                  <p className="text-sm text-gray-500">{upcomingReservation.time}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Départ</p>
                  <p className="text-sm text-gray-500">{upcomingReservation.departure}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-sm text-gray-500">{upcomingReservation.destination}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Car className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Véhicule</p>
                  <p className="text-sm text-gray-500">{upcomingReservation.vehicle}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Chauffeur</p>
                  <p className="text-sm text-gray-500">{upcomingReservation.driver}</p>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1">
                  Modifier
                </Button>
                <Button className="flex-1">Contacter</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Vos dernières actions et notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "Aujourd'hui, 10:42", text: "Réservation R-2023-089 confirmée" },
                { time: "Hier, 15:30", text: "Message reçu de Thomas Dubois" },
                { time: "22/04/2023, 09:15", text: "Trajet R-2023-076 terminé" },
                { time: "20/04/2023, 18:22", text: "Facture F-2023-076 disponible" },
                { time: "18/04/2023, 11:05", text: "Nouvelle réservation créée" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    <p className="font-medium">{activity.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
