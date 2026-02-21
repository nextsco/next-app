"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { mockGrades, mockClasses, mockSubjects, mockStudents } from "@/lib/mock-data";
import { getGradeColor } from "@/lib/utils";
import { EVALUATION_TYPE_LABELS } from "@/lib/constants";
import { Plus, TrendingUp, Minus, TrendingDown, AlertTriangle, Save, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const gradeIcons = {
  TrendingUp,
  Minus,
  TrendingDown,
  AlertTriangle,
};

export default function TeacherGradesPage() {
  const [selectedClass, setSelectedClass] = useState(mockClasses[0].id);
  const [showForm, setShowForm] = useState(false);

  const classStudents = mockStudents.filter((s) => s.classId === selectedClass);
  const classGrades = mockGrades.filter((g) =>
    classStudents.some((s) => s.id === g.studentId)
  );

  return (
    <>
      <Topbar title="Saisie des notes" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Saisie des notes"
          description="Gerez et saisissez les notes de vos eleves"
          action={
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nouvelle evaluation
            </button>
          }
        />

        {/* Class selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="class-select" className="text-sm font-medium text-green-950">
            Classe :
          </label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2.5 text-sm rounded-lg border border-green-200 bg-white text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            {mockClasses.slice(0, 2).map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        {/* Grade entry form */}
        {showForm && <GradeEntryForm classId={selectedClass} onClose={() => setShowForm(false)} />}

        {/* Existing grades table */}
        <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-green-100">
            <h3 className="text-sm font-display font-semibold text-green-950">
              Notes existantes
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table aria-label="Notes des eleves" className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-100 bg-green-50/50">
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Eleve</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Evaluation</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Matiere</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Type</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Note</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wide">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {classGrades.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-green-700">
                      Aucune note pour cette classe
                    </td>
                  </tr>
                ) : (
                  classGrades.map((grade) => {
                    const color = getGradeColor(grade.score, grade.maxScore);
                    const Icon = gradeIcons[color.icon as keyof typeof gradeIcons];
                    return (
                      <tr key={grade.id} className="border-b border-green-50 last:border-0 hover:bg-green-50/30 transition-colors">
                        <td className="px-5 py-3 font-medium text-green-950">{grade.studentName}</td>
                        <td className="px-5 py-3 text-green-700">{grade.evaluationTitle}</td>
                        <td className="px-5 py-3 text-green-700">{grade.subjectName}</td>
                        <td className="px-5 py-3 text-green-700 text-xs">
                          {EVALUATION_TYPE_LABELS[grade.evaluationType]}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${color.bg} ${color.text}`}>
                            <Icon size={12} aria-hidden="true" />
                            {grade.score}/{grade.maxScore}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-green-700 text-xs">{grade.comment}</td>
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

// Grade entry sub-form
function GradeEntryForm({ classId, onClose }: { classId: string; onClose: () => void }) {
  const classStudents = mockStudents.filter((s) => s.classId === classId);
  const [grades, setGrades] = useState<Record<string, { score: string; comment: string }>>(
    Object.fromEntries(classStudents.map((s) => [s.id, { score: "", comment: "" }]))
  );

  const handleSave = () => {
    console.log("Grades saved:", grades);
    onClose();
  };

  return (
    <div className="bg-white rounded-xl border border-green-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-semibold text-green-950">
          Saisie rapide des notes
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="eval-title" className="block text-sm font-medium text-green-950 mb-1.5">
            Titre de l{"'"}evaluation
          </label>
          <input
            id="eval-title"
            type="text"
            placeholder="Devoir n3"
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-green-200 bg-green-50 text-green-950 placeholder:text-green-700/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="eval-subject" className="block text-sm font-medium text-green-950 mb-1.5">
            Matiere
          </label>
          <select
            id="eval-subject"
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-green-200 bg-white text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            {mockSubjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table aria-label="Saisie des notes" className="w-full text-sm">
          <thead>
            <tr className="border-b border-green-100">
              <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-green-700">Eleve</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-green-700">Note /20</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-green-700">Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student) => (
              <tr key={student.id} className="border-b border-green-50 last:border-0">
                <td className="px-3 py-2 font-medium text-green-950">
                  {student.lastName} {student.firstName}
                </td>
                <td className="px-3 py-2">
                  <label htmlFor={`score-${student.id}`} className="sr-only">
                    Note de {student.firstName} {student.lastName}
                  </label>
                  <input
                    id={`score-${student.id}`}
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={grades[student.id]?.score ?? ""}
                    onChange={(e) =>
                      setGrades((prev) => ({
                        ...prev,
                        [student.id]: { ...prev[student.id], score: e.target.value },
                      }))
                    }
                    className="w-20 px-2 py-1.5 text-sm rounded border border-green-200 bg-green-50 text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                  />
                </td>
                <td className="px-3 py-2">
                  <label htmlFor={`comment-${student.id}`} className="sr-only">
                    Commentaire pour {student.firstName} {student.lastName}
                  </label>
                  <input
                    id={`comment-${student.id}`}
                    type="text"
                    value={grades[student.id]?.comment ?? ""}
                    onChange={(e) =>
                      setGrades((prev) => ({
                        ...prev,
                        [student.id]: { ...prev[student.id], comment: e.target.value },
                      }))
                    }
                    placeholder="Commentaire"
                    className="w-full px-2 py-1.5 text-sm rounded border border-green-200 bg-green-50 text-green-950 placeholder:text-green-700/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-green-100">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-green-950 bg-white border border-green-200 hover:bg-green-50 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Enregistrer les notes
        </button>
      </div>
    </div>
  );
}
