"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Globe,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { registerSchema, type RegisterFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

const countries = [
  { code: "SN", name: "Senegal" },
  { code: "CI", name: "Cote d'Ivoire" },
  { code: "CM", name: "Cameroun" },
  { code: "GN", name: "Guinee" },
  { code: "ML", name: "Mali" },
  { code: "BF", name: "Burkina Faso" },
  { code: "TG", name: "Togo" },
  { code: "BJ", name: "Benin" },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      schoolName: "",
      city: "",
      country: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const goToStep2 = async () => {
    const valid = await trigger([
      "firstName",
      "lastName",
      "email",
      "phone",
    ]);
    if (valid) setStep(2);
  };

  const onSubmit = async (_data: RegisterFormValues) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">
            Inscription reussie !
          </h1>
          <p className="text-green-200 text-sm leading-relaxed">
            Votre compte a ete cree avec succes.
            <br />
            Vous allez etre redirige vers la page de connexion...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="flex items-center gap-2.5 mb-4 group">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <GraduationCap className="h-7 w-7 text-green-950" aria-hidden="true" />
          </div>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-white">
          Creer un compte EduSaaS
        </h1>
        <p className="text-green-200/70 text-sm mt-1">
          Essai gratuit de 30 jours. Aucune carte requise.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
              step >= 1
                ? "bg-green-500 text-green-950"
                : "bg-green-900 text-green-400"
            )}
          >
            1
          </div>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              step >= 1 ? "text-white" : "text-green-400"
            )}
          >
            Informations
          </span>
        </div>
        <div
          className={cn(
            "flex-1 h-0.5 rounded-full transition-colors",
            step >= 2 ? "bg-green-500" : "bg-green-800"
          )}
        />
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              step >= 2 ? "text-white" : "text-green-400/50"
            )}
          >
            Etablissement
          </span>
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
              step >= 2
                ? "bg-green-500 text-green-950"
                : "bg-green-900 text-green-400/50"
            )}
          >
            2
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Step 1: Personal info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-green-950 mb-1.5"
                  >
                    Prenom{" "}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                      aria-hidden="true"
                    />
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                        errors.firstName
                          ? "border-red-400"
                          : "border-green-200"
                      )}
                      placeholder="Fatou"
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <p
                      id="firstName-error"
                      role="alert"
                      className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                    >
                      <AlertCircle
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-green-950 mb-1.5"
                  >
                    Nom{" "}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                      aria-hidden="true"
                    />
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={
                        errors.lastName ? "lastName-error" : undefined
                      }
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                        errors.lastName
                          ? "border-red-400"
                          : "border-green-200"
                      )}
                      placeholder="Ndiaye"
                      {...register("lastName")}
                    />
                  </div>
                  {errors.lastName && (
                    <p
                      id="lastName-error"
                      role="alert"
                      className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                    >
                      <AlertCircle
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-950 mb-1.5"
                >
                  Adresse email{" "}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
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
                  <p
                    id="email-error"
                    role="alert"
                    className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-green-950 mb-1.5"
                >
                  Telephone{" "}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                    aria-hidden="true"
                  />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={
                      errors.phone ? "phone-error" : undefined
                    }
                    className={cn(
                      "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                      errors.phone ? "border-red-400" : "border-green-200"
                    )}
                    placeholder="+221 77 123 45 67"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Next step button */}
              <button
                type="button"
                onClick={goToStep2}
                className="w-full py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors min-h-[44px] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                Suivant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Step 2: School info + password */}
          {step === 2 && (
            <div className="space-y-4">
              {/* School name */}
              <div>
                <label
                  htmlFor="schoolName"
                  className="block text-sm font-medium text-green-950 mb-1.5"
                >
                  Nom de l{"'"}etablissement{" "}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                    aria-hidden="true"
                  />
                  <input
                    id="schoolName"
                    type="text"
                    aria-required="true"
                    aria-invalid={!!errors.schoolName}
                    aria-describedby={
                      errors.schoolName ? "schoolName-error" : undefined
                    }
                    className={cn(
                      "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                      errors.schoolName
                        ? "border-red-400"
                        : "border-green-200"
                    )}
                    placeholder="College Sainte-Marie"
                    {...register("schoolName")}
                  />
                </div>
                {errors.schoolName && (
                  <p
                    id="schoolName-error"
                    role="alert"
                    className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.schoolName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-green-950 mb-1.5"
                  >
                    Ville{" "}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                      aria-hidden="true"
                    />
                    <input
                      id="city"
                      type="text"
                      aria-required="true"
                      aria-invalid={!!errors.city}
                      aria-describedby={
                        errors.city ? "city-error" : undefined
                      }
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                        errors.city ? "border-red-400" : "border-green-200"
                      )}
                      placeholder="Dakar"
                      {...register("city")}
                    />
                  </div>
                  {errors.city && (
                    <p
                      id="city-error"
                      role="alert"
                      className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                    >
                      <AlertCircle
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-green-950 mb-1.5"
                  >
                    Pays{" "}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                      aria-hidden="true"
                    />
                    <select
                      id="country"
                      aria-required="true"
                      aria-invalid={!!errors.country}
                      aria-describedby={
                        errors.country ? "country-error" : undefined
                      }
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 appearance-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                        errors.country
                          ? "border-red-400"
                          : "border-green-200"
                      )}
                      defaultValue=""
                      {...register("country")}
                    >
                      <option value="" disabled>
                        Choisir...
                      </option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <p
                      id="country-error"
                      role="alert"
                      className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                    >
                      <AlertCircle
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-950 mb-1.5"
                >
                  Mot de passe{" "}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={cn(
                      "w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                      errors.password
                        ? "border-red-400"
                        : "border-green-200"
                    )}
                    placeholder="8 caracteres minimum"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-green-200/50 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-green-950 mb-1.5"
                >
                  Confirmer le mot de passe{" "}
                  <span aria-hidden="true" className="text-red-500">
                    *
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700"
                    aria-hidden="true"
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    aria-required="true"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirmPassword-error"
                        : undefined
                    }
                    className={cn(
                      "w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border bg-green-50 text-green-950 placeholder:text-green-700/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-green-200"
                    )}
                    placeholder="Retapez votre mot de passe"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={
                      showConfirm
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-green-200/50 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  >
                    {showConfirm ? (
                      <EyeOff
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    role="alert"
                    className="flex items-center gap-1 mt-1.5 text-xs text-red-600"
                  >
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-green-200 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                >
                  {isSubmitting
                    ? "Inscription en cours..."
                    : "Creer mon compte"}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Separator + login link */}
        <div className="mt-6 pt-6 border-t border-green-100 text-center">
          <p className="text-sm text-green-700">
            Vous avez deja un compte ?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
