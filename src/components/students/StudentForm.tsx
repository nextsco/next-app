"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormValues } from "@/lib/validations";
import { mockClasses } from "@/lib/mock-data";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";
import { getFocusableElements } from "@/lib/a11y";

interface StudentFormProps {
  onClose: () => void;
}

export function StudentForm({ onClose }: StudentFormProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Student created:", data);
    onClose();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const renderField = (
    id: string,
    label: string,
    error: string | undefined,
    children: React.ReactNode
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-green-950 mb-1.5">
        {label} <span aria-hidden="true" className="text-red-500">*</span>
        <span className="sr-only">(obligatoire)</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );

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
        aria-labelledby="student-form-title"
        className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="student-form-title" className="text-lg font-display font-semibold text-green-950">
            Nouvel eleve
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField("firstName", "Prenom", errors.firstName?.message, (
              <input
                id="firstName"
                type="text"
                aria-required="true"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={inputClasses(!!errors.firstName)}
                placeholder="Fatou"
                {...register("firstName")}
              />
            ))}
            {renderField("lastName", "Nom", errors.lastName?.message, (
              <input
                id="lastName"
                type="text"
                aria-required="true"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={inputClasses(!!errors.lastName)}
                placeholder="Camara"
                {...register("lastName")}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField("gender", "Genre", errors.gender?.message, (
              <select
                id="gender"
                aria-required="true"
                aria-invalid={!!errors.gender}
                aria-describedby={errors.gender ? "gender-error" : undefined}
                className={inputClasses(!!errors.gender)}
                {...register("gender")}
              >
                <option value="">Selectionner</option>
                <option value="MALE">Garcon</option>
                <option value="FEMALE">Fille</option>
              </select>
            ))}
            {renderField("dateOfBirth", "Date de naissance", errors.dateOfBirth?.message, (
              <input
                id="dateOfBirth"
                type="date"
                aria-required="true"
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
                className={inputClasses(!!errors.dateOfBirth)}
                {...register("dateOfBirth")}
              />
            ))}
          </div>

          {renderField("classId", "Classe", errors.classId?.message, (
            <select
              id="classId"
              aria-required="true"
              aria-invalid={!!errors.classId}
              aria-describedby={errors.classId ? "classId-error" : undefined}
              className={inputClasses(!!errors.classId)}
              {...register("classId")}
            >
              <option value="">Selectionner une classe</option>
              {mockClasses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField("parentName", "Nom du parent", errors.parentName?.message, (
              <input
                id="parentName"
                type="text"
                aria-required="true"
                aria-invalid={!!errors.parentName}
                aria-describedby={errors.parentName ? "parentName-error" : undefined}
                className={inputClasses(!!errors.parentName)}
                placeholder="Ousmane Camara"
                {...register("parentName")}
              />
            ))}
            {renderField("parentPhone", "Telephone du parent", errors.parentPhone?.message, (
              <input
                id="parentPhone"
                type="tel"
                aria-required="true"
                aria-invalid={!!errors.parentPhone}
                aria-describedby={errors.parentPhone ? "parentPhone-error" : undefined}
                className={inputClasses(!!errors.parentPhone)}
                placeholder="+221 77 123 45 67"
                {...register("parentPhone")}
              />
            ))}
          </div>

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
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
