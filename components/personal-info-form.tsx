"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import type { ProfileType } from "@/components/signup-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface PersonalInfoFormProps {
  profileType: ProfileType
  onNext: (data: z.infer<typeof personalInfoSchema>) => void
  onBack: () => void
}

const personalInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Le prénom doit contenir au moins 2 caractères" })
      .regex(/^[a-zA-ZÀ-ÿ-]+$/, {
        message: "Le prénom ne peut contenir que des lettres et des tirets",
      }),
    lastName: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
      .regex(/^[a-zA-ZÀ-ÿ-]+$/, {
        message: "Le nom ne peut contenir que des lettres et des tirets",
      }),
    email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
    phone: z.string().regex(/^(06|07|01)[0-9]{8}$/, {
      message: "Le numéro doit commencer par 06, 07 ou 01 et contenir 10 chiffres",
    }),
    password: z
      .string()
      .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
      .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
      .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export default function PersonalInfoForm({ profileType, onNext, onBack }: PersonalInfoFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    onNext(data)
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const profileTitles = {
    client: "Client particulier",
    chauffeur: "Chauffeur professionnel",
    gestionnaire: "Gestionnaire de flottes",
    entreprise: "Représentant d'entreprise",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900">Informations personnelles</h2>
        <p className="mt-1 text-navy-500">
          Profil : <span className="font-medium text-lime-600">{profileTitles[profileType]}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez votre prénom" {...field} />
                  </FormControl>
                  <FormDescription>Lettres et tirets uniquement</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez votre nom" {...field} />
                  </FormControl>
                  <FormDescription>Lettres et tirets uniquement</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormDescription>Nous vous enverrons un email de confirmation</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="06 XX XX XX XX" {...field} />
                </FormControl>
                <FormDescription>Doit commencer par 06, 07 ou 01 et contenir 10 chiffres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Créez un mot de passe sécurisé"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Masquer" : "Afficher"} le mot de passe</span>
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Au moins 8 caractères, une majuscule et un chiffre</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "Masquer" : "Afficher"} le mot de passe</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
