"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Languages } from "lucide-react"

export default function ClientSettings() {
  const { theme, setTheme } = useTheme()

  // État initial des paramètres
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    reservationUpdates: true,
    promotions: false,
    serviceChanges: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareContactInfo: true,
    allowAnalytics: true,
  })

  const [languagePreference, setLanguagePreference] = useState("Français")

  // Gestionnaires d'événements
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    })
  }

  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <Button>Enregistrer les modifications</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Thème</Label>
                  <p className="text-sm text-gray-500">Choisissez entre le mode clair et sombre</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-gray-500" />
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  />
                  <Moon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Langue</Label>
                  <p className="text-sm text-gray-500">Sélectionnez votre langue préférée</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">{languagePreference}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Gérez vos préférences de notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email</Label>
                  <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                </div>
                <Switch
                  checked={notificationSettings.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS</Label>
                  <p className="text-sm text-gray-500">Recevoir des notifications par SMS</p>
                </div>
                <Switch checked={notificationSettings.sms} onCheckedChange={() => handleNotificationChange("sms")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications push</Label>
                  <p className="text-sm text-gray-500">Recevoir des notifications push</p>
                </div>
                <Switch checked={notificationSettings.push} onCheckedChange={() => handleNotificationChange("push")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mises à jour des réservations</Label>
                  <p className="text-sm text-gray-500">Notifications pour les changements de réservation</p>
                </div>
                <Switch
                  checked={notificationSettings.reservationUpdates}
                  onCheckedChange={() => handleNotificationChange("reservationUpdates")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Promotions</Label>
                  <p className="text-sm text-gray-500">Recevoir des offres et promotions</p>
                </div>
                <Switch
                  checked={notificationSettings.promotions}
                  onCheckedChange={() => handleNotificationChange("promotions")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Confidentialité</CardTitle>
            <CardDescription>Gérez vos paramètres de confidentialité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Partage de localisation</Label>
                  <p className="text-sm text-gray-500">Autoriser le partage de votre position avec le chauffeur</p>
                </div>
                <Switch
                  checked={privacySettings.shareLocation}
                  onCheckedChange={() => handlePrivacyChange("shareLocation")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Partage des coordonnées</Label>
                  <p className="text-sm text-gray-500">Autoriser le partage de vos coordonnées avec le chauffeur</p>
                </div>
                <Switch
                  checked={privacySettings.shareContactInfo}
                  onCheckedChange={() => handlePrivacyChange("shareContactInfo")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Analyse des données</Label>
                  <p className="text-sm text-gray-500">Autoriser l'analyse de vos données pour améliorer le service</p>
                </div>
                <Switch
                  checked={privacySettings.allowAnalytics}
                  onCheckedChange={() => handlePrivacyChange("allowAnalytics")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
