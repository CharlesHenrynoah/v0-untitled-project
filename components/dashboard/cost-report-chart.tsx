"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Transferts", value: 45 },
  { name: "Journées", value: 30 },
  { name: "Demi-journées", value: 25 },
]

const COLORS = ["#84cc16", "#22c55e", "#3b82f6"]

export default function CostReportChart() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-center text-sm font-medium">Répartition des dépenses par type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="mb-4 text-center text-sm font-medium">Coût moyen par type de mission</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Transfert</span>
              <span className="font-semibold text-lime-600">120 €</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-lime-500" style={{ width: "40%" }}></div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Journée</span>
              <span className="font-semibold text-lime-600">450 €</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Demi-journée</span>
              <span className="font-semibold text-lime-600">220 €</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
