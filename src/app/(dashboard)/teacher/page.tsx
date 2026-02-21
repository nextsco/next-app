"use client";

import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/shared/StatCard";
import { GradeDistribution } from "@/components/charts/GradeDistribution";
import { mockGrades, mockClasses, mockSubjects } from "@/lib/mock-data";
import { formatDateShort, getGradeColor } from "@/lib/utils";
import { TrendingUp, Minus, TrendingDown, AlertTriangle } from "lucide-react";

const gradeIcons = {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
};

export default function TeacherDashboardPage() {
  const avgScore = mockGrades.reduce((sum, g) => sum + g.score, 0) / mockGrades.length;
  const aboveAvg = mockGrades.filter((g) => g.score >= 10).length;
  const belowAvg = mockGrades.filter((g) => g.score < 10).length;

  return (
    <>
      <Topbar title="Tableau de bord Enseignant" />
      <main className="p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Mes classes"
            value="2"
            icon="BookOpen"
            ariaLabel="2 classes"
          />
          <StatCard
            label="Mes eleves"
            value="68"
            icon="Users"
            ariaLabel="68 eleves"
          />
          <StatCard
            label="Moyenne generale"
            value={`${avgScore.toFixed(1)}/20`}
            icon="BarChart3"
            ariaLabel={`Moyenne generale : ${avgScore.toFixed(1)} sur 20`}
          />
          <StatCard
            label="Notes saisies"
            value={String(mockGrades.length)}
            icon="TrendingUp"
            ariaLabel={`${mockGrades.length} notes saisies`}
          />
        </div>

        {/* Chart + recent grades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-green-200 p-5">
            <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
              Distribution des notes
            </h3>
            <GradeDistribution />
          </div>

          <div className="bg-white rounded-xl border border-green-200 p-5">
            <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
              Dernieres notes saisies
            </h3>
            <div className="space-y-3">
              {mockGrades.slice(0, 6).map((grade) => {
                const color = getGradeColor(grade.score, grade.maxScore);
                const Icon = gradeIcons[color.icon as keyof typeof gradeIcons];
                return (
                  <div key={grade.id} className="flex items-center justify-between py-2 border-b border-green-50 last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-green-950 truncate">{grade.studentName}</p>
                      <p className="text-xs text-green-700">{grade.subjectName} - {grade.evaluationTitle}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${color.bg} ${color.text}`}
                      >
                        <Icon size={12} aria-hidden="true" />
                        {grade.score}/{grade.maxScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Class overview */}
        <div className="bg-white rounded-xl border border-green-200 p-5">
          <h3 className="text-sm font-display font-semibold text-green-950 mb-4">
            Mes classes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockClasses.slice(0, 2).map((cls) => (
              <div key={cls.id} className="p-4 border border-green-200 rounded-lg">
                <h4 className="font-display font-semibold text-green-950">{cls.name}</h4>
                <p className="text-sm text-green-700 mt-1">{cls.studentsCount} eleves</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-green-700">
                  <span>{aboveAvg} au-dessus de la moyenne</span>
                  <span>{belowAvg} en dessous</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
