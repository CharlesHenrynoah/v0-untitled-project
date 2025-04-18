"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mai", satisfaction: 4.5 },
  { name: "Juin", satisfaction: 4.6 },
  { name: "Juil", satisfaction: 4.7 },
  { name: "Août", satisfaction: 4.6 },
  { name: "Sept", satisfaction: 4.8 },
  { name: "Oct", satisfaction: 4.9 },
  { name: "Nov", satisfaction: 4.7 },
  { name: "Déc", satisfaction: 4.8 },
  { name: "Jan", satisfaction: 4.7 },
  { name: "Fév", satisfaction: 4.8 },
  { name: "Mar", satisfaction: 4.9 },
  { name: "Avr", satisfaction: 4.8 },
]

export default function SatisfactionReportChart() {
  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[4, 5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="satisfaction" stroke="#84cc16" name="Satisfaction client (sur 5)" />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Commentaires récents</h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">15/04/2023</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-current text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm">
                "Chauffeur très professionnel et ponctuel. Véhicule impeccable. Je recommande vivement."
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">22/04/2023</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-current text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm">
                "Service excellent, chauffeur courtois et trajet agréable. Parfait pour nos déplacements
                professionnels."
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Points forts</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Ponctualité</span>
              <div className="w-2/3">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-lime-500" style={{ width: "98%" }}></div>
                </div>
              </div>
              <span className="text-sm font-medium">4.9</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Propreté</span>
              <div className="w-2/3">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-lime-500" style={{ width: "96%" }}></div>
                </div>
              </div>
              <span className="text-sm font-medium">4.8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Conduite</span>
              <div className="w-2/3">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-lime-500" style={{ width: "90%" }}></div>
                </div>
              </div>
              <span className="text-sm font-medium">4.8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Communication</span>
              <div className="w-2/3">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-lime-500" style={{ width: "85%" }}></div>
                </div>
              </div>
              <span className="text-sm font-medium">4.7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
