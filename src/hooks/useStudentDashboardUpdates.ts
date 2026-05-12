"use client";

import { useCallback, useEffect, useState } from "react";
import { documentApi, profileApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Update } from "@/data/std-dash-s1-data/recentUpdatesData";
import { BackendDocument } from "@/lib/types/document";
import { API_BASE_URL } from "@/lib/apiConfig";

export type SopStatus =
  | "NOT_STARTED"
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVISION_REQUESTED"
  | "APPROVED";

type SopRecord = {
  id: number;
  status: Exclude<SopStatus, "NOT_STARTED">;
  updatedAt?: string;
  createdAt?: string;
  submittedAt?: string;
};

export type DashboardMetrics = {
  profileCompletion: number;
  documentProgress: number;
  uploadedDocumentTypes: number;
  totalDocumentTypes: number;
  readinessScore: number;
  pendingActionCount: number;
  sopStatus: SopStatus;
  nextActionPath: string;
  nextActionLabel: string;
};

type HookState = {
  updates: Update[];
  metrics: DashboardMetrics;
  notificationCount: number;
  firstActivityAt?: string;
  latestActivityAt?: string;
};

type CachedState = {
  token: string;
  timestamp: number;
  state: HookState;
};


let dashboardUpdatesCache: CachedState | null = null;

const defaultMetrics: DashboardMetrics = {
  profileCompletion: 0,
  documentProgress: 0,
  uploadedDocumentTypes: 0,
  totalDocumentTypes: documentApi.getDisplayDocumentTypes().length,
  readinessScore: 0,
  pendingActionCount: 0,
  sopStatus: "NOT_STARTED",
  nextActionPath: "/profile-setup",
  nextActionLabel: "Complete Profile",
};

const defaultState: HookState = {
  updates: [
    {
      id: "welcome",
      message:
        "Welcome to The Study Advisor. Start by completing your profile.",
      time: "Just now",
      type: "info",
    },
  ],
  metrics: defaultMetrics,
  notificationCount: 0,
  firstActivityAt: undefined,
  latestActivityAt: undefined,
};

