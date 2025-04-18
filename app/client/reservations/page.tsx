import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, MapPin, Car, User } from "lucide-react"

export default function ClientReservations() {
  // Données fictives pour les réservations
  const reservations = [
    {
      id: "R-2023-089",
      date: "28/04/2023",
      time: "09:30",
      departure: "Aéroport Charles de Gaulle",
      destination: "Tour Eiffel, Paris",
      driver: "Thomas Dubois",
      vehicle: "Tesla Model S",
      status: "confirmée",
      type: "upcoming",
    },
    {
      id: "R-2023-076",
      date: "22/04/2023",
      time: "14:00",
      departure: "Hôtel Marriott, Paris",
      destination: "Aéroport d'Orly",
      driver: "Sophie Martin",
      vehicle: "Mercedes Classe S",
      status: "terminée",
      type: "past",
    },
    {
      id: "R-2023-065",
      date: "15/04/2023",
      time: "10:15",
      departure: "Gare de Lyon, Paris",
      destination: "Siège Social Entreprise",
      driver: "Thomas Dubois",
      vehicle: "Tesla Model S",
      status: "terminée",
      type: "past",
    },
    {
      id: "R-2023-052",
      date: "05/04/2023",
      time: "08:45",
      departure: "Domicile",
      destination: "Aéroport Charles de Gaulle",
      driver: "Sophie Martin",
      vehicle: "Mercedes Classe S",
      status: "terminée",
      type: "past",
    },
  ]

  const upcomingReservations = reservations.filter((r) => r.type === "upcoming")
  const pastReservations = reservations.filter((r) => r.type === "past")

  const ReservationCard = ({ reservation }: { reservation: (typeof reservations)[0] }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <div className="font-bold">{reservation.id}</div>
            <div
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                reservation.status === "confirmée"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            >
              {reservation.status}
            </div>
          </div>
          <div className="flex space-x-2">
            {reservation.type === "upcoming" && (
              <>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
                <Button size="sm">Contacter</Button>
              </>
            )}
            {reservation.type === "past" && (
              <Button variant="outline" size="sm">
                Détails
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CalendarClock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Date et heure</p>
              <p className="text-sm text-gray-500">
                {reservation.date} à {reservation.time}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Départ</p>
              <p className="text-sm text-gray-500">{reservation.departure}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Destination</p>
              <p className="text-sm text-gray-500">{reservation.destination}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Car className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Véhicule</p>
              <p className="text-sm text-gray-500">{reservation.vehicle}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Chauffeur</p>
              <p className="text-sm text-gray-500">{reservation.driver}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mes Réservations</h1>
        <Button>Nouvelle réservation</Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="past">Passées</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {upcomingReservations.length > 0 ? (
            upcomingReservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Aucune réservation à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500">
                  Vous n'avez pas de réservations prévues. Cliquez sur "Nouvelle réservation" pour en créer une.
                </p>
                <div className="flex justify-center mt-4">
                  <Button>Nouvelle réservation</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="past">
          {pastReservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
