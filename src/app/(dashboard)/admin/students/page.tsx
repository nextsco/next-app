"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { mockStudents } from "@/lib/mock-data";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import type { Student } from "@/types";
import { StudentForm } from "@/components/students/StudentForm";

export default function StudentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const columns: Column<Student>[] = [
    {
      key: "registrationNo",
      header: "N.",
      sortable: true,
      render: (s) => <span className="font-medium text-green-950">{s.registrationNo}</span>,
    },
    {
      key: "lastName",
      header: "Nom",
      sortable: true,
      render: (s) => (
        <div>
          <p className="font-medium text-green-950">{s.lastName} {s.firstName}</p>
          <p className="text-xs text-green-700">{s.gender === "MALE" ? "Garcon" : "Fille"}</p>
        </div>
      ),
    },
    {
      key: "className",
      header: "Classe",
      sortable: true,
      render: (s) => <span className="text-green-700">{s.className}</span>,
    },
    {
      key: "parentName",
      header: "Parent",
      render: (s) => (
        <div>
          <p className="text-green-950">{s.parentName}</p>
          <p className="text-xs text-green-700">{s.parentPhone}</p>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Statut",
      render: (s) => (
        <StatusBadge
          variant={s.isActive ? "success" : "error"}
          label={s.isActive ? "Actif" : "Inactif"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (s) => (
        <div className="flex items-center gap-1">
          <button
            aria-label={`Voir ${s.firstName} ${s.lastName}`}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <Eye className="h-4 w-4 text-green-700" aria-hidden="true" />
          </button>
          <button
            aria-label={`Modifier ${s.firstName} ${s.lastName}`}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <Edit className="h-4 w-4 text-green-700" aria-hidden="true" />
          </button>
          <button
            onClick={() => setDeleteTarget(s)}
            aria-label={`Supprimer ${s.firstName} ${s.lastName}`}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Eleves" />
      <main className="p-4 lg:p-6 space-y-6">
        <PageHeader
          title="Liste des eleves"
          description={`${mockStudents.length} eleves enregistres`}
          action={
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-900 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Ajouter un eleve
            </button>
          }
        />

        <DataTable
          data={mockStudents}
          columns={columns}
          searchKey="lastName"
          searchPlaceholder="Rechercher un eleve..."
          exportable
          exportFilename="eleves"
          ariaLabel="Tableau des eleves"
        />

        {showForm && <StudentForm onClose={() => setShowForm(false)} />}

        <ConfirmDialog
          open={!!deleteTarget}
          title="Supprimer cet eleve"
          description={`Etes-vous sur de vouloir supprimer ${deleteTarget?.firstName} ${deleteTarget?.lastName} ? Cette action est irreversible.`}
          confirmLabel="Supprimer"
          variant="danger"
          onConfirm={() => setDeleteTarget(null)}
          onCancel={() => setDeleteTarget(null)}
        />
      </main>
    </>
  );
}