function getRelativeTime(dateInput?: string): string {
  if (!dateInput) {
    return "Just now";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function getLatestDocumentTimestamp(
  documents: BackendDocument[],
): string | undefined {
  if (!documents.length) return undefined;
  const sorted = [...documents].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sorted[0]?.createdAt;
}

function getEarliestDocumentTimestamp(
  documents: BackendDocument[],
): string | undefined {
  if (!documents.length) return undefined;
  const sorted = [...documents].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  return sorted[0]?.createdAt;
}

function getEarliestTimestamp(values: Array<string | undefined>): string | undefined {
  const valid = values
    .map((value) => (value ? new Date(value).getTime() : NaN))
    .filter((value) => !Number.isNaN(value));
  if (!valid.length) return undefined;
  return new Date(Math.min(...valid)).toISOString();
}

function getLatestTimestamp(values: Array<string | undefined>): string | undefined {
  const valid = values
    .map((value) => (value ? new Date(value).getTime() : NaN))
    .filter((value) => !Number.isNaN(value));
  if (!valid.length) return undefined;
  return new Date(Math.max(...valid)).toISOString();
}

function getSopScore(status: SopStatus): number {
  switch (status) {
    case "APPROVED":
      return 100;
    case "UNDER_REVIEW":
      return 80;
    case "SUBMITTED":
      return 70;
    case "REVISION_REQUESTED":
      return 40;
    case "DRAFT":
      return 25;
    default:
      return 0;
  }
}

function mapSopUpdate(status: SopStatus): Pick<Update, "message" | "type"> {
  switch (status) {
    case "APPROVED":
      return {
        message: "Your SOP has been approved.",
        type: "success",
      };
    case "UNDER_REVIEW":
      return {
        message: "Your SOP is under counselor review.",
        type: "info",
      };
    case "SUBMITTED":
      return {
        message: "You submitted your SOP successfully.",
        type: "info",
      };
    case "REVISION_REQUESTED":
      return {
        message: "SOP revision requested. Please update your draft.",
        type: "warning",
      };
    case "DRAFT":
      return {
        message: "Your SOP is saved as draft. Submit it for review.",
        type: "warning",
      };
    default:
      return {
        message: "Start your SOP draft to move forward.",
        type: "warning",
      };
  }
}

function buildDashboardState(params: {
  profileCompletion: number;
  missingProfileFields: number;
  profileUpdatedAt?: string;
  documents: BackendDocument[];
  sopStatus: SopStatus;
  sopUpdatedAt?: string;
  earliestActivityAt?: string;
  latestActivityAt?: string;
}): HookState {
  const {
    profileCompletion,
    missingProfileFields,
    profileUpdatedAt,
    documents,
    sopStatus,
    sopUpdatedAt,
    earliestActivityAt,
    latestActivityAt,
  } = params;

  const totalDocumentTypes = documentApi.getDisplayDocumentTypes().length;
  const uploadedDocumentTypes = new Set(documents.map((doc) => doc.type)).size;
  const documentProgress = documentApi.calculateProgress(documents);
  const missingDocuments = Math.max(
    totalDocumentTypes - uploadedDocumentTypes,
    0,
  );

  const profilePending = profileCompletion < 100;
  const documentsPending = missingDocuments > 0;
  const sopPending = !["SUBMITTED", "UNDER_REVIEW", "APPROVED"].includes(
    sopStatus,
  );

  const pendingActionCount = [
    profilePending,
    documentsPending,
    sopPending,
  ].filter(Boolean).length;

  const sopScore = getSopScore(sopStatus);
  const readinessScore = Math.round(
    (profileCompletion + documentProgress + sopScore) / 3,
  );

  let nextActionPath = "/university-recommendations";
  let nextActionLabel = "Explore Universities";

  if (profilePending) {
    nextActionPath = "/profile-setup";
    nextActionLabel = "Complete Profile";
  } else if (documentsPending) {
    nextActionPath = "/document-upload";
    nextActionLabel = "Upload Documents";
  } else if (sopPending) {
    nextActionPath = "/ai-sop-writer";
    nextActionLabel = "Finish SOP";
  }

  const latestDocumentTimestamp = getLatestDocumentTimestamp(documents);
  const sopUpdate = mapSopUpdate(sopStatus);

  const updatesWithTimestamp: Array<Update & { timestamp: number }> = [
    {
      id: "profile-update",
      message:
        profileCompletion >= 100
          ? "Profile setup is complete."
          : `Profile is ${profileCompletion}% complete. ${missingProfileFields} fields are still missing.`,
      time: getRelativeTime(profileUpdatedAt),
      type: profileCompletion >= 100 ? "success" : "warning",
      timestamp: profileUpdatedAt
        ? new Date(profileUpdatedAt).getTime()
        : Date.now() - 1000,
    },
    {
      id: "document-update",
      message:
        uploadedDocumentTypes === 0
          ? "No required documents uploaded yet."
          : missingDocuments === 0
            ? "All required documents are uploaded."
            : `${uploadedDocumentTypes}/${totalDocumentTypes} required document types uploaded.`,
      time: getRelativeTime(latestDocumentTimestamp),
      type:
        uploadedDocumentTypes === 0
          ? "warning"
          : missingDocuments === 0
            ? "success"
            : "info",
      timestamp: latestDocumentTimestamp
        ? new Date(latestDocumentTimestamp).getTime()
        : Date.now() - 2000,
    },
    {
      id: "sop-update",
      message: sopUpdate.message,
      time: getRelativeTime(sopUpdatedAt),
      type: sopUpdate.type,
      timestamp: sopUpdatedAt
        ? new Date(sopUpdatedAt).getTime()
        : Date.now() - 3000,
    },
    {
      id: "next-step",
      message:
        pendingActionCount > 0
          ? `Next recommended action: ${nextActionLabel}.`
          : "Everything is on track. You can start exploring university recommendations.",
      time: "Just now",
      type: pendingActionCount > 0 ? "info" : "success",
      timestamp: Date.now(),
    },
  ];

  updatesWithTimestamp.sort((a, b) => b.timestamp - a.timestamp);

  const updates: Update[] = updatesWithTimestamp.map(
    ({ timestamp, ...rest }) => rest,
  );

  return {
    updates,
    metrics: {
      profileCompletion,
      documentProgress,
      uploadedDocumentTypes,
      totalDocumentTypes,
      readinessScore,
      pendingActionCount,
      sopStatus,
      nextActionPath,
      nextActionLabel,
    },
    notificationCount: pendingActionCount,
    firstActivityAt: earliestActivityAt,
    latestActivityAt,
  };
}

export function useStudentDashboardUpdates() {
  const { token } = useAuth();
  const [state, setState] = useState<HookState>(defaultState);
  const [loading, setLoading] = useState(true);

  const loadUpdates = useCallback(async () => {
    if (!token) {
      setState(defaultState);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [completionResult, profileResult, documentsResult, sopResult] =
        await Promise.allSettled([
          profileApi.getProfileCompletion(token),
          profileApi.getProfile(token),
          documentApi.getDocuments(token),
          fetch(`${API_BASE_URL}/student/sop`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch SOP status");
            }
            return (await res.json()) as { sops?: SopRecord[] };
          }),
        ]);

      const profileCompletion =
        completionResult.status === "fulfilled"
          ? completionResult.value.completionPercentage || 0
          : 0;

      const missingProfileFields =
        completionResult.status === "fulfilled"
          ? completionResult.value.missingFields?.length || 0
          : 0;

      const profileUpdatedAt =
        profileResult.status === "fulfilled"
          ? profileResult.value.profile?.updatedAt
          : undefined;

      const documents =
        documentsResult.status === "fulfilled"
          ? documentsResult.value.documents || []
          : [];

      const earliestDocumentAt = getEarliestDocumentTimestamp(documents);
      const latestDocumentAt = getLatestDocumentTimestamp(documents);

      let sopStatus: SopStatus = "NOT_STARTED";
      let sopUpdatedAt: string | undefined;

      if (
        sopResult.status === "fulfilled" &&
        Array.isArray(sopResult.value.sops) &&
        sopResult.value.sops.length > 0
      ) {
        const latestSop = [...sopResult.value.sops].sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0).getTime() -
            new Date(a.updatedAt || a.createdAt || 0).getTime(),
        )[0];

        sopStatus = latestSop.status;
        sopUpdatedAt =
          latestSop.updatedAt || latestSop.submittedAt || latestSop.createdAt;
      }

      const nextState = buildDashboardState({
        profileCompletion,
        missingProfileFields,
        profileUpdatedAt,
        documents,
        sopStatus,
        sopUpdatedAt,
        earliestActivityAt: getEarliestTimestamp([
          profileUpdatedAt,
          earliestDocumentAt,
          sopUpdatedAt,
        ]),
        latestActivityAt: getLatestTimestamp([
          profileUpdatedAt,
          latestDocumentAt,
          sopUpdatedAt,
        ]),
      });

      dashboardUpdatesCache = {
        token,
        timestamp: Date.now(),
        state: nextState,
      };

      setState(nextState);
    } catch {
      setState(defaultState);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Initial load
    loadUpdates();

    // Poll for updates every 30 seconds
    const pollInterval = setInterval(() => {
      loadUpdates();
    }, 30 * 1000);

    return () => clearInterval(pollInterval);
  }, [loadUpdates]);

  return {
    updates: state.updates,
    metrics: state.metrics,
    notificationCount: state.notificationCount,
    firstActivityAt: state.firstActivityAt,
    latestActivityAt: state.latestActivityAt,
    loading,
    refresh: loadUpdates,
  };
}
