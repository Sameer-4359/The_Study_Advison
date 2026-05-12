"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  notificationApi,
  StudentNotification,
} from "@/lib/api/notificationApi";

const POLL_INTERVAL_MS = 30_000;

export function useNotifications() {
  const { token, user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const fetchNotifications = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!isAuthenticated || !token || user?.role !== "student") {
        setNotifications([]);
        setError(null);
        return [] as StudentNotification[];
      }

      const shouldShowLoading = !options?.silent && notifications.length === 0;
      if (shouldShowLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError(null);

      try {
        const data = await notificationApi.getNotifications(token);
        setNotifications(Array.isArray(data) ? data : []);
        return data;
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to fetch notifications";
        setError(message);
        return [] as StudentNotification[];
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [isAuthenticated, notifications.length, token, user?.role],
  );

  const refreshNotifications = useCallback(async () => {
    return await fetchNotifications({ silent: true });
  }, [fetchNotifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      if (!token || user?.role !== "student") {
        return false;
      }

      const previousNotifications = notifications;
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );

      try {
        await notificationApi.markAsRead(token, id);
        return true;
      } catch (markError) {
        setNotifications(previousNotifications);
        throw markError;
      }
    },
    [notifications, token, user?.role],
  );

  const markAllAsRead = useCallback(async () => {
    if (!token || user?.role !== "student") {
      return false;
    }

    const previousNotifications = notifications;
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true })),
    );

    try {
      await notificationApi.markAllAsRead(token);
      return true;
    } catch (markError) {
      setNotifications(previousNotifications);
      throw markError;
    }
  }, [notifications, token, user?.role]);

  useEffect(() => {
    if (!isAuthenticated || !token || user?.role !== "student") {
      setNotifications([]);
      return;
    }

    void fetchNotifications();

    const intervalId = window.setInterval(() => {
      void fetchNotifications({ silent: true });
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [fetchNotifications, isAuthenticated, token, user?.role]);

  return {
    notifications,
    unreadCount,
    loading,
    refreshing,
    error,
    fetchNotifications,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
  };
}
