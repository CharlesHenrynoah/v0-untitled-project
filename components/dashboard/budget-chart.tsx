"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", budget: 1200, spent: 1000 },
  { name: "Fév", budget: 1200, spent: 1100 },
  { name: "Mar", budget: 1200, spent: 950 },
  { name: "Avr", budget: 1200, spent: 1300 },
  { name: "Mai", budget: 1200, spent: 1100 },
  { name: "Juin", budget: 1200, spent: 1000 },
  { name: "Juil", budget: 1200, spent: 1200 },
  { name: "Août", budget: 1200, spent: 800 },
  { name: "Sep", budget: 1200, spent: 1000 },
  { name: "Oct", budget: 1200, spent: 1200 },
  { name: "Nov", budget: 1200, spent: 0 },
  { name: "Déc", budget: 1200, spent: 0 },
]

export default function BudgetChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
        <Bar dataKey="spent" fill="#84cc16" name="Dépensé" />
      </BarChart>
    </ResponsiveContainer>
  )
}
