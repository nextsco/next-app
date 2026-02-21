"use client";

import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/shared/StatCard";
import { RecoveryDonut } from "@/components/charts/RecoveryDonut";
import { RevenueBarChart } from "@/components/charts/RevenueBarChart";
import { formatCurrency, formatCurrencyAria } from "@/lib/utils";
import { mockPayments, mockStudents } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDateShort } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS } from "@/lib/constants";

const paymentStatusVariant = (status: string) => {
  switch (status) {
    case "COMPLETED": return "success" as const;
    case "PENDING": return "pending" as const;
    case "FAILED": return "error" as const;
    case "REFUNDED": return "warning" as const;
    default: return "info" as const;
  }
};

export default function AdminDashboardPage() {
  const totalStudents = mockStudents.filter((s) => s.isActive).length;
  const totalRevenue = mockPayments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = mockPayments.filter((p) => p.status === "PENDING").length;
  const recentPayments = mockPayments.slice(0, 5);

  return (
    <>
      <Topbar title="Tableau de bord" />
      <main className="p-4 lg:p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Eleves actifs"
            value={String(totalStudents)}
            icon="Users"
            change={5}
            changeLabel="ce mois"
            ariaLabel={`${totalStudents} eleves actifs, en hausse de 5 pourcent ce mois`}
          />
          <StatCard
            label="Revenus totaux"
            value={formatCurrency(totalRevenue)}
            icon="DollarSign"
            change={12}
            changeLabel="vs. mois dernier"
            ariaLabel={`Revenus totaux : ${formatCurrencyAria(totalRevenue)}, en hausse de 12 pourcent`}
          />
          <StatCard
            label="Paiements en attente"
            value={String(pendingPayments)}
            icon="CreditCard"
            ariaLabel={`${pendingPayments} paiements en attente`}
          />
          <StatCard
            label="Classes"
            value="5"
            icon="BookOpen"
            ariaLabel="5 classes"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
              Revenus mensuels
            </h3>
            <RevenueBarChart />
          </div>
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
              Taux de recouvrement
            </h3>
            <RecoveryDonut />
          </div>
        </div>

        {/* Recent payments */}
        <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-green-100">
            <h3 className="text-sm font-display font-semibold text-green-950">
              Paiements recents
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table aria-label="Derniers paiements enregistres" className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-100 bg-green-50/50">
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Eleve</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Classe</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Montant</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Statut</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((pay) => (
                  <tr key={pay.id} className="border-b border-green-50 last:border-0 hover:bg-green-50/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-green-950">{pay.studentName}</td>
                    <td className="px-5 py-3 text-green-700">{pay.className}</td>
                    <td className="px-5 py-3 text-green-950" aria-label={`${pay.amount} francs CFA`}>
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        variant={paymentStatusVariant(pay.status)}
                        label={PAYMENT_STATUS_LABELS[pay.status]}
                      />
                    </td>
                    <td className="px-5 py-3 text-green-700">{formatDateShort(pay.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
