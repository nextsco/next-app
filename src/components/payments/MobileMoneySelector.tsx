"use client";

import { cn } from "@/lib/utils";
import { Smartphone } from "lucide-react";

interface MobileMoneySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const operators = [
  { id: "WAVE", name: "Wave", color: "bg-blue-500" },
  { id: "ORANGE_MONEY", name: "Orange Money", color: "bg-orange-500" },
  { id: "MTN_MOMO", name: "MTN MoMo", color: "bg-yellow-400" },
];

export function MobileMoneySelector({ value, onChange }: MobileMoneySelectorProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-green-950 mb-2">
        Operateur Mobile Money
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {operators.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => onChange(op.id)}
            aria-pressed={value === op.id}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors min-h-[44px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
              value === op.id
                ? "border-green-700 bg-green-50"
                : "border-green-200 bg-white hover:border-green-500"
            )}
          >
            <div
              className={cn("w-8 h-8 rounded-full flex items-center justify-center", op.color)}
              aria-hidden="true"
            >
              <Smartphone className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium text-green-950">{op.name}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
