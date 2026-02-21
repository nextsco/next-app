"use client";

import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  TrendingDown,
  CreditCard,
  GraduationCap,
  BarChart3,
  School,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  TrendingDown,
  CreditCard,
  GraduationCap,
  BarChart3,
  School,
};

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  change?: number;
  changeLabel?: string;
  ariaLabel?: string;
}

export function StatCard({ label, value, icon, change, changeLabel, ariaLabel }: StatCardProps) {
  const Icon = iconMap[icon] || BarChart3;

  return (
    <div
      className="bg-white rounded-xl border border-green-200 p-5"
      aria-label={ariaLabel || `${label} : ${value}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-green-700">{label}</p>
          <p className="text-2xl font-display font-bold text-green-950 mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-green-700" aria-hidden="true" />
        </div>
      </div>
      {change !== undefined && changeLabel && (
        <div className="flex items-center gap-1.5 mt-3">
          {change >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-700" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" aria-hidden="true" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              change >= 0 ? "text-green-700" : "text-red-600"
            )}
          >
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-green-700/60">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}
