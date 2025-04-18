"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MissionsOverview() {
  // Modifier la structure des données des missions pour inclure les scores de satisfaction et les émissions
  const missions = [
    {
      id: "M-2023-042",
      date: "15/04/2023",
      type: "Transfert",
      from: "Aéroport Lyon Saint-Exupéry",
      to: "Siège QuantumBridge",
      driver: "Jean Dupont",
      vehicle: "Berline",
      status: "completed",
      cost: "120 €",
      satisfaction: 4.9,
      emissions: 8.5,
      profit: "30 €",
    },
    {
      id: "M-2023-043",
      date: "18/04/2023",
      type: "Journée",
      from: "Siège QuantumBridge",
      to: "Salon Tech Lyon",
      driver: "Sophie Martin",
      vehicle: "Van",
      status: "completed",
      cost: "450 €",
      satisfaction: 4.8,
      emissions: 22.3,
      profit: "112 €",
    },
    {
      id: "M-2023-044",
      date: "22/04/2023",
      type: "Transfert",
      from: "Gare Part-Dieu",
      to: "Siège QuantumBridge",
      driver: "Marc Leroy",
      vehicle: "Berline",
      status: "completed",
      cost: "85 €",
      satisfaction: 5.0,
      emissions: 6.2,
      profit: "21 €",
    },
    {
      id: "M-2023-045",
      date: "25/04/2023",
      type: "Transfert",
      from: "Siège QuantumBridge",
      to: "Aéroport Lyon Saint-Exupéry",
      driver: "Jean Dupont",
      vehicle: "SUV",
      status: "in-progress",
      cost: "135 €",
    },
    {
      id: "M-2023-046",
      date: "28/04/2023",
      type: "Demi-journée",
      from: "Siège QuantumBridge",
      to: "Visite clients",
      driver: "Sophie Martin",
      vehicle: "Berline",
      status: "planned",
      cost: "220 €",
    },
  ]

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

  // Modifier le rendu du tableau pour afficher les informations supplémentaires pour les missions terminées
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Trajet</TableHead>
            <TableHead>Chauffeur</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>{/* Coût ou Bénéfice */}</TableHead>
            <TableHead>{/* Satisfaction */}</TableHead>
            <TableHead>{/* Émissions */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {missions.map((mission) => (
            <TableRow key={mission.id}>
              <TableCell className="font-medium">{mission.id}</TableCell>
              <TableCell>{mission.date}</TableCell>
              <TableCell>{mission.type}</TableCell>
              <TableCell>
                {mission.from} → {mission.to}
              </TableCell>
              <TableCell>{mission.driver}</TableCell>
              <TableCell>{mission.vehicle}</TableCell>
              <TableCell>{getStatusBadge(mission.status)}</TableCell>

              {mission.status === "completed" ? (
                <>
                  <TableCell className="font-semibold text-lime-600">{mission.profit}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
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
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-semibold text-lime-600">{mission.emissions}</span>
                      <span className="ml-1 text-xs text-gray-500">kg CO₂</span>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{mission.cost}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
