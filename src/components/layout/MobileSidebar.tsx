"use client";

import { useEffect, useRef, useCallback } from "react";
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
  X,
  type LucideIcon,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { ROLES_LABELS } from "@/lib/constants";
import type { UserRole } from "@/types";
import { useUiStore } from "@/stores/uiStore";
import { getFocusableElements } from "@/lib/a11y";

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

interface MobileSidebarProps {
  role: UserRole;
  userName: string;
  userFirstName: string;
  userLastName: string;
  schoolName: string | null;
}

export function MobileSidebar({ role, userName, userFirstName, userLastName, schoolName }: MobileSidebarProps) {
  const pathname = usePathname();
  const { mobileSidebarOpen, closeMobileSidebar } = useUiStore();
  const items = navByRole[role];
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileSidebar();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = getFocusableElements(drawerRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeMobileSidebar]
  );

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen, handleKeyDown]);

  // Close on navigation
  useEffect(() => {
    closeMobileSidebar();
  }, [pathname, closeMobileSidebar]);

  if (!mobileSidebarOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-green-950/60"
        onClick={closeMobileSidebar}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sidebar-title"
        className="relative flex flex-col w-72 max-w-[80vw] h-full bg-green-950 text-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-green-900">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-green-500" aria-hidden="true" />
            <span id="mobile-sidebar-title" className="text-lg font-display font-bold">
              EduSaaS
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={closeMobileSidebar}
            aria-label="Fermer le menu"
            className="p-2 rounded-lg hover:bg-green-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav */}
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[48px]",
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
      </div>
    </div>
  );
}
