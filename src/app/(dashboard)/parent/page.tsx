"use client";

import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/shared/StatCard";
import { mockGrades, mockPayments, mockMessages } from "@/lib/mock-data";
import { formatCurrency, formatDateShort, getGradeColor } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS } from "@/lib/constants";
import Link from "next/link";
import {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const gradeIcons = {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
};

// Parent is Ousmane Camara (usr_04), child is Fatou Camara (std_01)
const PARENT_USER_ID = "usr_04";
const CHILD_STUDENT_ID = "std_01";

export default function ParentDashboardPage() {
  const childGrades = mockGrades.filter(
    (g) => g.studentId === CHILD_STUDENT_ID
  );
  const childPayments = mockPayments.filter(
    (p) => p.studentId === CHILD_STUDENT_ID
  );
  const parentMessages = mockMessages.filter(
    (m) => m.receiverId === PARENT_USER_ID || m.senderId === PARENT_USER_ID
  );
  const unreadMessages = parentMessages.filter(
    (m) => !m.isRead && m.receiverId === PARENT_USER_ID
  );

  const avgScore =
    childGrades.length > 0
      ? childGrades.reduce((sum, g) => sum + g.score, 0) / childGrades.length
      : 0;

  const totalPaid = childPayments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <Topbar title="Espace Parent" />
      <main className="p-4 lg:p-6 space-y-6">
        {/* Welcome */}
        <div className="bg-green-900 rounded-xl p-5 lg:p-6">
          <h2 className="text-lg font-display font-bold text-white">
            Bonjour, Ousmane Camara
          </h2>
          <p className="text-sm text-green-200 mt-1">
            Voici le suivi scolaire de votre enfant{" "}
            <span className="font-semibold text-white">Fatou Camara</span> -
            6eme A
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Moyenne generale"
            value={`${avgScore.toFixed(1)}/20`}
            icon="BarChart3"
            ariaLabel={`Moyenne generale : ${avgScore.toFixed(1)} sur 20`}
          />
          <StatCard
            label="Notes recentes"
            value={String(childGrades.length)}
            icon="ClipboardList"
            ariaLabel={`${childGrades.length} notes`}
          />
          <StatCard
            label="Paiements effectues"
            value={formatCurrency(totalPaid)}
            icon="DollarSign"
            ariaLabel={`${totalPaid} francs CFA payes`}
          />
          <StatCard
            label="Messages non lus"
            value={String(unreadMessages.length)}
            icon="MessageSquare"
            ariaLabel={`${unreadMessages.length} messages non lus`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent grades */}
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-green-950">
                Dernieres notes
              </h3>
              <Link
                href="/parent/grades"
                className="text-xs font-medium text-green-700 hover:text-green-900 inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
              >
                Voir tout
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="space-y-3">
              {childGrades.slice(0, 4).map((grade) => {
                const color = getGradeColor(grade.score, grade.maxScore);
                const Icon =
                  gradeIcons[color.icon as keyof typeof gradeIcons];
                return (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between py-2 border-b border-green-50 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-green-950 truncate">
                        {grade.subjectName}
                      </p>
                      <p className="text-xs text-green-700">
                        {grade.evaluationTitle}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${color.bg} ${color.text}`}
                    >
                      <Icon size={12} aria-hidden="true" />
                      {grade.score}/{grade.maxScore}
                    </span>
                  </div>
                );
              })}
              {childGrades.length === 0 && (
                <p className="text-sm text-green-700 py-4 text-center">
                  Aucune note disponible
                </p>
              )}
            </div>
          </div>

          {/* Recent payments */}
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-green-950">
                Derniers paiements
              </h3>
              <Link
                href="/parent/payments"
                className="text-xs font-medium text-green-700 hover:text-green-900 inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
              >
                Voir tout
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="space-y-3">
              {childPayments.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-2 border-b border-green-50 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-green-950 truncate">
                      {payment.installmentName}
                    </p>
                    <p className="text-xs text-green-700">
                      {formatDateShort(payment.paidAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-green-950">
                      {formatCurrency(payment.amount)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        payment.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "PENDING"
                            ? "bg-amber-50 text-amber-800"
                            : "bg-red-50 text-red-800"
                      }`}
                    >
                      {PAYMENT_STATUS_LABELS[payment.status]}
                    </span>
                  </div>
                </div>
              ))}
              {childPayments.length === 0 && (
                <p className="text-sm text-green-700 py-4 text-center">
                  Aucun paiement
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-xl border border-green-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-green-950">
              Messages recents
            </h3>
            <Link
              href="/parent/messages"
              className="text-xs font-medium text-green-700 hover:text-green-900 inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded"
            >
              Voir tout
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {parentMessages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  !msg.isRead && msg.receiverId === PARENT_USER_ID
                    ? "bg-green-50 border border-green-200"
                    : "border border-green-100"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-950 text-xs font-semibold shrink-0"
                  aria-hidden="true"
                >
                  {msg.senderName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-green-950">
                      {msg.senderName}
                    </p>
                    <span className="text-xs text-green-700">
                      {formatDateShort(msg.createdAt)}
                    </span>
                    {!msg.isRead && msg.receiverId === PARENT_USER_ID && (
                      <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-green-700 mt-0.5 line-clamp-2">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
