import Link from "next/link";
import {
  GraduationCap,
  Users,
  CreditCard,
  BarChart3,
  MessageSquare,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestion des eleves",
    description: "Inscriptions, fiches, classes et suivi complet de chaque eleve.",
  },
  {
    icon: BarChart3,
    title: "Notes et bulletins",
    description: "Saisie des notes, calcul des moyennes et generation de bulletins.",
  },
  {
    icon: CreditCard,
    title: "Paiements integres",
    description: "Wave, Orange Money, MTN MoMo. Suivi en temps reel des recouvrements.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Messagerie integree entre enseignants, parents et administration.",
  },
  {
    icon: Shield,
    title: "Multi-roles",
    description: "Directeur, comptable, enseignant, parent : chacun son tableau de bord.",
  },
  {
    icon: GraduationCap,
    title: "Concu pour l'Afrique",
    description: "En francais, en FCFA, adapte aux realites des ecoles subsahariennes.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8" aria-hidden="true" />
            <span className="text-xl font-display font-bold">EduSaaS</span>
          </div>
          <nav aria-label="Navigation principale">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
            >
              Se connecter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main id="main-content">
        <section className="bg-green-950 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance leading-tight mb-6">
              La gestion scolaire simplifiee pour l{"'"}Afrique
            </h1>
            <p className="text-lg md:text-xl text-green-200 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
              EduSaaS aide les ecoles privees et confessionnelles d{"'"}Afrique
              francophone a gerer eleves, notes, paiements et communication
              sur une seule plateforme.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-green-500 text-green-950 px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-green-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
              >
                Commencer gratuitement
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-display font-bold text-center text-green-950 mb-4"
            >
              Tout ce dont votre ecole a besoin
            </h2>
            <p className="text-green-700 text-center max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
              Une solution complete, pensee pour les ecoles d{"'"}Afrique
              francophone subsaharienne.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 border border-green-200 hover:border-green-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon
                      className="h-6 w-6 text-green-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-green-950 mb-2">
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

        {/* Social Proof */}
        <section className="bg-green-900 text-white py-16 px-4" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Chiffres cles
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-display font-bold text-green-200">150+</p>
              <p className="text-green-200/80 mt-1">Ecoles inscrites</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-green-200">25 000+</p>
              <p className="text-green-200/80 mt-1">Eleves geres</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-green-200">8 pays</p>
              <p className="text-green-200/80 mt-1">En Afrique francophone</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-display font-bold text-green-950 mb-4"
            >
              Pret a moderniser votre ecole ?
            </h2>
            <p className="text-green-700 text-lg mb-8 leading-relaxed">
              Essai gratuit de 30 jours. Aucune carte bancaire requise.
            </p>
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-green-950">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span>Configuration en 5 minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span>Support en francais</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span>Mobile Money integre</span>
              </li>
            </ul>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-green-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              Demarrer l{"'"}essai gratuit
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-950 text-green-200 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
            <span className="font-display font-semibold text-white">EduSaaS</span>
          </div>
          <p className="text-sm text-green-200/60">
            &copy; 2025 EduSaaS. Tous droits reserves.
          </p>
        </div>
      </footer>
    </div>
  );
}
