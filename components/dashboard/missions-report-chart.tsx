"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mai", transfert: 12, journee: 3, demiJournee: 5 },
  { name: "Juin", transfert: 15, journee: 4, demiJournee: 6 },
  { name: "Juil", transfert: 18, journee: 5, demiJournee: 8 },
  { name: "Août", transfert: 14, journee: 3, demiJournee: 4 },
  { name: "Sept", transfert: 20, journee: 6, demiJournee: 7 },
  { name: "Oct", transfert: 22, journee: 5, demiJournee: 9 },
  { name: "Nov", transfert: 17, journee: 4, demiJournee: 6 },
  { name: "Déc", transfert: 16, journee: 3, demiJournee: 5 },
  { name: "Jan", transfert: 14, journee: 2, demiJournee: 4 },
  { name: "Fév", transfert: 18, journee: 4, demiJournee: 7 },
  { name: "Mar", transfert: 20, journee: 5, demiJournee: 8 },
  { name: "Avr", transfert: 24, journee: 6, demiJournee: 10 },
]

export default function MissionsReportChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="transfert" name="Transfert" fill="#84cc16" />
        <Bar dataKey="journee" name="Journée" fill="#22c55e" />
        <Bar dataKey="demiJournee" name="Demi-journée" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
