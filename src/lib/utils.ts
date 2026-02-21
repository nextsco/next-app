import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyAria(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount)} francs CFA`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "EEEE d MMMM yyyy", { locale: fr });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "d MMM yyyy", { locale: fr });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "d MMM yyyy 'à' HH:mm", { locale: fr });
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getGradeColor(score: number, maxScore: number = 20): {
  bg: string;
  text: string;
  icon: string;
} {
  const normalized = (score / maxScore) * 20;
  if (normalized >= 16) return { bg: "bg-green-200", text: "text-green-950", icon: "TrendingUp" };
  if (normalized >= 14) return { bg: "bg-green-100", text: "text-green-800", icon: "Minus" };
  if (normalized >= 10) return { bg: "bg-amber-50", text: "text-amber-800", icon: "TrendingDown" };
  return { bg: "bg-red-50", text: "text-red-800", icon: "AlertTriangle" };
}
