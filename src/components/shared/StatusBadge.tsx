"use client";

import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "error" | "warning" | "pending" | "info";

const variants: Record<BadgeVariant, { bg: string; text: string; icon: typeof CheckCircle }> = {
  success: { bg: "bg-green-200", text: "text-green-950", icon: CheckCircle },
  error: { bg: "bg-red-50", text: "text-red-800", icon: XCircle },
  warning: { bg: "bg-amber-50", text: "text-amber-800", icon: AlertTriangle },
  pending: { bg: "bg-amber-50", text: "text-amber-800", icon: Clock },
  info: { bg: "bg-green-50", text: "text-green-900", icon: CheckCircle },
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
}

export function StatusBadge({ variant, label }: StatusBadgeProps) {
  const { bg, text, icon: Icon } = variants[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        bg,
        text
      )}
    >
      <Icon size={12} aria-hidden="true" />
      {label}
    </span>
  );
}
