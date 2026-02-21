"use client";

import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/shared/StatCard";
import { RecoveryDonut } from "@/components/charts/RecoveryDonut";
import { RevenueBarChart } from "@/components/charts/RevenueBarChart";
import { formatCurrency, formatCurrencyAria } from "@/lib/utils";
import { mockPayments } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDateShort } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/constants";

const paymentStatusVariant = (status: string) => {
  switch (status) {
    case "COMPLETED": return "success" as const;
    case "PENDING": return "pending" as const;
    case "FAILED": return "error" as const;
    case "REFUNDED": return "warning" as const;
    default: return "info" as const;
  }
};

export default function AccountantDashboardPage() {
  const completedPayments = mockPayments.filter((p) => p.status === "COMPLETED");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = mockPayments.filter((p) => p.status === "PENDING");
  const pendingTotal = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const failedPayments = mockPayments.filter((p) => p.status === "FAILED");

  return (
    <>
      <Topbar title="Tableau de bord Comptable" />
      <main className="p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total encaisse"
            value={formatCurrency(totalRevenue)}
            icon="DollarSign"
            change={12}
            changeLabel="ce mois"
            ariaLabel={`Total encaisse : ${formatCurrencyAria(totalRevenue)}`}
          />
          <StatCard
            label="En attente"
            value={formatCurrency(pendingTotal)}
            icon="CreditCard"
            ariaLabel={`En attente : ${formatCurrencyAria(pendingTotal)}`}
          />
          <StatCard
            label="Paiements echoues"
            value={String(failedPayments.length)}
            icon="TrendingDown"
            ariaLabel={`${failedPayments.length} paiements echoues`}
          />
          <StatCard
            label="Taux de recouvrement"
            value="68%"
            icon="BarChart3"
            change={3}
            changeLabel="vs. mois dernier"
            ariaLabel="Taux de recouvrement : 68 pourcent"
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

        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-green-100">
            <h3 className="text-sm font-display font-semibold text-green-950">
              Derniers paiements
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table aria-label="Derniers paiements enregistres" className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-100 bg-green-50/50">
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Facture</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Eleve</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Montant</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Mode</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Statut</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((pay) => (
                  <tr key={pay.id} className="border-b border-green-50 last:border-0 hover:bg-green-50/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-green-700">{pay.invoiceNumber}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-green-950">{pay.studentName}</p>
                      <p className="text-xs text-green-700">{pay.className} - {pay.installmentName}</p>
                    </td>
                    <td className="px-5 py-3 font-medium text-green-950" aria-label={`${pay.amount} francs CFA`}>
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="px-5 py-3 text-green-700 text-xs">{PAYMENT_METHOD_LABELS[pay.method]}</td>
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
