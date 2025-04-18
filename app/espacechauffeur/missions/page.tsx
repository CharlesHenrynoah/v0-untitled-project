import { ChauffeurMissionsList } from "@/components/chauffeur/chauffeur-missions-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChauffeurMissionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mes Missions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-lg">Missions à venir</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-lg">Missions en cours</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <CardTitle className="text-lg">Missions terminées</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>

      <ChauffeurMissionsList />
    </div>
  )
}
