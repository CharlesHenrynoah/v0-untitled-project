"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, MoreHorizontal, Plus, Trash, Users, X, Car } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type pour les flottes
type Flotte = {
  id: string
  name: string
  description: string
  drivers: number
  ecoScore: string
  avgRating: number
}

// Type pour les chauffeurs
type Chauffeur = {
  id: string
  name: string
  vehicle: string
  rating: number
  status: "disponible" | "en mission"
}

// Modifier le type Vehicle pour ajouter la note écologique
type Vehicle = {
  id: string
  model: string
  type: string
  licensePlate: string
  status: "disponible" | "en mission" | "maintenance"
  ecoRating: number // Ajouter la note écologique sur 5
}

export default function FlottesList() {
  const router = useRouter()
  const [flottes, setFlottes] = useState<Flotte[]>([
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
  ])

  // Ajouter des données fictives pour les chauffeurs
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([
    { id: "C-001", name: "Jean Dupont", vehicle: "Berline", rating: 4.9, status: "disponible" },
    { id: "C-002", name: "Marie Martin", vehicle: "SUV", rating: 4.8, status: "en mission" },
    { id: "C-003", name: "Pierre Durand", vehicle: "Van", rating: 4.7, status: "disponible" },
    { id: "C-004", name: "Sophie Lefebvre", vehicle: "Berline", rating: 5.0, status: "disponible" },
    { id: "C-005", name: "Thomas Bernard", vehicle: "SUV", rating: 4.6, status: "en mission" },
    { id: "C-006", name: "Camille Petit", vehicle: "Berline", rating: 4.9, status: "disponible" },
    { id: "C-007", name: "Lucas Moreau", vehicle: "Van", rating: 4.8, status: "en mission" },
    { id: "C-008", name: "Emma Dubois", vehicle: "Berline", rating: 4.7, status: "disponible" },
    { id: "C-009", name: "Alexandre Leroy", vehicle: "SUV", rating: 4.5, status: "disponible" },
    { id: "C-010", name: "Julie Mercier", vehicle: "Berline", rating: 4.9, status: "en mission" },
    { id: "C-011", name: "Nicolas Fournier", vehicle: "Van", rating: 4.6, status: "disponible" },
    { id: "C-012", name: "Léa Girard", vehicle: "Berline", rating: 4.8, status: "disponible" },
    { id: "C-013", name: "Maxime Bonnet", vehicle: "SUV", rating: 4.7, status: "en mission" },
    { id: "C-014", name: "Chloé Lambert", vehicle: "Berline", rating: 4.9, status: "disponible" },
    { id: "C-015", name: "Antoine Rousseau", vehicle: "Van", rating: 4.5, status: "disponible" },
  ])

  // Modifier les données des véhicules pour ajouter la note écologique
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "V-001",
      model: "Mercedes Tourismo",
      type: "Bus",
      licensePlate: "AB-123-CD",
      status: "disponible",
      ecoRating: 4.2,
    },
    {
      id: "V-002",
      model: "Iveco Magelys",
      type: "Bus",
      licensePlate: "EF-456-GH",
      status: "en mission",
      ecoRating: 3.8,
    },
    {
      id: "V-003",
      model: "Setra S 517 HDH",
      type: "Bus",
      licensePlate: "IJ-789-KL",
      status: "disponible",
      ecoRating: 4.5,
    },
    {
      id: "V-004",
      model: "MAN Lion's Coach",
      type: "Bus",
      licensePlate: "MN-012-OP",
      status: "disponible",
      ecoRating: 4.7,
    },
    { id: "V-005", model: "Volvo 9900", type: "Bus", licensePlate: "QR-345-ST", status: "maintenance", ecoRating: 5.0 },
    {
      id: "V-006",
      model: "Neoplan Cityliner",
      type: "Bus",
      licensePlate: "UV-678-WX",
      status: "disponible",
      ecoRating: 4.3,
    },
    {
      id: "V-007",
      model: "Scania Touring",
      type: "Bus",
      licensePlate: "YZ-901-AB",
      status: "en mission",
      ecoRating: 3.9,
    },
    {
      id: "V-008",
      model: "Mercedes Intouro",
      type: "Bus",
      licensePlate: "CD-234-EF",
      status: "disponible",
      ecoRating: 4.1,
    },
    {
      id: "V-009",
      model: "Iveco Crossway",
      type: "Bus",
      licensePlate: "GH-567-IJ",
      status: "disponible",
      ecoRating: 3.7,
    },
    {
      id: "V-010",
      model: "Setra S 431 DT",
      type: "Bus",
      licensePlate: "KL-890-MN",
      status: "en mission",
      ecoRating: 4.4,
    },
  ])

  // État pour le dialogue d'édition
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentFlotte, setCurrentFlotte] = useState<Flotte | null>(null)
  const [newFlotteDialogOpen, setNewFlotteDialogOpen] = useState(false)
  const [newFlotte, setNewFlotte] = useState({
    name: "",
    description: "",
  })

  // État pour gérer la fenêtre des chauffeurs
  const [driversDialogOpen, setDriversDialogOpen] = useState(false)
  const [selectedFlotteId, setSelectedFlotteId] = useState<string | null>(null)
  const [selectedDriverToAdd, setSelectedDriverToAdd] = useState<string>("")

  // État pour gérer la fenêtre des véhicules
  const [vehiclesDialogOpen, setVehiclesDialogOpen] = useState(false)

  // Ajouter un état pour le véhicule sélectionné à ajouter
  const [selectedVehicleToAdd, setSelectedVehicleToAdd] = useState<string>("")

  // État pour gérer les chauffeurs assignés à chaque flotte
  const [flotteAssignments, setFlotteAssignments] = useState<Record<string, string[]>>({
    "F-001": ["C-001", "C-004", "C-006", "C-008", "C-014"],
    "F-002": ["C-002", "C-003", "C-005", "C-007", "C-009", "C-010", "C-012", "C-015"],
    "F-003": [
      "C-001",
      "C-002",
      "C-003",
      "C-004",
      "C-005",
      "C-006",
      "C-007",
      "C-008",
      "C-009",
      "C-010",
      "C-001",
      "C-012",
    ],
    "F-004": ["C-001", "C-003", "C-006", "C-009", "C-012", "C-015"],
  })

  // État pour gérer les véhicules assignés à chaque flotte
  const [flotteVehicles, setFlotteVehicles] = useState<Record<string, string[]>>({
    "F-001": ["V-001", "V-004", "V-006", "V-008"],
    "F-002": ["V-002", "V-003", "V-007", "V-010"],
    "F-003": ["V-001", "V-002", "V-003", "V-004", "V-006", "V-007", "V-008", "V-009"],
    "F-004": ["V-001", "V-003", "V-006", "V-009"],
  })

  // Ajouter un nouvel état pour le dialogue de sélection initiale des chauffeurs et véhicules
  const [newFlotteSelectionDialogOpen, setNewFlotteSelectionDialogOpen] = useState(false)
  const [newFlotteDrivers, setNewFlotteDrivers] = useState<string[]>([])
  const [newFlotteVehicles, setNewFlotteVehicles] = useState<string[]>([])
  const [selectedDriverForNewFlotte, setSelectedDriverForNewFlotte] = useState<string>("")
  const [selectedVehicleForNewFlotte, setSelectedVehicleForNewFlotte] = useState<string>("")

  // Fonction pour ouvrir la fenêtre modale des chauffeurs
  const handleViewDrivers = (flotteId: string) => {
    setSelectedFlotteId(flotteId)
    setDriversDialogOpen(true)
    setSelectedDriverToAdd("")
  }

  // Fonction pour ouvrir la fenêtre modale des véhicules
  const handleViewVehicles = (flotteId: string) => {
    setSelectedFlotteId(flotteId)
    setVehiclesDialogOpen(true)
  }

  // Ajouter une fonction pour obtenir les véhicules disponibles
  const getAvailableVehicles = (flotteId: string) => {
    const assignedVehicleIds = flotteVehicles[flotteId] || []
    return vehicles.filter((v) => !assignedVehicleIds.includes(v.id))
  }

  // Fonction pour modifier une flotte
  const handleEditFlotte = (flotte: Flotte) => {
    setCurrentFlotte(flotte)
    setEditDialogOpen(true)
  }

  // Fonction pour sauvegarder les modifications d'une flotte
  const saveFlotteChanges = () => {
    if (!currentFlotte) return

    setFlottes(flottes.map((f) => (f.id === currentFlotte.id ? currentFlotte : f)))
    setEditDialogOpen(false)
    alert(`Flotte "${currentFlotte.name}" modifiée avec succès !`)
  }

  // Fonction pour obtenir les chauffeurs disponibles (non assignés à la flotte actuelle)
  const getAvailableDrivers = (flotteId: string) => {
    const assignedDriverIds = flotteAssignments[flotteId] || []
    return chauffeurs.filter((c) => !assignedDriverIds.includes(c.id))
  }

  // Fonction pour ajouter un chauffeur spécifique à une flotte
  const handleAddSpecificDriver = (flotteId: string, chauffeurId: string) => {
    if (!chauffeurId) return

    const assignedDriverIds = flotteAssignments[flotteId] || []

    // Vérifier si le chauffeur est déjà assigné
    if (assignedDriverIds.includes(chauffeurId)) {
      alert("Ce chauffeur est déjà assigné à cette flotte !")
      return
    }

    // Ajouter le chauffeur à la flotte
    const updatedAssignments = {
      ...flotteAssignments,
      [flotteId]: [...assignedDriverIds, chauffeurId],
    }

    setFlotteAssignments(updatedAssignments)

    // Mettre à jour le nombre de chauffeurs dans la flotte
    setFlottes(
      flottes.map((f) => {
        if (f.id === flotteId) {
          return { ...f, drivers: updatedAssignments[flotteId].length }
        }
        return f
      }),
    )

    // Réinitialiser la sélection
    setSelectedDriverToAdd("")
  }

  // Fonction pour ajouter un chauffeur à une flotte (ancienne version)
  const handleAddDriver = (flotteId: string) => {
    // Au lieu d'ajouter directement un chauffeur, ouvrons la fenêtre modale des chauffeurs
    setSelectedFlotteId(flotteId)
    setDriversDialogOpen(true)
    setSelectedDriverToAdd("")
  }

  // Fonction pour ajouter un véhicule à une flotte
  const handleAddVehicle = (flotteId: string) => {
    // Au lieu d'ajouter directement un véhicule, ouvrons la fenêtre modale des véhicules
    setSelectedFlotteId(flotteId)
    setVehiclesDialogOpen(true)
    setSelectedVehicleToAdd("")
  }

  // Fonction pour supprimer un chauffeur d'une flotte
  const handleRemoveDriver = (flotteId: string, chauffeurId: string) => {
    const assignedDriverIds = flotteAssignments[flotteId] || []

    // Supprimer le chauffeur de la liste
    const updatedAssignments = {
      ...flotteAssignments,
      [flotteId]: assignedDriverIds.filter((id) => id !== chauffeurId),
    }

    setFlotteAssignments(updatedAssignments)

    // Mettre à jour le nombre de chauffeurs dans la flotte
    setFlottes(
      flottes.map((f) => {
        if (f.id === flotteId) {
          return { ...f, drivers: updatedAssignments[flotteId].length }
        }
        return f
      }),
    )
  }

  // Ajouter une fonction pour supprimer un véhicule d'une flotte
  const handleRemoveVehicle = (flotteId: string, vehicleId: string) => {
    const assignedVehicleIds = flotteVehicles[flotteId] || []

    // Supprimer le véhicule de la liste
    const updatedAssignments = {
      ...flotteVehicles,
      [flotteId]: assignedVehicleIds.filter((id) => id !== vehicleId),
    }

    setFlotteVehicles(updatedAssignments)
  }

  // Ajouter une fonction pour ajouter un véhicule spécifique à une flotte
  const handleAddSpecificVehicle = (flotteId: string, vehicleId: string) => {
    if (!vehicleId) return

    const assignedVehicleIds = flotteVehicles[flotteId] || []

    // Vérifier si le véhicule est déjà assigné
    if (assignedVehicleIds.includes(vehicleId)) {
      alert("Ce véhicule est déjà assigné à cette flotte !")
      return
    }

    // Ajouter le véhicule à la flotte
    const updatedAssignments = {
      ...flotteVehicles,
      [flotteId]: [...assignedVehicleIds, vehicleId],
    }

    setFlotteVehicles(updatedAssignments)

    // Réinitialiser la sélection
    setSelectedVehicleToAdd("")
  }

  // Fonction pour supprimer une flotte
  const handleDeleteFlotte = (flotteId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette flotte ?")) {
      setFlottes(flottes.filter((f) => f.id !== flotteId))

      // Supprimer également les assignations de chauffeurs
      const { [flotteId]: _, ...restAssignments } = flotteAssignments
      setFlotteAssignments(restAssignments)

      alert("Flotte supprimée avec succès !")
    }
  }

  // Modifier la fonction handleCreateFlotte pour prendre en compte les chauffeurs et véhicules sélectionnés
  const handleCreateFlotte = () => {
    if (newFlotteDrivers.length === 0 || newFlotteVehicles.length === 0) {
      alert("Vous devez sélectionner au moins un chauffeur et un véhicule pour créer une flotte.")
      return
    }

    const newId = `F-00${flottes.length + 1}`
    const flotteToAdd = {
      id: newId,
      name: newFlotte.name,
      description: newFlotte.description,
      drivers: newFlotteDrivers.length,
      ecoScore: "N/A",
      avgRating: 0,
    }

    setFlottes([...flottes, flotteToAdd])

    // Ajouter les chauffeurs et véhicules sélectionnés à la nouvelle flotte
    setFlotteAssignments({
      ...flotteAssignments,
      [newId]: newFlotteDrivers,
    })

    setFlotteVehicles({
      ...flotteVehicles,
      [newId]: newFlotteVehicles,
    })

    setNewFlotteDialogOpen(false)
    setNewFlotteSelectionDialogOpen(false)
    setNewFlotte({ name: "", description: "" })
    setNewFlotteDrivers([])
    setNewFlotteVehicles([])
    alert(`Nouvelle flotte "${newFlotte.name}" créée avec succès !`)
  }

  // Ajouter une fonction pour gérer la sélection initiale des chauffeurs
  const handleAddDriverToNewFlotte = () => {
    if (!selectedDriverForNewFlotte) return

    if (newFlotteDrivers.includes(selectedDriverForNewFlotte)) {
      alert("Ce chauffeur est déjà sélectionné !")
      return
    }

    setNewFlotteDrivers([...newFlotteDrivers, selectedDriverForNewFlotte])
    setSelectedDriverForNewFlotte("")
  }

  // Ajouter une fonction pour gérer la sélection initiale des véhicules
  const handleAddVehicleToNewFlotte = () => {
    if (!selectedVehicleForNewFlotte) return

    if (newFlotteVehicles.includes(selectedVehicleForNewFlotte)) {
      alert("Ce véhicule est déjà sélectionné !")
      return
    }

    setNewFlotteVehicles([...newFlotteVehicles, selectedVehicleForNewFlotte])
    setSelectedVehicleForNewFlotte("")
  }

  // Ajouter une fonction pour supprimer un chauffeur de la sélection initiale
  const handleRemoveDriverFromNewFlotte = (driverId: string) => {
    setNewFlotteDrivers(newFlotteDrivers.filter((id) => id !== driverId))
  }

  // Ajouter une fonction pour supprimer un véhicule de la sélection initiale
  const handleRemoveVehicleFromNewFlotte = (vehicleId: string) => {
    setNewFlotteVehicles(newFlotteVehicles.filter((id) => id !== vehicleId))
  }

  // Ajouter une fonction pour continuer vers la sélection des chauffeurs et véhicules
  const handleContinueToSelection = () => {
    if (!newFlotte.name) {
      alert("Veuillez saisir un nom pour la flotte.")
      return
    }

    setNewFlotteDialogOpen(false)
    setNewFlotteSelectionDialogOpen(true)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flottes.map((flotte) => (
        <Card key={flotte.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{flotte.name}</CardTitle>
                <CardDescription>{flotte.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditFlotte(flotte)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier la flotte
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddDriver(flotte.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un chauffeur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddVehicle(flotte.id)}>
                    <Car className="mr-2 h-4 w-4" />
                    Ajouter un véhicule
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteFlotte(flotte.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer la flotte
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm">{flotteAssignments[flotte.id]?.length || 0} chauffeurs</span>
                <Car className="ml-4 mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm">{flotteVehicles[flotte.id]?.length || 0} véhicules</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500">Score chauffeurs:</span>
                  <span className="ml-2 font-semibold text-lime-600">
                    {flotteAssignments[flotte.id]?.length > 0
                      ? (
                          flotteAssignments[flotte.id]?.reduce((sum, id) => {
                            const driver = chauffeurs.find((c) => c.id === id)
                            return driver ? sum + driver.rating : sum
                          }, 0) / flotteAssignments[flotte.id]?.length
                        ).toFixed(1)
                      : "N/A"}
                    /5
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Score véhicules:</span>
                  <span className="ml-2 font-semibold text-lime-600">
                    {flotteVehicles[flotte.id]?.length > 0
                      ? (
                          flotteVehicles[flotte.id]?.reduce((sum, id) => {
                            const vehicle = vehicles.find((v) => v.id === id)
                            return vehicle ? sum + vehicle.ecoRating : sum
                          }, 0) / flotteVehicles[flotte.id]?.length
                        ).toFixed(1)
                      : "N/A"}
                    /5
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              className="w-full bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
              onClick={() => handleViewDrivers(flotte.id)}
            >
              <Users className="mr-2 h-4 w-4" />
              Voir les chauffeurs
            </Button>
            <Button
              className="w-full bg-navy-700 hover:bg-navy-800 text-white font-medium"
              onClick={() => handleViewVehicles(flotte.id)}
            >
              <Car className="mr-2 h-4 w-4" />
              Voir les véhicules
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Remplacer la Card pour créer une nouvelle flotte */}
      <Card className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6">
        <div className="mb-4 rounded-full bg-lime-100 p-3 text-lime-600">
          <Plus className="h-6 w-6" />
        </div>
        <h3 className="mb-1 text-lg font-medium">Créer une nouvelle flotte</h3>
        <p className="mb-4 text-center text-sm text-gray-500">
          Regroupez vos chauffeurs et véhicules selon vos besoins spécifiques
        </p>
        <Button
          className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
          onClick={() => setNewFlotteDialogOpen(true)}
          data-create-flotte
        >
          Créer une flotte
        </Button>
      </Card>

      {/* Dialog pour éditer une flotte */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la flotte</DialogTitle>
            <DialogDescription>Modifiez les informations de votre flotte personnalisée.</DialogDescription>
          </DialogHeader>
          {currentFlotte && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la flotte</Label>
                <Input
                  id="name"
                  value={currentFlotte.name}
                  onChange={(e) => setCurrentFlotte({ ...currentFlotte, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentFlotte.description}
                  onChange={(e) => setCurrentFlotte({ ...currentFlotte, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium" onClick={saveFlotteChanges}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modifier le Dialog pour créer une nouvelle flotte */}
      <Dialog open={newFlotteDialogOpen} onOpenChange={setNewFlotteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle flotte</DialogTitle>
            <DialogDescription>
              Créez une nouvelle flotte personnalisée pour regrouper vos chauffeurs et véhicules.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Nom de la flotte</Label>
              <Input
                id="new-name"
                value={newFlotte.name}
                onChange={(e) => setNewFlotte({ ...newFlotte, name: e.target.value })}
                placeholder="Ex: Transferts VIP"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newFlotte.description}
                onChange={(e) => setNewFlotte({ ...newFlotte, description: e.target.value })}
                placeholder="Ex: Chauffeurs premium pour accueil clients importants"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFlotteDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
              onClick={handleContinueToSelection}
              disabled={!newFlotte.name}
            >
              Continuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fenêtre modale pour afficher les chauffeurs */}
      <Dialog open={driversDialogOpen} onOpenChange={setDriversDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              Chauffeurs de la flotte {selectedFlotteId && flottes.find((f) => f.id === selectedFlotteId)?.name}
            </DialogTitle>
            <DialogDescription>Liste des chauffeurs assignés à cette flotte personnalisée.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm text-gray-500">
                {(selectedFlotteId && flotteAssignments[selectedFlotteId]?.length) || 0} chauffeurs assignés
              </span>
            </div>

            {/* Menu déroulant pour ajouter un chauffeur spécifique */}
            {selectedFlotteId && getAvailableDrivers(selectedFlotteId).length > 0 ? (
              <div className="flex items-center space-x-2">
                <Select value={selectedDriverToAdd} onValueChange={setSelectedDriverToAdd}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Sélectionner un chauffeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDrivers(selectedFlotteId).map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} ({driver.rating}/5)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={() => selectedFlotteId && handleAddSpecificDriver(selectedFlotteId, selectedDriverToAdd)}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedDriverToAdd}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            ) : (
              <Button size="sm" className="bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                <Plus className="mr-2 h-4 w-4" />
                Aucun chauffeur disponible
              </Button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium">Nom</th>
                  <th className="py-2 text-left font-medium">Note</th>
                  <th className="py-2 text-left font-medium">Statut</th>
                  <th className="py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedFlotteId && flotteAssignments[selectedFlotteId]?.length > 0 ? (
                  flotteAssignments[selectedFlotteId].map((chauffeurId) => {
                    const chauffeur = chauffeurs.find((c) => c.id === chauffeurId)
                    if (!chauffeur) return null

                    return (
                      <tr key={chauffeur.id} className="border-b">
                        <td className="py-2">{chauffeur.name}</td>
                        <td className="py-2">
                          <span className="font-semibold text-lime-600">{chauffeur.rating}</span>
                          <span className="text-gray-500">/5</span>
                        </td>
                        <td className="py-2">
                          <Badge
                            className={
                              chauffeur.status === "disponible"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }
                          >
                            {chauffeur.status === "disponible" ? "Disponible" : "En mission"}
                          </Badge>
                        </td>
                        <td className="py-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center"
                            onClick={() => selectedFlotteId && handleRemoveDriver(selectedFlotteId, chauffeur.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      <Users className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>Aucun chauffeur dans cette flotte</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDriversDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fenêtre modale pour afficher les véhicules */}
      <Dialog open={vehiclesDialogOpen} onOpenChange={setVehiclesDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              Véhicules de la flotte {selectedFlotteId && flottes.find((f) => f.id === selectedFlotteId)?.name}
            </DialogTitle>
            <DialogDescription>Liste des véhicules assignés à cette flotte personnalisée.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm text-gray-500">
                {(selectedFlotteId && flotteVehicles[selectedFlotteId]?.length) || 0} véhicules assignés
              </span>
            </div>

            {/* Menu déroulant pour ajouter un véhicule spécifique */}
            {selectedFlotteId && getAvailableVehicles(selectedFlotteId).length > 0 ? (
              <div className="flex items-center space-x-2">
                <Select value={selectedVehicleToAdd} onValueChange={setSelectedVehicleToAdd}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableVehicles(selectedFlotteId).map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.model} ({vehicle.licensePlate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={() => selectedFlotteId && handleAddSpecificVehicle(selectedFlotteId, selectedVehicleToAdd)}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedVehicleToAdd}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            ) : (
              <Button size="sm" className="bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                <Plus className="mr-2 h-4 w-4" />
                Aucun véhicule disponible
              </Button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium">Modèle</th>
                  <th className="py-2 text-left font-medium">Type</th>
                  <th className="py-2 text-left font-medium">Immatriculation</th>
                  <th className="py-2 text-left font-medium">Note écologique</th>
                  <th className="py-2 text-left font-medium">Statut</th>
                  <th className="py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedFlotteId && flotteVehicles[selectedFlotteId]?.length > 0 ? (
                  flotteVehicles[selectedFlotteId].map((vehicleId) => {
                    const vehicle = vehicles.find((v) => v.id === vehicleId)
                    if (!vehicle) return null

                    return (
                      <tr key={vehicle.id} className="border-b">
                        <td className="py-2">{vehicle.model}</td>
                        <td className="py-2">{vehicle.type}</td>
                        <td className="py-2">{vehicle.licensePlate}</td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <span className="font-semibold text-lime-600 mr-1">{vehicle.ecoRating.toFixed(1)}</span>
                            <span className="text-gray-500">/5</span>
                            <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-lime-500 rounded-full"
                                style={{ width: `${(vehicle.ecoRating / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2">
                          <Badge
                            className={
                              vehicle.status === "disponible"
                                ? "bg-green-100 text-green-800"
                                : vehicle.status === "en mission"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {vehicle.status === "disponible"
                              ? "Disponible"
                              : vehicle.status === "en mission"
                                ? "En mission"
                                : "Maintenance"}
                          </Badge>
                        </td>
                        <td className="py-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center"
                            onClick={() => selectedFlotteId && handleRemoveVehicle(selectedFlotteId, vehicle.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      <Car className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>Aucun véhicule dans cette flotte</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVehiclesDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ajouter un nouveau Dialog pour la sélection des chauffeurs et véhicules */}
      <Dialog open={newFlotteSelectionDialogOpen} onOpenChange={setNewFlotteSelectionDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Sélection des chauffeurs et véhicules</DialogTitle>
            <DialogDescription>
              Sélectionnez au moins un chauffeur et un véhicule pour votre flotte "{newFlotte.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-sm font-medium">Chauffeurs</h3>
              <div className="flex items-center space-x-2 mb-4">
                <Select value={selectedDriverForNewFlotte} onValueChange={setSelectedDriverForNewFlotte}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un chauffeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {chauffeurs
                      .filter((c) => !newFlotteDrivers.includes(c.id))
                      .map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name} ({driver.rating}/5)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleAddDriverToNewFlotte}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedDriverForNewFlotte}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Nom</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Note</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFlotteDrivers.length > 0 ? (
                      newFlotteDrivers.map((driverId) => {
                        const driver = chauffeurs.find((c) => c.id === driverId)
                        if (!driver) return null

                        return (
                          <tr key={driver.id} className="border-b">
                            <td className="py-2 px-3 text-sm">{driver.name}</td>
                            <td className="py-2 px-3 text-sm">
                              <span className="font-semibold text-lime-600">{driver.rating}</span>
                              <span className="text-gray-500">/5</span>
                            </td>
                            <td className="py-2 px-3">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleRemoveDriverFromNewFlotte(driver.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-sm text-gray-500">
                          Aucun chauffeur sélectionné
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {newFlotteDrivers.length === 0 && (
                <p className="mt-2 text-xs text-red-500">Vous devez sélectionner au moins un chauffeur</p>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Véhicules</h3>
              <div className="flex items-center space-x-2 mb-4">
                <Select value={selectedVehicleForNewFlotte} onValueChange={setSelectedVehicleForNewFlotte}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles
                      .filter((v) => !newFlotteVehicles.includes(v.id))
                      .map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.model} ({vehicle.licensePlate})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleAddVehicleToNewFlotte}
                  className="bg-lime-500 hover:bg-lime-600 text-navy-900"
                  disabled={!selectedVehicleForNewFlotte}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Modèle</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Immatriculation</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFlotteVehicles.length > 0 ? (
                      newFlotteVehicles.map((vehicleId) => {
                        const vehicle = vehicles.find((v) => v.id === vehicleId)
                        if (!vehicle) return null

                        return (
                          <tr key={vehicle.id} className="border-b">
                            <td className="py-2 px-3 text-sm">{vehicle.model}</td>
                            <td className="py-2 px-3 text-sm">{vehicle.licensePlate}</td>
                            <td className="py-2 px-3">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => handleRemoveVehicleFromNewFlotte(vehicle.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-sm text-gray-500">
                          Aucun véhicule sélectionné
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {newFlotteVehicles.length === 0 && (
                <p className="mt-2 text-xs text-red-500">Vous devez sélectionner au moins un véhicule</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setNewFlotteSelectionDialogOpen(false)
                setNewFlotteDialogOpen(true)
              }}
            >
              Retour
            </Button>
            <Button
              className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
              onClick={handleCreateFlotte}
              disabled={newFlotteDrivers.length === 0 || newFlotteVehicles.length === 0}
            >
              Créer la flotte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
