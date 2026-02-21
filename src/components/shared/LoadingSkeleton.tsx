"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-4 bg-green-200/50 rounded animate-pulse", className)}
      aria-hidden="true"
    />
  );
}

export function LoadingSkeleton({ className, lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} aria-live="polite" aria-label="Chargement en cours">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} className={i === lines - 1 ? "w-2/3" : "w-full"} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-green-200 p-5 space-y-3" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-3 w-24 bg-green-200/50 rounded animate-pulse" />
          <div className="h-7 w-32 bg-green-200/50 rounded animate-pulse" />
        </div>
        <div className="w-10 h-10 bg-green-200/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl border border-green-200 overflow-hidden" aria-label="Chargement du tableau" aria-live="polite">
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-4 w-8 bg-green-200/50 rounded animate-pulse" />
            <div className="h-4 flex-1 bg-green-200/50 rounded animate-pulse" />
            <div className="h-4 w-24 bg-green-200/50 rounded animate-pulse" />
            <div className="h-4 w-20 bg-green-200/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
