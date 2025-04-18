"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "5 étoiles", value: 65 },
  { name: "4 étoiles", value: 25 },
  { name: "3 étoiles", value: 8 },
  { name: "2 étoiles", value: 2 },
  { name: "1 étoile", value: 0 },
]

const COLORS = ["#84cc16", "#a3e635", "#d9f99d", "#fef08a", "#fecaca"]

export default function RatingsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
