"use client"

import { CheckCircle, Mail } from "lucide-react"
import type { ProfileType } from "@/components/signup-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SuccessStepProps {
  profileType: ProfileType
}

export default function SuccessStep({ profileType }: SuccessStepProps) {
  const router = useRouter()

  const getSuccessMessage = () => {
    switch (profileType) {
      case "client":
        return {
          title: "Inscription réussie !",
          description:
            "Votre compte a été créé avec succès. Veuillez vérifier votre email pour confirmer votre adresse.",
          status: "Compte créé - En attente de confirmation email",
          nextSteps:
            "Après confirmation de votre email, vous pourrez vous connecter et commencer à utiliser nos services.",
          buttonText: "Aller à la page de connexion",
          buttonAction: () => router.push("/login"),
        }
      case "chauffeur":
        return {
          title: "Demande d'inscription envoyée !",
          description:
            "Votre demande d'inscription a été envoyée avec succès. Notre équipe va examiner vos informations et documents.",
          status: "En attente de validation administrative",
          nextSteps:
            "Vous recevrez un email dès que votre compte aura été validé par notre équipe. Ce processus peut prendre jusqu'à 48 heures ouvrées.",
          buttonText: "Retour à l'accueil",
          buttonAction: () => router.push("/"),
        }
      case "gestionnaire":
        return {
          title: "Demande d'inscription envoyée !",
          description:
            "Votre demande d'inscription a été envoyée avec succès. Notre équipe va examiner vos informations.",
          status: "En attente de validation",
          nextSteps:
            "Vous recevrez un email dès que votre compte aura été validé par notre équipe. Ce processus peut prendre jusqu'à 24 heures ouvrées.",
          buttonText: "Retour à l'accueil",
          buttonAction: () => router.push("/"),
        }
      case "entreprise":
        return {
          title: "Inscription réussie !",
          description:
            "Votre compte entreprise a été créé avec succès. Vous pouvez maintenant accéder à votre espace dédié.",
          status: "Compte créé",
          nextSteps:
            "Vous allez être redirigé vers votre tableau de bord où vous pourrez gérer vos missions et flottes.",
          buttonText: "Accéder à mon espace",
          buttonAction: () => router.push("/espacererepresentantentreprise/dashboard"),
        }
      default:
        return {
          title: "Inscription réussie !",
          description: "Votre compte a été créé avec succès.",
          status: "Compte créé",
          nextSteps: "Vous pouvez maintenant vous connecter à votre compte.",
          buttonText: "Aller à la page de connexion",
          buttonAction: () => router.push("/login"),
        }
    }
  }

  const message = getSuccessMessage()

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="mb-6 rounded-full bg-lime-100 p-3 text-lime-600">
        <CheckCircle className="h-12 w-12" />
      </div>

      <h2 className="mb-2 text-2xl font-bold text-navy-900">{message.title}</h2>
      <p className="mb-6 text-navy-600">{message.description}</p>

      <div className="mb-6 w-full rounded-lg bg-gray-50 p-4">
        <div className="mb-3">
          <span className="text-sm font-medium text-navy-500">Statut :</span>
          <span className="ml-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            {message.status}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-navy-500">Prochaines étapes :</span>
          <p className="mt-1 text-sm text-navy-600">{message.nextSteps}</p>
        </div>

        {profileType === "client" && (
          <div className="flex items-center justify-center rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <Mail className="mr-2 h-4 w-4" />
            <span>Vérifiez votre boîte de réception pour confirmer votre email</span>
          </div>
        )}
      </div>

      <Button className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium" onClick={message.buttonAction}>
        {message.buttonText}
      </Button>
    </div>
  )
}
