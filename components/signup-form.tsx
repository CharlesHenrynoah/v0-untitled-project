"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import ProfileTypeSelection from "@/components/profile-type-selection"
import PersonalInfoForm from "@/components/personal-info-form"
import ProfessionalInfoForm from "@/components/professional-info-form"
import LegalConsentForm from "@/components/legal-consent-form"
import SuccessStep from "@/components/success-step"

export type ProfileType = "client" | "chauffeur" | "gestionnaire" | "entreprise"

export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    personal?: any
    professional?: any
    documents?: any
    legal?: any
  }>({})

  const totalSteps = profileType === "client" ? 4 : 5
  const progress = (step / totalSteps) * 100

  const handleProfileSelect = (type: ProfileType) => {
    setProfileType(type)
    setStep(2)
  }

  const handleNextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handlePersonalInfoSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, personal: data }))
    handleNextStep()
  }

  const handleProfessionalInfoSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, professional: data }))
    handleNextStep()
  }

  const handleLegalConsentSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, legal: data }))
    handleSubmit()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simuler l'envoi des données au serveur
    console.log("Données complètes du formulaire:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setStep(totalSteps)
  }

  return (
    <Card className="border-gray-200 shadow-lg">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-gray-100" indicatorColor="bg-lime-500" />
            <div className="mt-2 flex justify-between text-sm text-navy-500">
              <span>
                Étape {step} sur {totalSteps}
              </span>
              <span>{Math.round(progress)}% complété</span>
            </div>
          </div>

          {step === 1 && <ProfileTypeSelection onSelect={handleProfileSelect} />}

          {step === 2 && (
            <PersonalInfoForm profileType={profileType!} onNext={handlePersonalInfoSubmit} onBack={handlePrevStep} />
          )}

          {step === 3 && profileType !== "client" && (
            <ProfessionalInfoForm
              profileType={profileType!}
              onNext={handleProfessionalInfoSubmit}
              onBack={handlePrevStep}
            />
          )}

          {step === (profileType === "client" ? 3 : 4) && (
            <LegalConsentForm onNext={handleLegalConsentSubmit} onBack={handlePrevStep} isSubmitting={isSubmitting} />
          )}

          {step === totalSteps && <SuccessStep profileType={profileType!} />}
        </div>
      </CardContent>
    </Card>
  )
}
