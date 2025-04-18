"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données fictives pour les bénéfices des missions
const data = [
  { name: "Jan", profit: 280 },
  { name: "Fév", profit: 320 },
  { name: "Mar", profit: 450 },
  { name: "Avr", profit: 380 },
  { name: "Mai", profit: 520 },
  { name: "Juin", profit: 490 },
  { name: "Juil", profit: 610 },
  { name: "Août", profit: 350 },
  { name: "Sep", profit: 420 },
  { name: "Oct", profit: 480 },
  { name: "Nov", profit: 550 },
  { name: "Déc", profit: 630 },
]

export default function ProfitChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} €`, "Bénéfice"]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#84cc16"
          name="Bénéfice (€)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
