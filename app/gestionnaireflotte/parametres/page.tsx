"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, Lock, Shield, Moon, Sun } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/contexts/theme-context"

export default function ParametresPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)

  // États pour les différents paramètres
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    nouveauxMessages: true,
    missionChangements: true,
    rappels: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showReadReceipts: true,
    shareAnalytics: true,
  })

  // Fonction pour simuler la sauvegarde des paramètres
  const handleSave = () => {
    setIsSaving(true)

    // Simuler une requête API
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Paramètres enregistrés",
        description: "Vos préférences ont été mises à jour avec succès.",
      })
    }, 1000)
  }

  // Fonction pour changer le thème avec notification
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)

    toast({
      title: "Thème mis à jour",
      description: `Le thème a été changé en mode ${
        newTheme === "light" ? "clair" : newTheme === "dark" ? "sombre" : "système"
      }.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">Paramètres</h2>
        <Button
          onClick={handleSave}
          className="bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="compte" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="compte">Compte</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="affichage">Affichage</TabsTrigger>
          <TabsTrigger value="confidentialite">Confidentialité</TabsTrigger>
        </TabsList>

        {/* Paramètres du compte */}
        <TabsContent value="compte">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Mettez à jour vos informations de contact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input id="email" defaultValue="m.lefevre@neotraavel.fr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="06 12 34 56 78" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>Gérez votre mot de passe et la sécurité du compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full mt-2 bg-lime-500 hover:bg-lime-600 text-navy-900 font-medium">
                  <Lock className="mr-2 h-4 w-4" />
                  Mettre à jour le mot de passe
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Paramètres de notification */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>Configurez comment et quand vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canaux de notification</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">Recevez des notifications par email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                    <p className="text-sm text-muted-foreground">Recevez des notifications par SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, sms: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Notifications push</Label>
                    <p className="text-sm text-muted-foreground">Recevez des notifications push sur votre appareil</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, push: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Types de notification</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="message-notifications">Nouveaux messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Soyez notifié lorsque vous recevez un nouveau message
                    </p>
                  </div>
                  <Switch
                    id="message-notifications"
                    checked={notificationSettings.nouveauxMessages}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, nouveauxMessages: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mission-notifications">Changements de mission</Label>
                    <p className="text-sm text-muted-foreground">Soyez notifié des modifications des missions</p>
                  </div>
                  <Switch
                    id="mission-notifications"
                    checked={notificationSettings.missionChangements}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, missionChangements: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminder-notifications">Rappels</Label>
                    <p className="text-sm text-muted-foreground">Recevez des rappels pour les missions à venir</p>
                  </div>
                  <Switch
                    id="reminder-notifications"
                    checked={notificationSettings.rappels}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, rappels: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres d'affichage */}
        <TabsContent value="affichage">
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'affichage</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-select">Thème</Label>
                  <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger id="theme-select">
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="mr-2 h-4 w-4" />
                          <span>Clair</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="mr-2 h-4 w-4" />
                          <span>Sombre</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de confidentialité */}
        <TabsContent value="confidentialite">
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité</CardTitle>
              <CardDescription>Gérez vos paramètres de confidentialité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="online-status">Afficher mon statut en ligne</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux autres utilisateurs de voir quand vous êtes en ligne
                    </p>
                  </div>
                  <Switch
                    id="online-status"
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showOnlineStatus: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="read-receipts">Accusés de lecture</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux autres utilisateurs de voir quand vous avez lu leurs messages
                    </p>
                  </div>
                  <Switch
                    id="read-receipts"
                    checked={privacySettings.showReadReceipts}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showReadReceipts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Partager des données d'utilisation anonymes</Label>
                    <p className="text-sm text-muted-foreground">
                      Nous aider à améliorer l'application en partageant des données d'utilisation anonymes
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={privacySettings.shareAnalytics}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, shareAnalytics: checked })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Shield className="mr-2 h-4 w-4" />
                  Télécharger mes données personnelles
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
