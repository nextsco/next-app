"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Settings,
  School,
  CreditCard,
  Bell,
  ClipboardList,
  MessageSquare,
  FileText,
  UserCheck,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { ROLES_LABELS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navByRole: Record<UserRole, NavItem[]> = {
  SUPER_ADMIN: [
    { href: "/super-admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/super-admin/schools", label: "Ecoles", icon: School },
    { href: "/super-admin/subscriptions", label: "Abonnements", icon: CreditCard },
    { href: "/super-admin/support", label: "Support", icon: HelpCircle },
  ],
  SCHOOL_ADMIN: [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/students", label: "Eleves", icon: Users },
    { href: "/admin/teachers", label: "Enseignants", icon: UserCheck },
    { href: "/admin/classes", label: "Classes", icon: BookOpen },
    { href: "/admin/subjects", label: "Matieres", icon: ClipboardList },
    { href: "/admin/reports", label: "Rapports", icon: BarChart3 },
    { href: "/admin/settings", label: "Parametres", icon: Settings },
  ],
  ACCOUNTANT: [
    { href: "/accountant", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/accountant/payments", label: "Paiements", icon: DollarSign },
    { href: "/accountant/fee-structures", label: "Grilles tarifaires", icon: FileText },
    { href: "/accountant/reminders", label: "Rappels", icon: Bell },
  ],
  TEACHER: [
    { href: "/teacher", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/teacher/grades", label: "Saisie des notes", icon: ClipboardList },
    { href: "/teacher/observations", label: "Observations", icon: MessageSquare },
  ],
  PARENT: [
    { href: "/parent", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/parent/grades", label: "Notes", icon: BarChart3 },
    { href: "/parent/payments", label: "Paiements", icon: DollarSign },
    { href: "/parent/messages", label: "Messages", icon: MessageSquare },
  ],
};

interface SidebarProps {
  role: UserRole;
  userName: string;
  userFirstName: string;
  userLastName: string;
  schoolName: string | null;
}

export function Sidebar({ role, userName, userFirstName, userLastName, schoolName }: SidebarProps) {
  const pathname = usePathname();
  const items = navByRole[role];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-green-950 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-green-900">
        <GraduationCap className="h-7 w-7 text-green-500" aria-hidden="true" />
        <span className="text-lg font-display font-bold">EduSaaS</span>
      </div>

      {/* Navigation */}
      <nav aria-label="Navigation principale" className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950",
                    isActive
                      ? "bg-green-900 text-white"
                      : "text-green-200 hover:bg-green-900 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-green-900">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-semibold shrink-0"
            aria-hidden="true"
          >
            {getInitials(userFirstName, userLastName)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-green-200 truncate">
              {ROLES_LABELS[role]}
              {schoolName ? ` - ${schoolName}` : ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
