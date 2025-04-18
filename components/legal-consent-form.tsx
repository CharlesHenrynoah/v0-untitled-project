"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface LegalConsentFormProps {
  onNext: (data: z.infer<typeof legalConsentSchema>) => void
  onBack: () => void
  isSubmitting: boolean
}

const legalConsentSchema = z.object({
  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les conditions générales d'utilisation",
  }),
  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  marketingConsent: z.boolean().optional(),
})

export default function LegalConsentForm({ onNext, onBack, isSubmitting }: LegalConsentFormProps) {
  const form = useForm<z.infer<typeof legalConsentSchema>>({
    resolver: zodResolver(legalConsentSchema),
    defaultValues: {
      termsAccepted: false,
      privacyAccepted: false,
      marketingConsent: false,
    },
  })

  const onSubmit = (data: z.infer<typeof legalConsentSchema>) => {
    onNext(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900">Consentement légal</h2>
        <p className="mt-1 text-navy-500">
          Veuillez lire et accepter nos conditions avant de finaliser votre inscription
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-navy-300 text-lime-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      J'accepte les{" "}
                      <a href="#" className="text-lime-600 hover:underline">
                        conditions générales d'utilisation
                      </a>
                    </FormLabel>
                    <FormDescription className="text-xs">
                      En cochant cette case, vous acceptez nos conditions générales d'utilisation.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      J'accepte la{" "}
                      <a href="#" className="text-emerald-600 hover:underline">
                        politique de confidentialité
                      </a>
                    </FormLabel>
                    <FormDescription className="text-xs">
                      En cochant cette case, vous acceptez notre politique de confidentialité et le traitement de vos
                      données personnelles.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      J'accepte de recevoir des communications marketing
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Nous vous enverrons occasionnellement des emails concernant nos offres et services. Vous pourrez
                      vous désinscrire à tout moment.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                "Finaliser l'inscription"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
