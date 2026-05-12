"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  CircleAlert,
  FileText,
  Loader2,
  MessageSquare,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const TYPE_STYLES = {
  recommendation_ready: {
    icon: Sparkles,
    iconClass: "text-blue-600 bg-blue-50 border-blue-100",
  },
  counselor_message: {
    icon: MessageSquare,
    iconClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  application_update: {
    icon: FileText,
    iconClass: "text-violet-600 bg-violet-50 border-violet-100",
  },
  system_alert: {
    icon: TriangleAlert,
    iconClass: "text-amber-600 bg-amber-50 border-amber-100",
  },
} as const;

function formatRelativeTime(dateInput: string) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default function NavbarNotification() {
  const {
    notifications,
    unreadCount,
    loading,
    refreshing,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const latestNotifications = useMemo(
    () =>
      [...notifications]
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, 8),
    [notifications],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (open) {
      void refreshNotifications();
    }
  }, [open, refreshNotifications]);

  const handleNotificationClick = async (id: string) => {
    try {
      await markAsRead(id);
    } finally {
      setOpen(false);
    }
  };

  const bellButton = (
    <button
      className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      onClick={() => setOpen((current) => !current)}
      aria-label="Notifications"
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );

  return (
    <div ref={containerRef} className="relative">
      {bellButton}

      <div
        className={`absolute right-0 mt-2 w-[min(92vw,23rem)] sm:w-[24rem] origin-top-right transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 -translate-y-2"
        } z-50`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Notifications
              </p>
              <p className="text-xs text-gray-500">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All notifications are read"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void refreshNotifications()}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {refreshing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CircleAlert className="h-3.5 w-3.5" />
                )}
                Refresh
              </button>
              <button
                type="button"
                onClick={() => void markAllAsRead()}
                disabled={unreadCount === 0}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all as read
              </button>
            </div>
          </div>

          <div className="max-h-[24rem] overflow-y-auto">
            {loading && latestNotifications.length === 0 ? (
              <div className="flex items-center justify-center px-4 py-10 text-sm text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading notifications...
              </div>
            ) : latestNotifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  No notifications yet
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  You’ll see recommendations, counselor messages, and updates
                  here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {latestNotifications.map((notification) => {
                  const styles =
                    TYPE_STYLES[notification.type] || TYPE_STYLES.system_alert;
                  const Icon = styles.icon;

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() =>
                        void handleNotificationClick(notification.id)
                      }
                      className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-50 ${
                        notification.isRead ? "bg-white" : "bg-blue-50/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border ${styles.iconClass}`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-semibold ${notification.isRead ? "text-gray-800" : "text-gray-950"}`}
                              >
                                {notification.title}
                              </p>
                              <p className="mt-0.5 text-sm leading-5 text-gray-600">
                                {notification.message}
                              </p>
                            </div>

                            {!notification.isRead && (
                              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 font-medium capitalize text-gray-600">
                              {notification.type.replace(/_/g, " ")}
                            </span>
                            <span>
                              {formatRelativeTime(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
