"use client"

import { User, Car, Building2, Briefcase } from "lucide-react"
import type { ProfileType } from "@/components/signup-form"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileTypeSelectionProps {
  onSelect: (type: ProfileType) => void
}

// Mettre à jour les couleurs des cartes et des icônes
export default function ProfileTypeSelection({ onSelect }: ProfileTypeSelectionProps) {
  const profileTypes = [
    {
      id: "client",
      title: "Client particulier",
      description: "Réservez des trajets pour vos déplacements personnels",
      icon: User,
    },
    {
      id: "chauffeur",
      title: "Chauffeur professionnel",
      description: "Rejoignez notre réseau de chauffeurs partenaires",
      icon: Car,
    },
    {
      id: "gestionnaire",
      title: "Gestionnaire de flottes",
      description: "Gérez une flotte de véhicules et de chauffeurs",
      icon: Building2,
    },
    {
      id: "entreprise",
      title: "Représentant d'entreprise",
      description: "Inscrivez votre entreprise pour des services professionnels",
      icon: Briefcase,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-navy-900">Sélectionnez votre profil</h2>
        <p className="mt-1 text-navy-500">Choisissez le type de compte qui correspond à vos besoins</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profileTypes.map((profile) => (
          <Card
            key={profile.id}
            className="cursor-pointer border-2 transition-all hover:border-lime-500 hover:shadow-md"
            onClick={() => onSelect(profile.id as ProfileType)}
          >
            <CardContent className="flex items-start gap-4 p-4">
              <div className="rounded-full bg-lime-100 p-3 text-lime-600">
                <profile.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-navy-900">{profile.title}</h3>
                <p className="mt-1 text-sm text-navy-500">{profile.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
