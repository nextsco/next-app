"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Users,
  CreditCard,
  BarChart3,
  MessageSquare,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  BookOpen,
  TrendingUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Users,
    title: "Gestion des eleves",
    description:
      "Inscriptions, fiches, classes et suivi complet de chaque eleve en quelques clics.",
  },
  {
    icon: BarChart3,
    title: "Notes et bulletins",
    description:
      "Saisie des notes, calcul automatique des moyennes et generation de bulletins.",
  },
  {
    icon: CreditCard,
    title: "Paiements integres",
    description:
      "Wave, Orange Money, MTN MoMo. Suivi en temps reel des recouvrements.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Messagerie integree entre enseignants, parents et administration.",
  },
  {
    icon: Shield,
    title: "Multi-roles",
    description:
      "Directeur, comptable, enseignant, parent : chacun son tableau de bord dedie.",
  },
  {
    icon: GraduationCap,
    title: "Concu pour l'Afrique",
    description:
      "En francais, en FCFA, adapte aux realites des ecoles subsahariennes.",
  },
];

const testimonials = [
  {
    quote:
      "EduSaaS a transforme notre gestion. Les parents paient a temps via Wave et nous gagnons 10h par semaine.",
    name: "Soeur Catherine Mbaye",
    role: "Directrice, College Sainte-Marie",
    location: "Dakar, Senegal",
  },
  {
    quote:
      "Fini les cahiers de notes ! Je saisis tout en ligne et les parents voient les resultats instantanement.",
    name: "Jean-Pierre Diatta",
    role: "Enseignant de Mathematiques",
    location: "Abidjan, Cote d'Ivoire",
  },
  {
    quote:
      "Le suivi des paiements par tranche est exactement ce dont nous avions besoin. Plus d'impayes oublies.",
    name: "Amadou Traore",
    role: "Comptable, Institut Al-Azhar",
    location: "Thies, Senegal",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  const schools = useCounter(150, 2000);
  const students = useCounter(25000, 2500);
  const countries = useCounter(8, 1500);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ---- HEADER ---- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-green-950/95 backdrop-blur-sm border-b border-green-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5 text-green-950" aria-hidden="true" />
            </div>
            <span className="text-xl font-serif font-bold text-white">
              EduSaaS
            </span>
          </Link>
          <nav aria-label="Navigation principale" className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-green-200 hover:text-white transition-colors px-4 py-2"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-green-500 text-green-950 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-200 transition-all hover:shadow-lg hover:shadow-green-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
            >
              Commencer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* ---- HERO ---- */}
        <section className="relative bg-green-950 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          {/* Glow effect */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left column - Copy */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-green-900/60 border border-green-700/40 rounded-full px-4 py-1.5 mb-6">
                  <Globe className="h-3.5 w-3.5 text-green-400" aria-hidden="true" />
                  <span className="text-xs font-medium text-green-300">
                    Utilise dans 8 pays d{"'"}Afrique francophone
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] text-balance mb-6">
                  La gestion scolaire{" "}
                  <span className="relative">
                    <span className="relative z-10 text-green-400">
                      simplifiee
                    </span>
                  </span>{" "}
                  pour l{"'"}Afrique
                </h1>

                <p className="text-lg lg:text-xl text-green-200/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 text-pretty">
                  Eleves, notes, paiements Mobile Money et communication
                  parents-enseignants. Tout sur une seule plateforme, en
                  francais, en FCFA.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2.5 bg-green-500 text-green-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-200 transition-all hover:shadow-xl hover:shadow-green-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
                  >
                    Essai gratuit de 30 jours
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-green-200 font-medium hover:text-white transition-colors px-4 py-4"
                  >
                    Se connecter
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-green-300/70">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                    Aucune carte requise
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                    Configuration en 5 min
                  </span>
                </div>
              </div>

              {/* Right column - Dashboard preview card */}
              <div className="flex-1 w-full max-w-lg lg:max-w-none">
                <div className="relative">
                  {/* Main dashboard card */}
                  <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div className="w-3 h-3 rounded-full bg-green-700/50" />
                      <div className="w-3 h-3 rounded-full bg-green-900/50" />
                      <span className="ml-auto text-xs text-green-400/60 font-medium">
                        Tableau de bord
                      </span>
                    </div>

                    {/* Stat cards row */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: "Eleves", value: "342", icon: Users },
                        { label: "Recouvrement", value: "68%", icon: TrendingUp },
                        { label: "Enseignants", value: "24", icon: BookOpen },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-3"
                        >
                          <s.icon
                            className="h-4 w-4 text-green-400 mb-2"
                            aria-hidden="true"
                          />
                          <p className="text-lg font-bold text-white">{s.value}</p>
                          <p className="text-xs text-green-300/60">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Fake chart bars */}
                    <div className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                      <p className="text-xs text-green-300/60 mb-3 font-medium">
                        Recouvrements mensuels (FCFA)
                      </p>
                      <div className="flex items-end gap-2 h-20">
                        {[40, 65, 35, 20, 52, 46].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-green-500/30 rounded-t-md relative overflow-hidden"
                            style={{ height: `${h}%` }}
                          >
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-md"
                              style={{ height: `${Math.min(h + 20, 100)}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {["Sep", "Oct", "Nov", "Dec", "Jan", "Fev"].map((m) => (
                          <span key={m} className="flex-1 text-center text-[10px] text-green-400/40">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating notification card */}
                  <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-xl p-3 shadow-xl border border-green-100 flex items-center gap-3 animate-pulse-slow max-w-[220px]">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                      <CreditCard className="h-4 w-4 text-green-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-950">
                        Paiement recu
                      </p>
                      <p className="text-[10px] text-green-700">
                        85 000 F via Wave
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- SOCIAL PROOF STRIP ---- */}
        <section className="bg-green-900 border-y border-green-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div ref={schools.ref}>
                <p className="text-4xl lg:text-5xl font-serif font-bold text-white">
                  {schools.count}+
                </p>
                <p className="text-green-300/70 mt-1 text-sm">Ecoles inscrites</p>
              </div>
              <div ref={students.ref}>
                <p className="text-4xl lg:text-5xl font-serif font-bold text-white">
                  {students.count.toLocaleString("fr-FR")}+
                </p>
                <p className="text-green-300/70 mt-1 text-sm">Eleves geres</p>
              </div>
              <div ref={countries.ref}>
                <p className="text-4xl lg:text-5xl font-serif font-bold text-white">
                  {countries.count}
                </p>
                <p className="text-green-300/70 mt-1 text-sm">
                  Pays en Afrique francophone
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- FEATURES ---- */}
        <section
          className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background"
          aria-labelledby="features-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-green-600 tracking-wide uppercase mb-3">
                Fonctionnalites
              </p>
              <h2
                id="features-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-green-950 text-balance mb-4"
              >
                Tout ce dont votre ecole a besoin
              </h2>
              <p className="text-green-700 text-lg leading-relaxed text-pretty">
                Une solution complete, pensee pour les ecoles d{"'"}Afrique
                francophone subsaharienne.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-green-500/40 transition-all hover:shadow-lg hover:shadow-green-500/5"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-500 group-hover:scale-110 transition-all">
                    <feature.icon
                      className="h-6 w-6 text-green-700 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-green-950 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section
          className="py-20 lg:py-28 bg-green-950"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-green-400 tracking-wide uppercase mb-3">
                Temoignages
              </p>
              <h2
                id="testimonials-heading"
                className="text-3xl md:text-4xl font-serif font-bold text-white text-balance"
              >
                Ils nous font confiance
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white/[0.06] backdrop-blur border border-white/[0.08] rounded-2xl p-6 lg:p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 text-green-400 fill-green-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-green-100 leading-relaxed mb-6 text-pretty">
                    {`"${t.quote}"`}
                  </blockquote>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-green-300/60 mt-0.5">
                      {t.role}
                    </p>
                    <p className="text-xs text-green-300/40">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="py-20 lg:py-28 bg-background" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-green-950 text-balance mb-4"
            >
              Pret a moderniser votre ecole ?
            </h2>
            <p className="text-green-700 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Rejoignez les 150+ ecoles qui utilisent EduSaaS pour simplifier
              leur gestion au quotidien.
            </p>
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-green-900">
              {[
                "Configuration en 5 minutes",
                "Support en francais",
                "Mobile Money integre",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle
                    className="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-900 transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                Demarrer l{"'"}essai gratuit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-900 transition-colors px-4 py-4"
              >
                Deja un compte ? Se connecter
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---- FOOTER ---- */}
      <footer className="bg-green-950 text-green-200 py-10 px-4 sm:px-6 border-t border-green-900/50 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-green-500 rounded-md flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-green-950" aria-hidden="true" />
            </div>
            <span className="font-serif font-semibold text-white">
              EduSaaS
            </span>
          </div>
          <p className="text-sm text-green-200/40">
            &copy; 2026 EduSaaS. Tous droits reserves.
          </p>
        </div>
      </footer>
    </div>
  );
}
