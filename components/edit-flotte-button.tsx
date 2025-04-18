"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types simplifiés pour l'exemple
type Flotte = {
  id: string
  name: string
  description: string
  drivers: number
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

interface EditFlotteButtonProps {
  flotte: Flotte
  chauffeurs: Chauffeur[]
  vehicles: Vehicle[]
  assignedDriverIds: string[]
  assignedVehicleIds: string[]
  onSave: (updatedFlotte: Flotte, driverIds: string[], vehicleIds: string[]) => void
}

export default function EditFlotteButton({
  flotte,
  chauffeurs,
  vehicles,
  assignedDriverIds,
  assignedVehicleIds,
  onSave,
}: EditFlotteButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedFlotte, setEditedFlotte] = useState<Flotte>({ ...flotte })
  const [selectedDriverIds, setSelectedDriverIds] = useState<string[]>([...assignedDriverIds])
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<string[]>([...assignedVehicleIds])
  const [selectedDriverToAdd, setSelectedDriverToAdd] = useState<string>("")
  const [selectedVehicleToAdd, setSelectedVehicleToAdd] = useState<string>("")

  const handleSave = () => {
    onSave(editedFlotte, selectedDriverIds, selectedVehicleIds)
    setIsOpen(false)
  }

  const handleAddDriver = () => {
    if (!selectedDriverToAdd || selectedDriverIds.includes(selectedDriverToAdd)) return
    setSelectedDriverIds([...selectedDriverIds, selectedDriverToAdd])
    setSelectedDriverToAdd("")
  }

  const handleRemoveDriver = (driverId: string) => {
    setSelectedDriverIds(selectedDriverIds.filter((id) => id !== driverId))
  }

  const handleAddVehicle = () => {
    if (!selectedVehicleToAdd || selectedVehicleIds.includes(selectedVehicleToAdd)) return
    setSelectedVehicleIds([...selectedVehicleIds, selectedVehicleToAdd])
    setSelectedVehicleToAdd("")
  }

  const handleRemoveVehicle = (vehicleId: string) => {
    setSelectedVehicleIds(selectedVehicleIds.filter((id) => id !== vehicleId))
  }

  const getAvailableDrivers = () => {
    return chauffeurs.filter((driver) => !selectedDriverIds.includes(driver.id))
  }

  const getAvailableVehicles = () => {
    return vehicles.filter((vehicle) => !selectedVehicleIds.includes(vehicle.id))
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="flex items-center">
        <Edit className="mr-2 h-4 w-4" />
        Modifier la flotte
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Modifier la flotte</DialogTitle>
            <DialogDescription>
              Modifiez les informations, les chauffeurs et les véhicules de cette flotte.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="drivers">Chauffeurs</TabsTrigger>
              <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la flotte</Label>
                <Input
                  id="name"
                  value={editedFlotte.name}
                  onChange={(e) => setEditedFlotte({ ...editedFlotte, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedFlotte.description}
                  onChange={(e) => setEditedFlotte({ ...editedFlotte, description: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="drivers" className="space-y-4 py-4">
              <div className="flex items-center space-x-2 mb-4">
                <Select value={selectedDriverToAdd} onValueChange={setSelectedDriverToAdd}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un chauffeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDrivers().map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} ({driver.rating}/5)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleAddDriver}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedDriverToAdd}
                >
                  Ajouter
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Nom</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Note</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Statut</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDriverIds.length > 0 ? (
                      selectedDriverIds.map((driverId) => {
                        const driver = chauffeurs.find((c) => c.id === driverId)
                        if (!driver) return null

                        return (
                          <tr key={driver.id} className="border-b">
                            <td className="py-2 px-3 text-sm">{driver.name}</td>
                            <td className="py-2 px-3 text-sm">
                              <span className="font-semibold text-lime-600">{driver.rating}</span>
                              <span className="text-gray-500">/5</span>
                            </td>
                            <td className="py-2 px-3 text-sm">{driver.status}</td>
                            <td className="py-2 px-3">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleRemoveDriver(driver.id)}
                              >
                                ✕
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
                          Aucun chauffeur sélectionné
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4 py-4">
              <div className="flex items-center space-x-2 mb-4">
                <Select value={selectedVehicleToAdd} onValueChange={setSelectedVehicleToAdd}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableVehicles().map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.model} ({vehicle.licensePlate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleAddVehicle}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedVehicleToAdd}
                >
                  Ajouter
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Modèle</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Immatriculation</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Note écologique</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedVehicleIds.length > 0 ? (
                      selectedVehicleIds.map((vehicleId) => {
                        const vehicle = vehicles.find((v) => v.id === vehicleId)
                        if (!vehicle) return null

                        return (
                          <tr key={vehicle.id} className="border-b">
                            <td className="py-2 px-3 text-sm">{vehicle.model}</td>
                            <td className="py-2 px-3 text-sm">{vehicle.licensePlate}</td>
                            <td className="py-2 px-3 text-sm">
                              <span className="font-semibold text-lime-600">{vehicle.ecoRating.toFixed(1)}</span>
                              <span className="text-gray-500">/5</span>
                            </td>
                            <td className="py-2 px-3">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleRemoveVehicle(vehicle.id)}
                              >
                                ✕
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
                          Aucun véhicule sélectionné
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium" onClick={handleSave}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
