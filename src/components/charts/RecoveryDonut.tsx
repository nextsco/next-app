"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { recoveryData } from "@/lib/mock-data";

export function RecoveryDonut() {
  return (
    <figure aria-label="Taux de recouvrement : 68% recouvre, 22% en attente, 10% impaye">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={recoveryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {recoveryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #BBF7D0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-xs text-green-700 text-center mt-2">
        Repartition du recouvrement des frais de scolarite
      </figcaption>
    </figure>
  );
}
