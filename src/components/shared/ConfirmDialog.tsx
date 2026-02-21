"use client";

import { useEffect, useRef, useCallback } from "react";
import { AlertTriangle, X } from "lucide-react";
import { getFocusableElements } from "@/lib/a11y";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onCancel]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      confirmRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-green-950/40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <button
          onClick={onCancel}
          aria-label="Fermer"
          className="absolute top-4 right-4 p-1 rounded hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4 text-green-700" aria-hidden="true" />
        </button>

        <div className="flex gap-4">
          {variant === "danger" && (
            <div className="shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
            </div>
          )}
          <div>
            <h3 id="confirm-dialog-title" className="text-lg font-display font-semibold text-green-950">
              {title}
            </h3>
            <p id="confirm-dialog-desc" className="text-sm text-green-700 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-green-950 bg-white border border-green-200 hover:bg-green-50 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
                : "bg-green-700 hover:bg-green-900 focus-visible:ring-green-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
