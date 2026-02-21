"use client";

import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { mockPayments, mockFeeStructures } from "@/lib/mock-data";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import {
  PAYMENT_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  MOBILE_OPERATOR_LABELS,
} from "@/lib/constants";
import { CheckCircle2, Clock, XCircle, Receipt } from "lucide-react";

const CHILD_STUDENT_ID = "std_01";

export default function ParentPaymentsPage() {
  const childPayments = mockPayments.filter(
    (p) => p.studentId === CHILD_STUDENT_ID
  );

  // Fee structure for 6eme A
  const feeStructure = mockFeeStructures.find(
    (f) => f.className === "6eme A"
  );

  const totalPaid = childPayments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalDue = feeStructure?.totalAmount ?? 0;
  const remaining = totalDue - totalPaid;
  const progressPercent = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;

  const statusIcons: Record<string, typeof CheckCircle2> = {
    COMPLETED: CheckCircle2,
    PENDING: Clock,
    FAILED: XCircle,
  };

  return (
    <>
      <Topbar title="Paiements" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Suivi des paiements"
          description="Consultez les paiements de scolarite de Fatou Camara - 6eme A"
        />

        {/* Payment progress */}
        <div className="bg-white rounded-xl border border-green-200 p-5">
          <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
            Progression des paiements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                Total scolarite
              </p>
              <p className="text-xl font-display font-bold text-green-950 mt-1">
                {formatCurrency(totalDue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                Total paye
              </p>
              <p className="text-xl font-display font-bold text-green-700 mt-1">
                {formatCurrency(totalPaid)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                Reste a payer
              </p>
              <p className="text-xl font-display font-bold text-amber-700 mt-1">
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div
            className="w-full h-3 bg-green-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${Math.round(progressPercent)} pourcent paye`}
          >
            <div
              className="h-full bg-green-700 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-green-700 mt-2 text-center">
            {Math.round(progressPercent)}% paye
          </p>
        </div>

        {/* Installment schedule */}
        {feeStructure && (
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
              Echeancier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {feeStructure.installments.map((inst) => {
                const paid = childPayments.find(
                  (p) =>
                    p.installmentName === inst.name &&
                    p.status === "COMPLETED"
                );
                return (
                  <div
                    key={inst.id}
                    className={`p-4 rounded-lg border ${
                      paid
                        ? "border-green-300 bg-green-50"
                        : "border-green-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-green-950">
                        {inst.name}
                      </h4>
                      {paid ? (
                        <CheckCircle2
                          className="h-5 w-5 text-green-700"
                          aria-label="Paye"
                        />
                      ) : (
                        <Clock
                          className="h-5 w-5 text-amber-600"
                          aria-label="En attente"
                        />
                      )}
                    </div>
                    <p className="text-lg font-display font-bold text-green-950">
                      {formatCurrency(inst.amount)}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Echeance : {formatDateShort(inst.dueDate)}
                    </p>
                    {paid && (
                      <p className="text-xs text-green-600 mt-1">
                        Paye le {formatDateShort(paid.paidAt)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Payment history */}
        <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-green-100">
            <h3 className="text-sm font-display font-semibold text-green-950">
              Historique des paiements
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table
              aria-label="Historique des paiements"
              className="w-full text-sm"
            >
              <thead>
                <tr className="border-b border-green-100 bg-green-50/50">
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Tranche
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Montant
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Methode
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide"
                  >
                    Recu
                  </th>
                </tr>
              </thead>
              <tbody>
                {childPayments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-green-700"
                    >
                      Aucun paiement enregistre
                    </td>
                  </tr>
                ) : (
                  childPayments.map((payment) => {
                    const StatusIcon =
                      statusIcons[payment.status] || Clock;
                    return (
                      <tr
                        key={payment.id}
                        className="border-b border-green-50 last:border-0 hover:bg-green-50/30 transition-colors"
                      >
                        <td className="px-5 py-3 text-green-950">
                          {formatDateShort(payment.paidAt)}
                        </td>
                        <td className="px-5 py-3 text-green-700">
                          {payment.installmentName}
                        </td>
                        <td className="px-5 py-3 font-semibold text-green-950">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-5 py-3 text-green-700 text-xs">
                          {PAYMENT_METHOD_LABELS[payment.method]}
                          {payment.operator &&
                            ` (${MOBILE_OPERATOR_LABELS[payment.operator]})`}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              payment.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "PENDING"
                                  ? "bg-amber-50 text-amber-800"
                                  : "bg-red-50 text-red-800"
                            }`}
                          >
                            <StatusIcon
                              size={12}
                              aria-hidden="true"
                            />
                            {PAYMENT_STATUS_LABELS[payment.status]}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          {payment.status === "COMPLETED" && (
                            <button
                              className="text-green-700 hover:text-green-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
                              aria-label={`Telecharger le recu ${payment.invoiceNumber}`}
                            >
                              <Receipt
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
