// app/dashboard/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import WelcomeBanner from "@/components/std-dash-s1/WelcomeBanner";
import FeatureCard from "@/components/std-dash-s1/FeatureCard";
import RecentUpdates from "@/components/std-dash-s1/RecentUpdates";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useStudentDashboardUpdates } from "@/hooks/useStudentDashboardUpdates";
import ProfileOverview from "@/components/dashboard/ProfileOverview";
import {
  UserCircle,
  Upload,
  Target,
  FileText,
  ClipboardList,
  Bell,
  Check,
  Edit,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { updates, metrics, loading } = useStudentDashboardUpdates();

  const getProfileSetupStatus = () => {
    if (metrics.profileCompletion >= 90) {
      return {
        leftButtonText: "Completed",
        leftButtonBg: "#D1FAE5",
        leftButtonTextColor: "#059669",
        progressColor: "#10B981",
        statusIcon: Check,
        statusIconColor: "#10B981",
      };
    } else if (metrics.profileCompletion > 0) {
      return {
        leftButtonText: "In Progress",
        leftButtonBg: "#DBEAFE",
        leftButtonTextColor: "#2563EB",
        progressColor: "#3B82F6",
        statusIcon: Edit,
        statusIconColor: "#3B82F6",
      };
    } else {
      return {
        leftButtonText: "Not Started",
        leftButtonBg: "#F3F4F6",
        leftButtonTextColor: "#6B7280",
        progressColor: "#9CA3AF",
        statusIcon: Clock,
        statusIconColor: "#6B7280",
      };
    }
  };

  const getDocumentStatus = () => {
    if (metrics.documentProgress >= 100) {
      return {
        leftButtonText: "Completed",
        leftButtonBg: "#D1FAE5",
        leftButtonTextColor: "#059669",
        progressColor: "#10B981",
        statusIcon: Check,
        statusIconColor: "#10B981",
      };
    }

    if (metrics.documentProgress > 0) {
      return {
        leftButtonText: "In Progress",
        leftButtonBg: "#DBEAFE",
        leftButtonTextColor: "#2563EB",
        progressColor: "#3B82F6",
        statusIcon: Edit,
        statusIconColor: "#3B82F6",
      };
    }

    return {
      leftButtonText: "Not Started",
      leftButtonBg: "#F3F4F6",
      leftButtonTextColor: "#6B7280",
      progressColor: "#9CA3AF",
      statusIcon: Clock,
      statusIconColor: "#6B7280",
    };
  };

  const getSopStatus = () => {
    if (metrics.sopStatus === "APPROVED") {
      return {
        text: "Approved",
        bgColor: "#D1FAE5",
        textColor: "#059669",
        icon: Check,
        iconColor: "#10B981",
      };
    }

    if (
      metrics.sopStatus === "UNDER_REVIEW" ||
      metrics.sopStatus === "SUBMITTED"
    ) {
      return {
        text: "In Review",
        bgColor: "#DBEAFE",
        textColor: "#2563EB",
        icon: Edit,
        iconColor: "#3B82F6",
      };
    }

    if (metrics.sopStatus === "REVISION_REQUESTED") {
      return {
        text: "Revision Needed",
        bgColor: "#FEF3C7",
        textColor: "#B45309",
        icon: Clock,
        iconColor: "#F59E0B",
      };
    }

    return {
      text: metrics.sopStatus === "DRAFT" ? "Draft Saved" : "Not Started",
      bgColor: "#F3F4F6",
      textColor: "#6B7280",
      icon: Clock,
      iconColor: "#6B7280",
    };
  };

  const profileStatus = getProfileSetupStatus();
  const documentStatus = getDocumentStatus();
  const sopStatus = getSopStatus();

  return (
    <ProtectedRoute requiredRole="student">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Profile Overview */}
        <ProfileOverview />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Profile Setup */}
          <FeatureCard
            icon={UserCircle}
            iconBgColor="#DBEAFE"
            iconColor="#3B82F6"
            title="Profile Setup"
            description="Complete your personal and academic information"
            progress={metrics.profileCompletion}
            progressColor={profileStatus.progressColor}
            statusIcon={profileStatus.statusIcon}
            statusIconColor={profileStatus.statusIconColor}
            leftButton={{
              text: profileStatus.leftButtonText,
              bgColor: profileStatus.leftButtonBg,
              textColor: profileStatus.leftButtonTextColor,
            }}
            rightButton={{
              text: metrics.profileCompletion > 0 ? "Review" : "Start",
              onClick: () => router.push("/profile-setup"),
            }}
            onClick={() => router.push("/profile-setup")}
          />

          {/* Document Upload */}
          <FeatureCard
            icon={Upload}
            iconBgColor="#DBEAFE"
            iconColor="#3B82F6"
            title="Document Upload"
            description="Upload certificates, transcripts, and passport"
            progress={metrics.documentProgress}
            progressColor={documentStatus.progressColor}
            statusIcon={documentStatus.statusIcon}
            statusIconColor={documentStatus.statusIconColor}
            leftButton={{
              text: documentStatus.leftButtonText,
              bgColor: documentStatus.leftButtonBg,
              textColor: documentStatus.leftButtonTextColor,
            }}
            rightButton={{
              text: metrics.documentProgress > 0 ? "Continue" : "Start",
              onClick: () => router.push("/document-upload"),
            }}
            onClick={() => router.push("/document-upload")}
          />

          {/* Application Readiness */}
          <FeatureCard
            icon={Target}
            iconBgColor="#DCFCE7"
            iconColor="#16A34A"
            title="Application Readiness"
            description="Combined readiness from profile, documents, and SOP progress"
            statusIcon={metrics.readinessScore >= 80 ? Check : Edit}
            statusIconColor={
              metrics.readinessScore >= 80 ? "#16A34A" : "#3B82F6"
            }
            leftButton={{
              text: `${metrics.readinessScore}% Ready`,
              bgColor: metrics.readinessScore >= 80 ? "#DCFCE7" : "#DBEAFE",
              textColor: metrics.readinessScore >= 80 ? "#15803D" : "#2563EB",
            }}
            rightButton={{
              text: "Explore",
              onClick: () => router.push("/university-recommendations"),
            }}
            onClick={() => router.push("/university-recommendations")}
          />

          {/* Pending Checklist */}
          <FeatureCard
            icon={ClipboardList}
            iconBgColor="#FEF3C7"
            iconColor="#F59E0B"
            title="Pending Checklist"
            description="Track remaining tasks before recommendations and applications"
            statusIcon={Clock}
            statusIconColor="#F59E0B"
            leftButton={{
              text: `${metrics.pendingActionCount} Pending`,
              bgColor: "#FEF3C7",
              textColor: "#F59E0B",
            }}
            rightButton={{
              text: metrics.nextActionLabel,
              onClick: () => router.push(metrics.nextActionPath),
            }}
            onClick={() => router.push(metrics.nextActionPath)}
          />

          {/* SOP Review Status */}
          <FeatureCard
            icon={FileText}
            iconBgColor="#EEF2FF"
            iconColor="#4F46E5"
            title="SOP Review Status"
            description="Monitor your current SOP lifecycle and review stage"
            statusIcon={sopStatus.icon}
            statusIconColor={sopStatus.iconColor}
            leftButton={{
              text: sopStatus.text,
              bgColor: sopStatus.bgColor,
              textColor: sopStatus.textColor,
            }}
            rightButton={{
              text: "Open SOP",
              onClick: () => router.push("/ai-sop-writer"),
            }}
            onClick={() => router.push("/ai-sop-writer")}
          />

          {/* Activity Feed */}
          <FeatureCard
            icon={Bell}
            iconBgColor="#DBEAFE"
            iconColor="#3B82F6"
            title="Activity Feed"
            description="Live account updates from profile, documents, and SOP actions"
            statusIcon={Edit}
            statusIconColor="#3B82F6"
            leftButton={{
              text: `${updates.length} Updates`,
              bgColor: "#DBEAFE",
              textColor: "#2563EB",
            }}
            rightButton={{
              text: "View Feed",
              onClick: () => {
                const section = document.getElementById("recent-updates");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              },
            }}
            onClick={() => {
              const section = document.getElementById("recent-updates");
              section?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>

        {/* Recent Updates */}
        <section id="recent-updates">
          <RecentUpdates updates={updates} loading={loading} />
        </section>
      </div>
    </ProtectedRoute>
  );
}
