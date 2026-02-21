"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockPayments } from "@/lib/mock-data";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS, PAYMENT_METHOD_LABELS, MOBILE_OPERATOR_LABELS } from "@/lib/constants";
import { Plus } from "lucide-react";
import type { Payment } from "@/types";
import { PaymentForm } from "@/components/payments/PaymentForm";

const paymentStatusVariant = (status: string) => {
  switch (status) {
    case "COMPLETED": return "success" as const;
    case "PENDING": return "pending" as const;
    case "FAILED": return "error" as const;
    case "REFUNDED": return "warning" as const;
    default: return "info" as const;
  }
};

export default function PaymentsPage() {
  const [showForm, setShowForm] = useState(false);

  const columns: Column<Payment>[] = [
    {
      key: "invoiceNumber",
      header: "Facture",
      sortable: true,
      render: (p) => <span className="font-mono text-xs text-green-700">{p.invoiceNumber}</span>,
    },
    {
      key: "studentName",
      header: "Eleve",
      sortable: true,
      render: (p) => (
        <div>
          <p className="font-medium text-green-950">{p.studentName}</p>
          <p className="text-xs text-green-700">{p.className}</p>
        </div>
      ),
    },
    {
      key: "installmentName",
      header: "Tranche",
      render: (p) => <span className="text-green-700">{p.installmentName}</span>,
    },
    {
      key: "amount",
      header: "Montant",
      sortable: true,
      render: (p) => (
        <span className="font-medium text-green-950" aria-label={`${p.amount} francs CFA`}>
          {formatCurrency(p.amount)}
        </span>
      ),
    },
    {
      key: "method",
      header: "Mode",
      render: (p) => (
        <div>
          <p className="text-green-950 text-xs">{PAYMENT_METHOD_LABELS[p.method]}</p>
          {p.operator && <p className="text-xs text-green-700">{MOBILE_OPERATOR_LABELS[p.operator]}</p>}
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (p) => (
        <StatusBadge variant={paymentStatusVariant(p.status)} label={PAYMENT_STATUS_LABELS[p.status]} />
      ),
    },
    {
      key: "paidAt",
      header: "Date",
      sortable: true,
      render: (p) => <span className="text-green-700">{formatDateShort(p.paidAt)}</span>,
    },
  ];

  return (
    <>
      <Topbar title="Paiements" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Gestion des paiements"
          description={`${mockPayments.length} paiements enregistres`}
          action={
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nouveau paiement
            </button>
          }
        />

        <DataTable
          data={mockPayments}
          columns={columns}
          searchKey="studentName"
          searchPlaceholder="Rechercher un paiement..."
          exportable
          exportFilename="paiements"
          ariaLabel="Tableau des paiements"
        />

        {showForm && <PaymentForm onClose={() => setShowForm(false)} />}
      </main>
    </>
  );
}
