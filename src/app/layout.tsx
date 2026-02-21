import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduSaaS - Gestion scolaire pour l'Afrique",
  description:
    "Plateforme de gestion scolaire pour les ecoles privees et confessionnelles d'Afrique francophone subsaharienne.",
};

export const viewport: Viewport = {
  themeColor: "#052E16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-green-50 text-green-950 font-body antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
