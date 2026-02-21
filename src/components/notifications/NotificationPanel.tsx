"use client";

import type { Notification } from "@/types";
import { NotificationItem } from "./NotificationItem";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationPanel({ notifications, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Panneau de notifications"
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-200">
        <h2 className="text-sm font-display font-semibold text-green-950">Notifications</h2>
        <button
          onClick={onClose}
          aria-label="Fermer les notifications"
          className="p-1 rounded hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4 text-green-700" aria-hidden="true" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto" aria-live="polite">
        {notifications.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-green-700">
            Aucune notification
          </p>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li key={n.id}>
                <NotificationItem notification={n} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
