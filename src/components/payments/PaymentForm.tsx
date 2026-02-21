"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentFormValues } from "@/lib/validations";
import { mockStudents } from "@/lib/mock-data";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";
import { getFocusableElements } from "@/lib/a11y";
import { MobileMoneySelector } from "./MobileMoneySelector";

interface PaymentFormProps {
  onClose: () => void;
}

export function PaymentForm({ onClose }: PaymentFormProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: "MOBILE_MONEY", operator: "WAVE" },
  });

  const method = watch("method");

  const onSubmit = async (data: PaymentFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Payment created:", data);
    onClose();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [handleKeyDown]);

  const inputClasses = (hasError: boolean) =>
    cn(
      "w-full px-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/70",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
      hasError ? "border-red-400" : "border-green-200"
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-green-950/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-form-title"
        className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="payment-form-title" className="text-lg font-display font-semibold text-green-950">
            Nouveau paiement
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Fermer"
            className="p-1 rounded hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <X className="h-5 w-5 text-green-700" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Student */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-green-950 mb-1.5">
              Eleve <span aria-hidden="true" className="text-red-500">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <select
              id="studentId"
              aria-required="true"
              aria-invalid={!!errors.studentId}
              aria-describedby={errors.studentId ? "studentId-error" : undefined}
              className={inputClasses(!!errors.studentId)}
              {...register("studentId")}
            >
              <option value="">Selectionner un eleve</option>
              {mockStudents.map((s) => (
                <option key={s.id} value={s.id}>{s.lastName} {s.firstName} - {s.className}</option>
              ))}
            </select>
            {errors.studentId && (
              <p id="studentId-error" role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.studentId.message}
              </p>
            )}
          </div>

          {/* Installment + Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="installmentName" className="block text-sm font-medium text-green-950 mb-1.5">
                Tranche <span aria-hidden="true" className="text-red-500">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <select
                id="installmentName"
                aria-required="true"
                className={inputClasses(!!errors.installmentName)}
                {...register("installmentName")}
              >
                <option value="">Selectionner</option>
                <option value="1ere tranche">1ere tranche</option>
                <option value="2eme tranche">2eme tranche</option>
                <option value="3eme tranche">3eme tranche</option>
              </select>
              {errors.installmentName && (
                <p id="installmentName-error" role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.installmentName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-green-950 mb-1.5">
                Montant (FCFA) <span aria-hidden="true" className="text-red-500">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <input
                id="amount"
                type="number"
                aria-required="true"
                className={inputClasses(!!errors.amount)}
                placeholder="85000"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p id="amount-error" role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-green-950 mb-1.5">
              Mode de paiement <span aria-hidden="true" className="text-red-500">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <select
              id="method"
              aria-required="true"
              className={inputClasses(!!errors.method)}
              {...register("method")}
            >
              <option value="MOBILE_MONEY">Mobile Money</option>
              <option value="CASH">Especes</option>
              <option value="BANK_TRANSFER">Virement bancaire</option>
              <option value="CHECK">Cheque</option>
            </select>
          </div>

          {/* Mobile Money Operator */}
          {method === "MOBILE_MONEY" && (
            <Controller
              name="operator"
              control={control}
              render={({ field }) => (
                <MobileMoneySelector
                  value={field.value ?? "WAVE"}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-green-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-green-950 bg-white border border-green-200 hover:bg-green-50 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer le paiement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
