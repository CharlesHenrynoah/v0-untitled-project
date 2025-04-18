import type { Metadata } from "next"
import SignupForm from "@/components/signup-form"

export const metadata: Metadata = {
  title: "Inscription | NEOTRAVEL",
  description: "Créez votre compte NEOTRAVEL et accédez à nos services de transport",
}

// Mettre à jour les couleurs de fond et le texte
export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">Créez votre compte NEOTRAVEL</h1>
          <p className="mt-3 text-navy-600">
            Rejoignez notre plateforme et accédez à nos services de transport premium
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  )
}
