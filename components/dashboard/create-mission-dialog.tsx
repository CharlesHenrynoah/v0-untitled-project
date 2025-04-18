"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const formSchema = z.object({
  type: z.string({
    required_error: "Veuillez sélectionner un type de mission",
  }),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  time: z.string().min(1, "Veuillez indiquer l'heure"),
  pickupAddress: z.string().min(3, "L'adresse de départ est requise"),
  dropoffAddress: z.string().min(3, "L'adresse d'arrivée est requise"),
  passengers: z.string().min(1, "Veuillez indiquer le nombre de passagers"),
  fleetId: z.string().optional(),
  specialRequirements: z.string().optional(),
})

type MissionFormValues = z.infer<typeof formSchema>

export default function CreateMissionDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<MissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      date: undefined,
      time: "",
      pickupAddress: "",
      dropoffAddress: "",
      passengers: "1",
      fleetId: "",
      specialRequirements: "",
    },
  })

  function onSubmit(values: MissionFormValues) {
    console.log(values)
    // Ici, vous enverriez les données au serveur
    alert("Mission créée avec succès !")
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Créer une mission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle mission</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour planifier une nouvelle mission de transport.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Type de mission</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="transfert">Transfert simple</SelectItem>
                        <SelectItem value="aller-retour">Aller-retour</SelectItem>
                        <SelectItem value="demi-journee">Demi-journée (4h)</SelectItem>
                        <SelectItem value="journee">Journée complète (8h)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Heure</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input {...field} placeholder="Ex: 14:30" />
                      </FormControl>
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Nombre de passagers</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "passager" : "passagers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse de départ</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input {...field} placeholder="Ex: 102 Avenue des Algorithmes, 69007 Lyon" />
                      </FormControl>
                      <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dropoffAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse d'arrivée</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input {...field} placeholder="Ex: Aéroport Lyon Saint-Exupéry, 69125 Colombier-Saugnieu" />
                      </FormControl>
                      <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="fleetId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Flotte (optionnel)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une flotte" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="F-001">Transferts VIP</SelectItem>
                        <SelectItem value="F-002">Voyages scolaires</SelectItem>
                        <SelectItem value="F-003">Événements d'entreprise</SelectItem>
                        <SelectItem value="F-004">Navettes aéroport</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Laissez vide pour choisir parmi tous les chauffeurs disponibles</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Exigences particulières (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ex: Besoin d'un siège enfant, bagages volumineux, etc."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium">
                Créer la mission
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
