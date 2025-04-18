"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Car } from "lucide-react"
import EditFlotteButton from "@/components/edit-flotte-button"

// Types simplifiés pour l'exemple
type Flotte = {
  id: string
  name: string
  description: string
  drivers: number
  ecoScore: string
  avgRating: number
}

type Chauffeur = {
  id: string
  name: string
  rating: number
  status: string
}

type Vehicle = {
  id: string
  model: string
  licensePlate: string
  ecoRating: number
  status: string
}

interface FlotteCardProps {
  flotte: Flotte
  chauffeurs: Chauffeur[]
  vehicles: Vehicle[]
  assignedDriverIds: string[]
  assignedVehicleIds: string[]
  onViewDrivers: (flotteId: string) => void
  onViewVehicles: (flotteId: string) => void
  onUpdateFlotte: (flotte: Flotte, driverIds: string[], vehicleIds: string[]) => void
}

export default function FlotteCard({
  flotte,
  chauffeurs,
  vehicles,
  assignedDriverIds,
  assignedVehicleIds,
  onViewDrivers,
  onViewVehicles,
  onUpdateFlotte,
}: FlotteCardProps) {
  // Calculer la note moyenne des chauffeurs
  const avgDriverRating =
    assignedDriverIds.length > 0
      ? (
          assignedDriverIds.reduce((sum, id) => {
            const driver = chauffeurs.find((c) => c.id === id)
            return driver ? sum + driver.rating : sum
          }, 0) / assignedDriverIds.length
        ).toFixed(1)
      : "N/A"

  // Calculer la note écologique moyenne des véhicules
  const avgVehicleEcoRating =
    assignedVehicleIds.length > 0
      ? (
          assignedVehicleIds.reduce((sum, id) => {
            const vehicle = vehicles.find((v) => v.id === id)
            return vehicle ? sum + vehicle.ecoRating : sum
          }, 0) / assignedVehicleIds.length
        ).toFixed(1)
      : "N/A"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{flotte.name}</CardTitle>
            <CardDescription>{flotte.description}</CardDescription>
          </div>
          <EditFlotteButton
            flotte={flotte}
            chauffeurs={chauffeurs}
            vehicles={vehicles}
            assignedDriverIds={assignedDriverIds}
            assignedVehicleIds={assignedVehicleIds}
            onSave={onUpdateFlotte}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{assignedDriverIds.length} chauffeurs</span>
            <Car className="ml-4 mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{assignedVehicleIds.length} véhicules</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-500">Score chauffeurs:</span>
              <span className="ml-2 font-semibold text-lime-600">{avgDriverRating}/5</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Score véhicules:</span>
              <span className="ml-2 font-semibold text-lime-600">{avgVehicleEcoRating}/5</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
          onClick={() => onViewDrivers(flotte.id)}
        >
          <Users className="mr-2 h-4 w-4" />
          Voir les chauffeurs
        </Button>
        <Button
          className="w-full bg-navy-700 hover:bg-navy-800 text-white font-medium"
          onClick={() => onViewVehicles(flotte.id)}
        >
          <Car className="mr-2 h-4 w-4" />
          Voir les véhicules
        </Button>
      </CardFooter>
    </Card>
  )
}
