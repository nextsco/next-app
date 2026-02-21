"use client";

import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4">
        <Inbox className="h-8 w-8 text-green-700" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-display font-semibold text-green-950 mb-1">{title}</h3>
      <p className="text-sm text-green-700 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
