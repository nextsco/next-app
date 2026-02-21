export type UserRole = "SUPER_ADMIN" | "SCHOOL_ADMIN" | "ACCOUNTANT" | "TEACHER" | "PARENT";

export type Gender = "MALE" | "FEMALE";

export type PaymentMethod = "MOBILE_MONEY" | "CASH" | "BANK_TRANSFER" | "CHECK";

export type MobileOperator = "WAVE" | "ORANGE_MONEY" | "MTN_MOMO";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type EvaluationType = "CLASS_TEST" | "EXAM" | "HOMEWORK" | "ORAL";

export type NotificationType = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  schoolId: string | null;
  schoolName: string | null;
  country: string;
  avatar: string | null;
}

export interface School {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "TRIAL";
  studentsCount: number;
  teachersCount: number;
  createdAt: string;
}

export interface Student {
  id: string;
  registrationNo: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  className: string;
  classId: string;
  photo: string | null;
  isActive: boolean;
  parentName: string;
  parentPhone: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  isActive: boolean;
}

export interface ClassGroup {
  id: string;
  name: string;
  level: string;
  studentsCount: number;
  teacherName: string;
}

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  classId: string;
  className: string;
  teacherName: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  installmentName: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  operator: MobileOperator | null;
  status: PaymentStatus;
  paidAt: string;
  invoiceNumber: string;
}

export interface FeeStructure {
  id: string;
  className: string;
  totalAmount: number;
  installments: Installment[];
}

export interface Installment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  evaluationTitle: string;
  evaluationType: EvaluationType;
  subjectName: string;
  score: number;
  maxScore: number;
  coefficient: number;
  isAbsent: boolean;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
}
