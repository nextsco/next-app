"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Wait until store has been hydrated from sessionStorage before checking auth
    if (_hasHydrated && (!isAuthenticated || !user)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router, _hasHydrated]);

  // Show loading while Zustand rehydrates from sessionStorage
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50" aria-live="polite">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-green-200 border-t-green-700 rounded-full animate-spin" />
          <p className="text-green-700 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50" aria-live="polite">
        <p className="text-green-700 text-sm">Redirection en cours...</p>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-screen bg-green-50">
      <Sidebar
        role={user.role}
        userName={fullName}
        userFirstName={user.firstName}
        userLastName={user.lastName}
        schoolName={user.schoolName}
      />
      <MobileSidebar
        role={user.role}
        userName={fullName}
        userFirstName={user.firstName}
        userLastName={user.lastName}
        schoolName={user.schoolName}
      />
      <div className="lg:ml-64">
        {children}
      </div>
    </div>
  );
}
