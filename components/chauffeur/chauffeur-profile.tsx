"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Phone, Mail, Building, FileText, Award, Save, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type pour les certifications
type Certification = {
  name: string
  issuer: string
  date: string
}

// Type pour les erreurs de validation
type ValidationErrors = {
  [key: string]: string
}

export function ChauffeurProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  // État pour le formulaire d'ajout de certification
  const [newCertification, setNewCertification] = useState<Certification>({
    name: "",
    issuer: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Données fictives du profil chauffeur
  const [chauffeurData, setChauffeurData] = useState({
    name: "Thomas Dubois",
    avatar: "/placeholder-user.jpg",
    company: "TransportCo",
    companyLogo: "/abstract-geometric-logo.png",
    position: "Chauffeur de car",
    email: "thomas.dubois@example.com",
    phone: "+33 6 12 34 56 78",
    address: "15 Rue des Lilas, 75020 Paris",
    licenseNumber: "B-123456789",
    licenseExpiry: "2025-06-30",
    vtcCardNumber: "VTC-987654321",
    vtcCardExpiry: "2024-12-31",
    experience: "8 ans",
    specializations: ["Transport scolaire", "Excursions touristiques", "Événements sportifs"],
    languages: ["Français", "Anglais", "Espagnol"],
    ratings: 4.8,
    totalTrips: 342,
    totalPassengers: 12850,
    totalDistance: 78500,
    certifications: [
      {
        name: "Formation Sécurité Routière Avancée",
        issuer: "Centre National de la Sécurité Routière",
        date: "2022-03-15",
      },
      {
        name: "Certification Premier Secours",
        issuer: "Croix-Rouge Française",
        date: "2021-11-10",
      },
    ],
  })

  // Fonction de validation des champs
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 3 ? "Le nom doit contenir au moins 3 caractères" : ""
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Format d'email invalide" : ""
      case "phone":
        return !/^(\+33|0)[1-9](\d{2}){4}$/.test(value.replace(/\s/g, ""))
          ? "Format de téléphone invalide (ex: +33 6 12 34 56 78)"
          : ""
      case "licenseExpiry":
      case "vtcCardExpiry":
        const today = new Date()
        const expiryDate = new Date(value)
        return expiryDate <= today ? "La date d'expiration doit être dans le futur" : ""
      case "licenseNumber":
        return value.trim().length < 5 ? "Numéro de permis invalide" : ""
      case "vtcCardNumber":
        return value.trim().length < 5 ? "Numéro de carte VTC invalide" : ""
      case "certName":
        return value.trim().length < 3 ? "Le nom de la certification doit contenir au moins 3 caractères" : ""
      case "certIssuer":
        return value.trim().length < 3 ? "Le nom de l'organisme doit contenir au moins 3 caractères" : ""
      default:
        return ""
    }
  }

  // Gestion des changements dans les champs de texte
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setChauffeurData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Valider le champ
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  // Gestion des changements dans les champs de certification
  const handleCertInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const fieldName = id === "certName" ? "name" : id === "certIssuer" ? "issuer" : "date"

    setNewCertification((prev) => ({
      ...prev,
      [fieldName]: value,
    }))

    // Valider le champ
    const error = validateField(id, value)
    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }))
  }

  // Gestion des changements dans les menus déroulants
  const handleSelectChange = (name: string, value: string) => {
    setChauffeurData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Fonction pour ajouter une nouvelle certification
  const handleAddCertification = () => {
    // Valider les champs
    const nameError = validateField("certName", newCertification.name)
    const issuerError = validateField("certIssuer", newCertification.issuer)

    if (nameError || issuerError) {
      setErrors((prev) => ({
        ...prev,
        certName: nameError,
        certIssuer: issuerError,
      }))
      return
    }

    // Ajouter la certification
    setChauffeurData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }))

    // Réinitialiser le formulaire
    setNewCertification({
      name: "",
      issuer: "",
      date: new Date().toISOString().split("T")[0],
    })

    toast({
      title: "Certification ajoutée",
      description: "La certification a été ajoutée avec succès.",
    })
  }

  // Fonction pour sauvegarder le profil
  const handleSaveProfile = () => {
    // Valider tous les champs
    const newErrors: ValidationErrors = {}

    newErrors.name = validateField("name", chauffeurData.name)
    newErrors.email = validateField("email", chauffeurData.email)
    newErrors.phone = validateField("phone", chauffeurData.phone)
    newErrors.licenseNumber = validateField("licenseNumber", chauffeurData.licenseNumber)
    newErrors.licenseExpiry = validateField("licenseExpiry", chauffeurData.licenseExpiry)
    newErrors.vtcCardNumber = validateField("vtcCardNumber", chauffeurData.vtcCardNumber)
    newErrors.vtcCardExpiry = validateField("vtcCardExpiry", chauffeurData.vtcCardExpiry)

    // Filtrer les erreurs vides
    const filteredErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, value]) => value !== ""))

    setErrors(filteredErrors)

    // S'il y a des erreurs, ne pas sauvegarder
    if (Object.keys(filteredErrors).length > 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant de sauvegarder.",
        variant: "destructive",
      })
      return
    }

    setIsEditing(false)
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={chauffeurData.avatar || "/placeholder.svg"} alt={chauffeurData.name} />
              <AvatarFallback>{chauffeurData.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  {isEditing ? (
                    <div className="mb-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        name="name"
                        value={chauffeurData.name}
                        onChange={handleInputChange}
                        className={`max-w-xs ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold">{chauffeurData.name}</h2>
                  )}
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="font-medium">{chauffeurData.company}</span>
                    <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20">
                      {chauffeurData.position}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-1">
                        <X className="h-4 w-4" /> Annuler
                      </Button>
                      <Button onClick={handleSaveProfile} className="gap-1">
                        <Save className="h-4 w-4" /> Enregistrer
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={chauffeurData.email}
                        onChange={handleInputChange}
                        type="email"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={chauffeurData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" name="address" value={chauffeurData.address} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Expérience</Label>
                      <Select
                        value={chauffeurData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre expérience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 an">1 an</SelectItem>
                          <SelectItem value="2 ans">2 ans</SelectItem>
                          <SelectItem value="3 ans">3 ans</SelectItem>
                          <SelectItem value="5 ans">5 ans</SelectItem>
                          <SelectItem value="8 ans">8 ans</SelectItem>
                          <SelectItem value="10+ ans">10+ ans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{chauffeurData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{chauffeurData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{chauffeurData.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Note: {chauffeurData.ratings}/5 ({chauffeurData.totalTrips} trajets)
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informations professionnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Entreprise</h3>
                  <div className="flex items-center gap-2 p-3 border rounded-md">
                    <img
                      src={chauffeurData.companyLogo || "/placeholder.svg"}
                      alt="Logo entreprise"
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="font-medium">{chauffeurData.company}</p>
                      <p className="text-sm text-muted-foreground">{chauffeurData.position}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Permis de conduire</h3>
                  {isEditing ? (
                    <div className="space-y-2 p-3 border rounded-md">
                      <div className="space-y-1">
                        <Label htmlFor="licenseNumber">Numéro</Label>
                        <Input
                          id="licenseNumber"
                          name="licenseNumber"
                          value={chauffeurData.licenseNumber}
                          onChange={handleInputChange}
                          className={errors.licenseNumber ? "border-red-500" : ""}
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="licenseExpiry">Date d'expiration</Label>
                        <Input
                          id="licenseExpiry"
                          name="licenseExpiry"
                          type="date"
                          value={chauffeurData.licenseExpiry}
                          onChange={handleInputChange}
                          className={errors.licenseExpiry ? "border-red-500" : ""}
                        />
                        {errors.licenseExpiry && <p className="text-red-500 text-xs mt-1">{errors.licenseExpiry}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Numéro</span>
                        <span>{chauffeurData.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">Expiration</span>
                        <span>{new Date(chauffeurData.licenseExpiry).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Carte VTC</h3>
                  {isEditing ? (
                    <div className="space-y-2 p-3 border rounded-md">
                      <div className="space-y-1">
                        <Label htmlFor="vtcCardNumber">Numéro</Label>
                        <Input
                          id="vtcCardNumber"
                          name="vtcCardNumber"
                          value={chauffeurData.vtcCardNumber}
                          onChange={handleInputChange}
                          className={errors.vtcCardNumber ? "border-red-500" : ""}
                        />
                        {errors.vtcCardNumber && <p className="text-red-500 text-xs mt-1">{errors.vtcCardNumber}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="vtcCardExpiry">Date d'expiration</Label>
                        <Input
                          id="vtcCardExpiry"
                          name="vtcCardExpiry"
                          type="date"
                          value={chauffeurData.vtcCardExpiry}
                          onChange={handleInputChange}
                          className={errors.vtcCardExpiry ? "border-red-500" : ""}
                        />
                        {errors.vtcCardExpiry && <p className="text-red-500 text-xs mt-1">{errors.vtcCardExpiry}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Numéro</span>
                        <span>{chauffeurData.vtcCardNumber}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">Expiration</span>
                        <span>{new Date(chauffeurData.vtcCardExpiry).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Expérience</h3>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Années d'expérience</span>
                      <span>{chauffeurData.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Spécialisations</h3>
                {isEditing ? (
                  <div className="p-3 border rounded-md space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Sélectionnez vos spécialisations</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Transport scolaire",
                        "Excursions touristiques",
                        "Événements sportifs",
                        "Transport d'entreprise",
                        "Transferts aéroport",
                      ].map((spec) => (
                        <Badge
                          key={spec}
                          variant={chauffeurData.specializations.includes(spec) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (chauffeurData.specializations.includes(spec)) {
                              setChauffeurData((prev) => ({
                                ...prev,
                                specializations: prev.specializations.filter((s) => s !== spec),
                              }))
                            } else {
                              setChauffeurData((prev) => ({
                                ...prev,
                                specializations: [...prev.specializations, spec],
                              }))
                            }
                          }}
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {chauffeurData.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Langues parlées</h3>
                {isEditing ? (
                  <div className="p-3 border rounded-md space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Sélectionnez les langues que vous parlez</p>
                    <div className="flex flex-wrap gap-2">
                      {["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais"].map((lang) => (
                        <Badge
                          key={lang}
                          variant={chauffeurData.languages.includes(lang) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (chauffeurData.languages.includes(lang)) {
                              setChauffeurData((prev) => ({
                                ...prev,
                                languages: prev.languages.filter((l) => l !== lang),
                              }))
                            } else {
                              setChauffeurData((prev) => ({
                                ...prev,
                                languages: [...prev.languages, lang],
                              }))
                            }
                          }}
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {chauffeurData.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md text-center">
                  <p className="text-3xl font-bold">{chauffeurData.totalTrips}</p>
                  <p className="text-sm text-muted-foreground">Trajets effectués</p>
                </div>
                <div className="p-4 border rounded-md text-center">
                  <p className="text-3xl font-bold">{chauffeurData.totalPassengers}</p>
                  <p className="text-sm text-muted-foreground">Passagers transportés</p>
                </div>
                <div className="p-4 border rounded-md text-center">
                  <p className="text-3xl font-bold">{chauffeurData.totalDistance} km</p>
                  <p className="text-sm text-muted-foreground">Distance parcourue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Certifications et formations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chauffeurData.certifications.map((cert, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{new Date(cert.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className="p-4 border rounded-md border-dashed">
                    <div className="space-y-3">
                      <h3 className="font-medium">Ajouter une certification</h3>
                      <div className="space-y-2">
                        <Label htmlFor="certName">Nom de la certification</Label>
                        <Input
                          id="certName"
                          placeholder="Ex: Formation Sécurité Routière"
                          value={newCertification.name}
                          onChange={handleCertInputChange}
                          className={errors.certName ? "border-red-500" : ""}
                        />
                        {errors.certName && <p className="text-red-500 text-xs mt-1">{errors.certName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certIssuer">Organisme</Label>
                        <Input
                          id="certIssuer"
                          placeholder="Ex: Centre National de la Sécurité Routière"
                          value={newCertification.issuer}
                          onChange={handleCertInputChange}
                          className={errors.certIssuer ? "border-red-500" : ""}
                        />
                        {errors.certIssuer && <p className="text-red-500 text-xs mt-1">{errors.certIssuer}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certDate">Date d'obtention</Label>
                        <Input
                          id="certDate"
                          type="date"
                          value={newCertification.date}
                          onChange={handleCertInputChange}
                        />
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleAddCertification}>
                        Ajouter
                      </Button>
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Ajouter une certification
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
