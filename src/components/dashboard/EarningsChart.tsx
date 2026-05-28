"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Dec", value: 18000 },
  { month: "Jan", value: 22000 },
  { month: "Feb", value: 20500 },
  { month: "Mar", value: 26000 },
  { month: "Apr", value: 24400 },
  { month: "May", value: 28600 }
];

export function EarningsChart() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="value" fill="#FF6B00" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
