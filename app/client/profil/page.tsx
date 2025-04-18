import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientProfile() {
  // Données fictives pour le profil client
  const clientProfile = {
    name: "Alexandre Dupont",
    email: "alexandre.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    company: "Entreprise ABC",
    position: "Directeur Commercial",
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    preferences: {
      vehicleType: "Berline de luxe",
      paymentMethod: "Facturation entreprise",
      communicationPreference: "Email",
    },
    travelHistory: {
      totalTrips: 24,
      totalDistance: "2,450 km",
      favoriteDestinations: ["Aéroport Charles de Gaulle", "La Défense", "Gare de Lyon"],
      averageRating: 4.8,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
        <Button>Enregistrer les modifications</Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Gérez vos informations personnelles et professionnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" defaultValue={clientProfile.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={clientProfile.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue={clientProfile.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" defaultValue={clientProfile.company} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input id="position" defaultValue={clientProfile.position} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue={clientProfile.address} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences</CardTitle>
              <CardDescription>Personnalisez vos préférences de voyage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Type de véhicule préféré</Label>
                  <Input id="vehicleType" defaultValue={clientProfile.preferences.vehicleType} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Méthode de paiement</Label>
                  <Input id="paymentMethod" defaultValue={clientProfile.preferences.paymentMethod} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communicationPreference">Préférence de communication</Label>
                  <Input
                    id="communicationPreference"
                    defaultValue={clientProfile.preferences.communicationPreference}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique de voyage</CardTitle>
              <CardDescription>Consultez vos statistiques de voyage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Statistiques</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nombre total de trajets</p>
                      <p className="text-2xl font-bold">{clientProfile.travelHistory.totalTrips}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Distance totale parcourue</p>
                      <p className="text-2xl font-bold">{clientProfile.travelHistory.totalDistance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Note moyenne</p>
                      <p className="text-2xl font-bold">{clientProfile.travelHistory.averageRating}/5</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Destinations favorites</h3>
                  <ul className="space-y-2">
                    {clientProfile.travelHistory.favoriteDestinations.map((destination, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-lime-500" />
                        <span>{destination}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
