"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Check, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Schéma de validation pour le formulaire
const profileSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  companyAddress: z.string().min(5, "L'adresse doit être complète"),
  siret: z.string().regex(/^\d{14}$/, "Le SIRET doit contenir exactement 14 chiffres"),
  tva: z.string().optional(),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().regex(/^(06|07|01)[0-9]{8}$/, "Le format du numéro de téléphone est incorrect"),
  role: z.string().min(2, "La fonction doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilPage() {
  const { toast } = useToast()
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("/abstract-geometric-logo.png")
  const [kbisFile, setKbisFile] = useState<File | null>(null)
  const [otherDocFile, setOtherDocFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Initialiser le formulaire avec les valeurs par défaut
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "NeoTraavel",
      companyAddress: "102 Avenue des Algorithmes, 69007 Lyon, France",
      siret: "84910236500019",
      tva: "FR12345678900",
      firstName: "Marie",
      lastName: "Lefevre",
      email: "m.lefevre@neotraavel.fr",
      phone: "06 12 34 56 78",
      role: "Gestionnaire de flottes",
      description:
        "NeoTraavel est une entreprise spécialisée dans le développement de solutions innovantes pour l'industrie du transport et de la logistique.",
    },
  })

  // Gérer le téléchargement du logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Gérer le téléchargement du Kbis
  const handleKbisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setKbisFile(file)
      toast({
        title: "Document téléchargé",
        description: `Extrait Kbis: ${file.name}`,
      })
    }
  }

  // Gérer le téléchargement d'autres documents
  const handleOtherDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOtherDocFile(file)
      toast({
        title: "Document téléchargé",
        description: `Document: ${file.name}`,
      })
    }
  }

  // Soumettre le formulaire
  const onSubmit = (data: ProfileFormValues) => {
    setIsSaving(true)

    // Simuler une requête API
    setTimeout(() => {
      console.log("Données du formulaire:", data)
      console.log("Logo:", logoFile)
      console.log("Kbis:", kbisFile)
      console.log("Autre document:", otherDocFile)

      setIsSaving(false)
      toast({
        title: "Modifications enregistrées",
        description: "Votre profil a été mis à jour avec succès.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">Profil Gestionnaire</h2>
            <div className="flex space-x-2">
              <Button
                type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Sauvegarder les modifications"
                )}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
                <CardDescription>Gérez les informations administratives de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Nom de l'entreprise</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Numéro SIRET</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tva"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Numéro TVA</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="FR12345678900" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Informations du gestionnaire de flottes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Fonction</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Identité visuelle</CardTitle>
                <CardDescription>Logo et description de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo de l'entreprise</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-24 w-24 rounded-md bg-gray-100 flex items-center justify-center">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="h-10"
                        onClick={() => document.getElementById("logo-upload")?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger un logo
                      </Button>
                      <input
                        id="logo-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Description publique</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormDescription>Cette description sera visible par les chauffeurs et clients.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents officiels</CardTitle>
                <CardDescription>Téléchargez vos documents administratifs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Extrait Kbis</Label>
                  {kbisFile ? (
                    <div className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span className="truncate">{kbisFile.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setKbisFile(null)
                          const input = document.getElementById("kbis-upload") as HTMLInputElement
                          if (input) input.value = ""
                        }}
                      >
                        Changer
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div
                        className="rounded-md border border-dashed border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById("kbis-upload")?.click()}
                      >
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-lime-600">Télécharger un fichier</p>
                        <p className="mt-1 text-xs text-gray-500">PDF uniquement (max 5MB)</p>
                      </div>
                      <input
                        id="kbis-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleKbisUpload}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Autres documents</Label>
                  {otherDocFile ? (
                    <div className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span className="truncate">{otherDocFile.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOtherDocFile(null)
                          const input = document.getElementById("other-doc-upload") as HTMLInputElement
                          if (input) input.value = ""
                        }}
                      >
                        Changer
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div
                        className="rounded-md border border-dashed border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById("other-doc-upload")?.click()}
                      >
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-lime-600">Télécharger un fichier</p>
                        <p className="mt-1 text-xs text-gray-500">PDF, JPG ou PNG (max 5MB)</p>
                      </div>
                      <input
                        id="other-doc-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleOtherDocUpload}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Ces documents sont utilisés uniquement à des fins de vérification et ne sont pas partagés avec des
                  tiers.
                </p>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}
