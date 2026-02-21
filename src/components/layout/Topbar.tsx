"use client";

import { Menu, Bell, LogOut } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { mockNotifications } from "@/lib/mock-data";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { useState } from "react";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { toggleMobileSidebar } = useUiStore();
  const { logout } = useAuthStore();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-green-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left: mobile menu + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            aria-label="Ouvrir le menu de navigation"
            className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <Menu className="h-5 w-5 text-green-950" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-display font-semibold text-green-950">{title}</h1>
        </div>

        {/* Right: notifications + logout */}
        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} non lues` : ""}`}
              className="relative p-2 rounded-lg hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            >
              <Bell className="h-5 w-5 text-green-700" aria-hidden="true" />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationPanel
                notifications={mockNotifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
          <button
            onClick={handleLogout}
            aria-label="Se deconnecter"
            className="p-2 rounded-lg hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <LogOut className="h-5 w-5 text-green-700" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
