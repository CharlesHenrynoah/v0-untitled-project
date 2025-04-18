"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Upload, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DocumentUploadFormProps {
  onNext: () => void
  onBack: () => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const documentSchema = z.object({
  vtcCard: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "La carte VTC est requise" })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "Le fichier doit faire moins de 5MB" }),
  insurance: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "L'attestation d'assurance est requise" })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "Le fichier doit faire moins de 5MB" }),
  kbis: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "L'extrait Kbis est requis" })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: "Le fichier doit faire moins de 5MB" }),
})

export default function DocumentUploadForm({ onNext, onBack }: DocumentUploadFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({
    vtcCard: null,
    insurance: null,
    kbis: null,
  })

  const form = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
  })

  const onSubmit = () => {
    console.log(uploadedFiles)
    onNext()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setUploadedFiles({
        ...uploadedFiles,
        [fieldName]: files[0],
      })
    }
  }

  const documents = [
    {
      id: "vtcCard",
      name: "Carte professionnelle VTC",
      description: "Carte professionnelle de chauffeur VTC en cours de validité",
    },
    {
      id: "insurance",
      name: "Attestation d'assurance",
      description: "Attestation d'assurance professionnelle pour le transport de personnes",
    },
    {
      id: "kbis",
      name: "Extrait Kbis",
      description: "Extrait Kbis de moins de 3 mois",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900">Documents requis</h2>
        <p className="mt-1 text-navy-500">
          Veuillez télécharger les documents suivants pour compléter votre inscription
        </p>
      </div>

      <Alert variant="warning" className="bg-amber-50 text-amber-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Tous les documents doivent être au format PDF, JPG ou PNG et ne pas dépasser 5MB. Votre compte sera validé
          manuellement après vérification des documents.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                  {uploadedFiles[doc.id] && (
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-600">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  {uploadedFiles[doc.id] ? (
                    <div className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                      <span className="truncate">{uploadedFiles[doc.id]?.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFiles({
                            ...uploadedFiles,
                            [doc.id]: null,
                          })
                        }}
                      >
                        Changer
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                      <label htmlFor={doc.id} className="flex cursor-pointer flex-col items-center">
                        <Upload className="mb-2 h-6 w-6 text-gray-400" />
                        <span className="text-sm font-medium text-emerald-600">Télécharger un fichier</span>
                        <span className="mt-1 text-xs text-gray-500">PDF, JPG ou PNG (max 5MB)</span>
                        <input
                          id={doc.id}
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, doc.id)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
              disabled={!uploadedFiles.vtcCard || !uploadedFiles.insurance || !uploadedFiles.kbis}
            >
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
