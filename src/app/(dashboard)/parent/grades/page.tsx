"use client";

import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { mockGrades } from "@/lib/mock-data";
import { getGradeColor, formatDateShort } from "@/lib/utils";
import { EVALUATION_TYPE_LABELS } from "@/lib/constants";
import {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

const gradeIcons = {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
};

const CHILD_STUDENT_ID = "std_01";

export default function ParentGradesPage() {
  const childGrades = mockGrades.filter(
    (g) => g.studentId === CHILD_STUDENT_ID
  );

  const avgScore =
    childGrades.length > 0
      ? childGrades.reduce((sum, g) => sum + g.score, 0) / childGrades.length
      : 0;

  const bestGrade = childGrades.length > 0
    ? Math.max(...childGrades.map((g) => g.score))
    : 0;

  const lowestGrade = childGrades.length > 0
    ? Math.min(...childGrades.map((g) => g.score))
    : 0;

  // Group grades by subject
  const gradesBySubject = childGrades.reduce(
    (acc, grade) => {
      if (!acc[grade.subjectName]) {
        acc[grade.subjectName] = [];
      }
      acc[grade.subjectName].push(grade);
      return acc;
    },
    {} as Record<string, typeof childGrades>
  );

  return (
    <>
      <Topbar title="Notes de Fatou" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Notes de Fatou Camara"
          description="Consultez les resultats scolaires de votre enfant"
        />

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-green-200 p-5 text-center">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
              Moyenne generale
            </p>
            <p className="text-2xl font-display font-bold text-green-950 mt-1">
              {avgScore.toFixed(1)}/20
            </p>
          </div>
          <div className="bg-white rounded-xl border border-green-200 p-5 text-center">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
              Meilleure note
            </p>
            <p className="text-2xl font-display font-bold text-green-950 mt-1">
              {bestGrade}/20
            </p>
          </div>
          <div className="bg-white rounded-xl border border-green-200 p-5 text-center">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
              Note la plus basse
            </p>
            <p className="text-2xl font-display font-bold text-green-950 mt-1">
              {lowestGrade}/20
            </p>
          </div>
        </div>

        {/* Grades by subject */}
        <div className="space-y-4">
          {Object.entries(gradesBySubject).map(([subject, grades]) => {
            const subjectAvg =
              grades.reduce((sum, g) => sum + g.score, 0) / grades.length;
            return (
              <div
                key={subject}
                className="bg-white rounded-xl border border-green-200 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-green-100 flex items-center justify-between">
                  <h3 className="text-sm font-display font-semibold text-green-950">
                    {subject}
                  </h3>
                  <span className="text-xs font-medium text-green-700">
                    Moyenne : {subjectAvg.toFixed(1)}/20
                  </span>
                </div>
                <div className="divide-y divide-green-50">
                  {grades.map((grade) => {
                    const color = getGradeColor(grade.score, grade.maxScore);
                    const Icon =
                      gradeIcons[color.icon as keyof typeof gradeIcons];
                    return (
                      <div
                        key={grade.id}
                        className="px-5 py-3 flex items-center justify-between"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-green-950">
                            {grade.evaluationTitle}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-green-700">
                              {EVALUATION_TYPE_LABELS[grade.evaluationType]}
                            </span>
                            <span className="text-xs text-green-500">
                              {formatDateShort(grade.createdAt)}
                            </span>
                          </div>
                          {grade.comment && (
                            <p className="text-xs text-green-600 mt-1 italic">
                              {grade.comment}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${color.bg} ${color.text} shrink-0`}
                        >
                          <Icon size={12} aria-hidden="true" />
                          {grade.score}/{grade.maxScore}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {childGrades.length === 0 && (
          <div className="bg-white rounded-xl border border-green-200 p-8 text-center">
            <p className="text-sm text-green-700">
              Aucune note disponible pour le moment
            </p>
          </div>
        )}
      </main>
    </>
  );
}
