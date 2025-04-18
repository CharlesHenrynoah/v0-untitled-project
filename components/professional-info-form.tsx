"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { ProfileType } from "@/components/signup-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ProfessionalInfoFormProps {
  profileType: ProfileType
  onNext: (data: any) => void
  onBack: () => void
}

// Schéma dynamique en fonction du type de profil
const getFormSchema = (profileType: ProfileType) => {
  const baseSchema = {
    // Champs communs à tous les profils professionnels
  }

  if (profileType === "chauffeur") {
    return z.object({
      licenseNumber: z.string().min(1, { message: "Numéro de permis requis" }),
      experience: z.string().min(1, { message: "Expérience requise" }),
      vehicleType: z.string().min(1, { message: "Type de véhicule requis" }),
      vtcCardNumber: z.string().min(1, { message: "Numéro de carte VTC requis" }),
      insuranceNumber: z.string().min(1, { message: "Numéro d'assurance requis" }),
      kbisNumber: z.string().min(1, { message: "Numéro Kbis requis" }),
    })
  } else if (profileType === "gestionnaire") {
    return z.object({
      companyName: z.string().optional(),
      role: z.string().min(1, { message: "Rôle dans l'organisation requis" }),
      fleetSize: z.string().min(1, { message: "Taille de la flotte requise" }),
    })
  } else if (profileType === "entreprise") {
    return z.object({
      companyName: z
        .string()
        .min(1, { message: "Raison sociale requise" })
        .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, {
          message: "La raison sociale ne peut contenir que des lettres, espaces et tirets",
        }),
      companyAddress: z
        .string()
        .min(1, { message: "Adresse requise" })
        .refine(
          (val) => {
            // Vérifier que l'adresse contient un numéro, une rue, un code postal et une ville
            return /\d+.*\d{5}.*[a-zA-Z]+/.test(val)
          },
          { message: "L'adresse doit contenir un numéro, une rue, un code postal et une ville" },
        ),
      siretNumber: z
        .string()
        .min(1, { message: "Numéro SIRET requis" })
        .regex(/^\d{14}$/, {
          message: "Le SIRET doit contenir exactement 14 chiffres sans espaces ni caractères spéciaux",
        }),
      role: z
        .string()
        .min(1, { message: "Rôle dans l'organisation requis" })
        .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, {
          message: "La fonction ne peut contenir que des lettres, espaces et tirets",
        }),
    })
  }

  return z.object({})
}

export default function ProfessionalInfoForm({ profileType, onNext, onBack }: ProfessionalInfoFormProps) {
  const formSchema = getFormSchema(profileType)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onNext(data)
  }

  const renderChauffeurForm = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de permis</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre numéro de permis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expérience (années)</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Moins d'1 an</SelectItem>
                    <SelectItem value="1-3">1 à 3 ans</SelectItem>
                    <SelectItem value="3-5">3 à 5 ans</SelectItem>
                    <SelectItem value="5+">Plus de 5 ans</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="vehicleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de véhicule</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre type de véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="berline">Berline</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="luxury">Véhicule de luxe</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="vtcCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de carte VTC</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre numéro de carte VTC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insuranceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro d'assurance</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre numéro d'assurance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="kbisNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro Kbis</FormLabel>
            <FormControl>
              <Input placeholder="Entrez votre numéro Kbis" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-md bg-amber-50 p-4">
        <p className="text-sm text-amber-800">Vous devrez télécharger vos documents officiels à l'étape suivante.</p>
      </div>
    </>
  )

  const renderGestionnaireForm = () => (
    <>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise (optionnel)</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom de votre entreprise" {...field} />
            </FormControl>
            <FormDescription>Laissez vide si vous êtes un gestionnaire indépendant</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rôle dans l'organisation</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Responsable logistique, Directeur des opérations" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fleetSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taille de la flotte</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la taille de votre flotte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1 à 5 véhicules</SelectItem>
                  <SelectItem value="6-20">6 à 20 véhicules</SelectItem>
                  <SelectItem value="21-50">21 à 50 véhicules</SelectItem>
                  <SelectItem value="50+">Plus de 50 véhicules</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )

  const renderEntrepriseForm = () => (
    <>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Raison sociale</FormLabel>
            <FormControl>
              <Input placeholder="Ex: QuantumBridge Technologies" {...field} />
            </FormControl>
            <FormDescription className="text-sm text-red-500">
              ⚠️ Utilisez uniquement des lettres, espaces et tirets. Évitez les symboles spéciaux (@, #, !) et les
              chiffres seuls.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse de l'entreprise</FormLabel>
            <FormControl>
              <Textarea placeholder="Ex: 42 Rue Lafayette, 75009 Paris, France" className="min-h-[80px]" {...field} />
            </FormControl>
            <FormDescription className="text-sm text-red-500">
              ⚠️ Format requis: numéro + rue, code postal, ville, pays (ex: 42 Rue Lafayette, 75009 Paris, France)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="siretNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro SIRET</FormLabel>
            <FormControl>
              <Input placeholder="Ex: 12345678900010" {...field} />
            </FormControl>
            <FormDescription className="text-sm text-red-500">
              ⚠️ Exactement 14 chiffres sans espaces ni caractères spéciaux. Format: XXXXXXXXXYYYYY (9 chiffres SIREN + 5
              chiffres NIC)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Votre fonction</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Directeur Général, Responsable Marketing" {...field} />
            </FormControl>
            <FormDescription className="text-sm text-red-500">
              ⚠️ Fonction claire et professionnelle. Évitez les abréviations douteuses (DG, CEO#) et les caractères
              spéciaux.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )

  const renderFormByProfileType = () => {
    switch (profileType) {
      case "chauffeur":
        return renderChauffeurForm()
      case "gestionnaire":
        return renderGestionnaireForm()
      case "entreprise":
        return renderEntrepriseForm()
      default:
        return null
    }
  }

  const profileTitles = {
    chauffeur: "Informations professionnelles - Chauffeur",
    gestionnaire: "Informations professionnelles - Gestionnaire",
    entreprise: "Informations professionnelles - Entreprise",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900">{profileTitles[profileType]}</h2>
        <p className="mt-1 text-navy-500">Complétez les informations spécifiques à votre profil</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderFormByProfileType()}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Retour
            </Button>
            <Button type="submit" className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium">
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
