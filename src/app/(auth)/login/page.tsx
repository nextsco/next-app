"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { useAuthStore } from "@/stores/authStore";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const demoAccounts: { role: UserRole; email: string; label: string }[] = [
  { role: "SCHOOL_ADMIN", email: "fatou.ndiaye@edusaas.sn", label: "Directeur" },
  { role: "ACCOUNTANT", email: "amadou.diallo@edusaas.sn", label: "Comptable" },
  { role: "TEACHER", email: "marie.faye@edusaas.sn", label: "Enseignant" },
  { role: "PARENT", email: "ousmane.camara@edusaas.sn", label: "Parent" },
  { role: "SUPER_ADMIN", email: "ibrahima.sow@edusaas.sn", label: "Super Admin" },
];

const roleRedirects: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  SCHOOL_ADMIN: "/admin",
  ACCOUNTANT: "/accountant",
  TEACHER: "/teacher",
  PARENT: "/parent",
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = mockUsers.find((u) => u.email === data.email);
    if (!user) {
      setServerError("Identifiants incorrects. Verifiez votre email et mot de passe.");
      return;
    }

    login(user);
    router.push(roleRedirects[user.role]);
  };

  const handleDemoLogin = async (email: string) => {
    setDemoLoading(email);
    setServerError(null);

    // Simulate a small delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 400));

    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      setServerError("Compte de demo introuvable.");
      setDemoLoading(null);
      return;
    }

    login(user);
    router.push(roleRedirects[user.role]);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="flex items-center gap-2.5 mb-4 group">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <GraduationCap className="h-7 w-7 text-green-950" aria-hidden="true" />
          </div>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white">
          Connexion a EduSaaS
        </h1>
        <p className="text-green-200/70 text-sm mt-1">
          Gerez votre etablissement en toute simplicite
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Server error */}
          {serverError && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-2 p-3 mb-4 bg-red-50 border border-red-300 rounded-lg"
            >
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-800">{serverError}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-green-950 mb-1.5">
              Adresse email <span aria-hidden="true" className="text-red-500">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700" aria-hidden="true" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(
                  "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                  errors.email ? "border-red-400" : "border-green-200"
                )}
                placeholder="votre@email.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p id="email-error" role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-green-950 mb-1.5">
              Mot de passe <span aria-hidden="true" className="text-red-500">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={cn(
                  "w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                  errors.password ? "border-red-400" : "border-green-200"
                )}
                placeholder="Votre mot de passe"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-green-200/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-green-700" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4 text-green-700" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" role="alert" aria-live="assertive" className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        {/* Demo accounts - now directly log in */}
        <div className="mt-6 pt-6 border-t border-green-100">
          <p className="text-xs font-medium text-green-700 mb-3 text-center">
            Comptes de demonstration
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => handleDemoLogin(acc.email)}
                disabled={demoLoading !== null}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors min-h-[44px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                  demoLoading === acc.email
                    ? "bg-green-700 text-white border-green-700"
                    : "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-500",
                  demoLoading !== null && demoLoading !== acc.email
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                )}
              >
                {demoLoading === acc.email ? "Connexion..." : acc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Register link */}
        <div className="mt-5 pt-5 border-t border-green-100 text-center">
          <p className="text-sm text-green-700">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
            >
              S{"'"}inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
