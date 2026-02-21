import type { UserRole } from "@/types";

export const ROLES_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  SCHOOL_ADMIN: "Directeur",
  ACCOUNTANT: "Comptable",
  TEACHER: "Enseignant",
  PARENT: "Parent",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  COMPLETED: "Payé",
  FAILED: "Échoué",
  REFUNDED: "Remboursé",
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  MOBILE_MONEY: "Mobile Money",
  CASH: "Espèces",
  BANK_TRANSFER: "Virement bancaire",
  CHECK: "Chèque",
};

export const MOBILE_OPERATOR_LABELS: Record<string, string> = {
  WAVE: "Wave",
  ORANGE_MONEY: "Orange Money",
  MTN_MOMO: "MTN MoMo",
};

export const EVALUATION_TYPE_LABELS: Record<string, string> = {
  CLASS_TEST: "Devoir",
  EXAM: "Examen",
  HOMEWORK: "Exercice maison",
  ORAL: "Oral",
};

export const ITEMS_PER_PAGE = 10;
