import type { DashboardMetrics, SopStatus } from "@/hooks/useStudentDashboardUpdates";

export type ProgressStepStatus = "completed" | "in-progress" | "pending" | "locked";

export type ProgressStep = {
  id: string;
  title: string;
  subtitle: string;
  progressPercent: number;
  status: ProgressStepStatus;
  actionLabel: string;
  href?: string;
};

export type ProgressMilestone = {
  label: string;
  date?: string;
  status: "done" | "in-progress" | "pending";
};

export type ProgressTrackerViewModel = {
  overallPercent: number;
  completedSteps: number;
  totalSteps: number;
  steps: ProgressStep[];
  milestones: ProgressMilestone[];
  nextStepTitle: string;
  nextStepDescription: string;
  nextStepActionLabel: string;
  nextStepActionHref: string;
  secondaryHint: string;
  stats: {
    overall: number;
    stepsCompleted: number;
    daysActive: number;
  };
};

type ActivityMeta = {
  firstActivityAt?: string;
  latestActivityAt?: string;
};

function toDisplayDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function getSopProgress(status: SopStatus): number {
  switch (status) {
    case "APPROVED":
      return 100;
    case "UNDER_REVIEW":
      return 80;
    case "SUBMITTED":
      return 70;
    case "REVISION_REQUESTED":
      return 45;
    case "DRAFT":
      return 25;
    default:
      return 0;
  }
}

function getSopStatus(status: SopStatus): ProgressStepStatus {
  if (status === "APPROVED") return "completed";
  if (["UNDER_REVIEW", "SUBMITTED", "REVISION_REQUESTED", "DRAFT"].includes(status)) {
    return "in-progress";
  }
  return "pending";
}

function getSopActionLabel(status: SopStatus): string {
  if (status === "APPROVED") return "Review";
  if (status === "UNDER_REVIEW" || status === "SUBMITTED") return "Track";
  if (status === "REVISION_REQUESTED") return "Revise";
  if (status === "DRAFT") return "Continue";
  return "Start";
}

function calculateDaysActive(activity?: ActivityMeta): number {
  if (!activity?.firstActivityAt || !activity.latestActivityAt) return 0;
  const start = new Date(activity.firstActivityAt).getTime();
  const end = new Date(activity.latestActivityAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return 0;
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
}

export function buildProgressTrackerViewModel(
  metrics: DashboardMetrics,
  activity?: ActivityMeta,
): ProgressTrackerViewModel {
  const sopProgress = getSopProgress(metrics.sopStatus);
  const sopStatus = getSopStatus(metrics.sopStatus);

  const profileStep: ProgressStep = {
    id: "profile",
    title: "Profile Setup",
    subtitle: "Complete your personal and academic information",
    progressPercent: metrics.profileCompletion,
    status:
      metrics.profileCompletion >= 100
        ? "completed"
        : metrics.profileCompletion > 0
          ? "in-progress"
          : "pending",
    actionLabel: metrics.profileCompletion >= 100 ? "Review" : "Continue",
    href: "/profile-setup",
  };

  const documentsStep: ProgressStep = {
    id: "documents",
    title: "Document Upload",
    subtitle: "Upload all required academic and personal documents",
    progressPercent: metrics.documentProgress,
    status:
      metrics.documentProgress >= 100
        ? "completed"
        : metrics.documentProgress > 0
          ? "in-progress"
          : "pending",
    actionLabel: metrics.documentProgress >= 100 ? "Review" : "Continue",
    href: "/document-upload",
  };

  const recommendationsUnlocked =
    metrics.profileCompletion >= 100 &&
    metrics.documentProgress >= 100 &&
    ["SUBMITTED", "UNDER_REVIEW", "APPROVED"].includes(metrics.sopStatus);

  const recommendationsStep: ProgressStep = {
    id: "recommendations",
    title: "University Recommendations",
    subtitle: "Get personalized university recommendations",
    progressPercent: recommendationsUnlocked ? 100 : metrics.readinessScore,
    status: recommendationsUnlocked
      ? "completed"
      : metrics.readinessScore >= 35
        ? "in-progress"
        : "pending",
    actionLabel: recommendationsUnlocked ? "Explore" : "Prepare",
    href: "/university-recommendations",
  };

  const sopStep: ProgressStep = {
    id: "sop",
    title: "Statement of Purpose",
    subtitle: "Create your SOP using our AI writer",
    progressPercent: sopProgress,
    status: sopStatus,
    actionLabel: getSopActionLabel(metrics.sopStatus),
    href: "/ai-sop-writer",
  };

  const steps = [profileStep, documentsStep, recommendationsStep, sopStep];
  const completedSteps = steps.filter((step) => step.status === "completed").length;
  const totalSteps = steps.length;

  const milestones: ProgressMilestone[] = [
    {
      label: "Profile Created",
      date: toDisplayDate(activity?.firstActivityAt),
      status:
        metrics.profileCompletion >= 100
          ? "done"
          : metrics.profileCompletion > 0
            ? "in-progress"
            : "pending",
    },
    {
      label: "Documents Uploaded",
      date: metrics.documentProgress > 0 ? toDisplayDate(activity?.latestActivityAt) : undefined,
      status:
        metrics.documentProgress >= 100
          ? "done"
          : metrics.documentProgress > 0
            ? "in-progress"
            : "pending",
    },
    {
      label: "SOP Completed",
      date:
        sopStatus === "completed" || sopStatus === "in-progress"
          ? toDisplayDate(activity?.latestActivityAt)
          : undefined,
      status: sopStatus === "completed" ? "done" : sopStatus === "in-progress" ? "in-progress" : "pending",
    },
    {
      label: "Universities Shortlisted",
      status: recommendationsStep.status === "completed" ? "done" : recommendationsStep.status === "in-progress" ? "in-progress" : "pending",
    },
    {
      label: "Application Ready",
      status: metrics.pendingActionCount === 0 ? "done" : "pending",
    },
  ];

  return {
    overallPercent: metrics.readinessScore,
    completedSteps,
    totalSteps,
    steps,
    milestones,
    nextStepTitle: metrics.nextActionLabel,
    nextStepDescription:
      metrics.pendingActionCount > 0
        ? "Continue your next recommended action to improve your readiness score."
        : "Great progress. Continue refining your profile with counselor or AI guidance.",
    nextStepActionLabel: metrics.pendingActionCount > 0 ? metrics.nextActionLabel : "Open AI Chatbot",
    nextStepActionHref: metrics.pendingActionCount > 0 ? metrics.nextActionPath : "/ai-chatbot",
    secondaryHint:
      metrics.pendingActionCount > 0
        ? "You can still explore recommendations while finishing pending items."
        : "All core tasks are completed. You can now focus on applications and strategy.",
    stats: {
      overall: metrics.readinessScore,
      stepsCompleted: completedSteps,
      daysActive: calculateDaysActive(activity),
    },
  };
}
