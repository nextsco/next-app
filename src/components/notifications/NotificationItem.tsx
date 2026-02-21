"use client";

import type { Notification } from "@/types";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const iconMap = {
  SUCCESS: CheckCircle,
  WARNING: AlertTriangle,
  INFO: Info,
  ERROR: XCircle,
};

const roleMap = {
  SUCCESS: "status" as const,
  WARNING: "status" as const,
  INFO: "status" as const,
  ERROR: "alert" as const,
};

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const Icon = iconMap[notification.type];

  return (
    <div
      role={roleMap[notification.type]}
      className={cn(
        "flex gap-3 px-4 py-3 border-b border-green-50 last:border-0 transition-colors",
        !notification.isRead && "bg-green-50/50"
      )}
    >
      <div className="shrink-0 mt-0.5">
        <Icon
          className={cn(
            "h-5 w-5",
            notification.type === "SUCCESS" && "text-green-700",
            notification.type === "WARNING" && "text-amber-600",
            notification.type === "INFO" && "text-green-700",
            notification.type === "ERROR" && "text-red-600"
          )}
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-green-950">{notification.title}</p>
        <p className="text-sm text-green-700 mt-0.5 leading-relaxed">{notification.message}</p>
        <p className="text-xs text-green-700/60 mt-1">
          {formatDateTime(notification.createdAt)}
        </p>
      </div>
      {!notification.isRead && (
        <div className="shrink-0 mt-1.5">
          <span className="w-2 h-2 bg-green-700 rounded-full block" aria-label="Non lue" />
        </div>
      )}
    </div>
  );
}
