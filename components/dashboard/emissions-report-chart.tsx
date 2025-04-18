"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mai", emissions: 450 },
  { name: "Juin", emissions: 520 },
  { name: "Juil", emissions: 600 },
  { name: "Août", emissions: 480 },
  { name: "Sept", emissions: 580 },
  { name: "Oct", emissions: 550 },
  { name: "Nov", emissions: 500 },
  { name: "Déc", emissions: 480 },
  { name: "Jan", emissions: 420 },
  { name: "Fév", emissions: 460 },
  { name: "Mar", emissions: 510 },
  { name: "Avr", emissions: 490 },
]

export default function EmissionsReportChart() {
  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="emissions" stroke="#84cc16" fill="#84cc16" name="Émissions CO₂ (kg)" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Émissions totales</h3>
          <p className="mt-2 text-2xl font-bold text-navy-900">6,040 kg</p>
          <p className="mt-1 text-xs text-gray-500">de CO₂ sur les 12 derniers mois</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Moyenne mensuelle</h3>
          <p className="mt-2 text-2xl font-bold text-navy-900">503 kg</p>
          <p className="mt-1 text-xs text-gray-500">de CO₂ par mois</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Économie potentielle</h3>
          <p className="mt-2 text-2xl font-bold text-lime-600">-15%</p>
          <p className="mt-1 text-xs text-gray-500">avec plus de véhicules électriques</p>
        </div>
      </div>
    </div>
  )
}
