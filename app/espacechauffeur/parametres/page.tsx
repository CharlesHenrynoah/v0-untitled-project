"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/theme-context"
import { Moon, Sun } from "lucide-react"

export default function ChauffeurSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    newMissions: true,
    missionUpdates: true,
    messages: true,
    appUpdates: false,
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-missions">Nouvelles missions</Label>
                <p className="text-sm text-muted-foreground">Recevoir des notifications pour les nouvelles missions</p>
              </div>
              <Switch
                id="new-missions"
                checked={notifications.newMissions}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newMissions: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mission-updates">Mises à jour des missions</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications pour les changements de missions
                </p>
              </div>
              <Switch
                id="mission-updates"
                checked={notifications.missionUpdates}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, missionUpdates: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages">Messages</Label>
                <p className="text-sm text-muted-foreground">Recevoir des notifications pour les nouveaux messages</p>
              </div>
              <Switch
                id="messages"
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, messages: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-updates">Mises à jour de l'application</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications pour les mises à jour de l'application
                </p>
              </div>
              <Switch
                id="app-updates"
                checked={notifications.appUpdates}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, appUpdates: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affichage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme">Thème</Label>
                <p className="text-sm text-muted-foreground">Choisissez entre le mode clair et sombre</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("light")}
                  aria-label="Mode clair"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("dark")}
                  aria-label="Mode sombre"
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location-sharing">Partage de localisation</Label>
                <p className="text-sm text-muted-foreground">
                  Autoriser le partage de votre position pendant les missions
                </p>
              </div>
              <Switch id="location-sharing" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection">Collecte de données</Label>
                <p className="text-sm text-muted-foreground">
                  Autoriser la collecte de données pour améliorer le service
                </p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Modifier le mot de passe
            </Button>
            <Button variant="outline" className="w-full">
              Exporter mes données
            </Button>
            <Button variant="destructive" className="w-full">
              Déconnexion
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
