"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50" aria-live="polite">
        <p className="text-green-700">Redirection en cours...</p>
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
