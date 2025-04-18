"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Rediriger vers l'espace représentant après 5 secondes
    const timer = setTimeout(() => {
      router.push("/espacererepresentantentreprise/dashboard")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-lime-100 p-3">
            <CheckCircle className="h-12 w-12 text-lime-600" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-navy-900">Inscription réussie !</h1>
        <p className="mb-6 text-navy-600">
          Votre compte entreprise a été créé avec succès. Vous allez être redirigé vers votre tableau de bord.
        </p>
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full animate-progress bg-lime-500"></div>
        </div>
        <Button
          onClick={() => router.push("/espacererepresentantentreprise/dashboard")}
          className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
        >
          Accéder maintenant au tableau de bord
        </Button>
      </div>
    </div>
  )
}
