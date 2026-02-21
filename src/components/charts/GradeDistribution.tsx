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
import { gradeDistributionData } from "@/lib/mock-data";

export function GradeDistribution() {
  return (
    <figure aria-label="Distribution des notes : pic entre 14 et 16 avec 15 eleves">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gradeDistributionData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BBF7D0" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 12, fill: "#15803D" }}
              axisLine={{ stroke: "#BBF7D0" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#15803D" }}
              axisLine={{ stroke: "#BBF7D0" }}
            />
            <Tooltip
              formatter={(value: number) => [`${value} eleves`, ""]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #BBF7D0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" fill="#22C55E" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="count"
                position="top"
                style={{ fontSize: "10px", fill: "#052E16" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-xs text-green-700 text-center mt-2">
        Repartition des notes (nombre d{"'"}eleves par tranche)
      </figcaption>
    </figure>
  );
}
