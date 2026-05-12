// src/lib/api/notificationApi.ts

import { API_BASE_URL } from "@/lib/apiConfig";

export type NotificationType =
  | "recommendation_ready"
  | "counselor_message"
  | "application_update"
  | "system_alert";

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead: boolean;
}

type ApiError = {
  message?: string;
  status?: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return undefined as T;
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const error = (await response.json()) as ApiError;
    return error.message || "Request failed";
  } catch {
    return "Request failed";
  }
}

export const notificationApi = {
  async getNotifications(token: string): Promise<StudentNotification[]> {
    const response = await fetch(`${API_BASE_URL}/student/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return await parseResponse<StudentNotification[]>(response);
  },

  async markAsRead(token: string, id: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/student/notifications/${id}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
  },

  async markAllAsRead(token: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/student/notifications/read-all`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
  },
};
