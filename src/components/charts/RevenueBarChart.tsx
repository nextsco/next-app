"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import { monthlyRevenueData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function RevenueBarChart() {
  return (
    <figure aria-label="Revenus mensuels de septembre a fevrier, avec un pic en octobre a 6 800 000 F CFA">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRevenueData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BBF7D0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#15803D" }}
              axisLine={{ stroke: "#BBF7D0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#15803D" }}
              axisLine={{ stroke: "#BBF7D0" }}
              tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Montant"]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #BBF7D0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="montant" fill="#15803D" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="montant"
                position="top"
                formatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                style={{ fontSize: "10px", fill: "#052E16" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-xs text-green-700 text-center mt-2">
        Evolution des revenus mensuels (en F CFA)
      </figcaption>
    </figure>
  );
}
