// app/progress-tracker/page.tsx
"use client";

import React from "react";
import ProgressHeader from "@/components/progress-s7/ProgressHeader";
import OverallProgress from "@/components/progress-s7/OverallProgress";
import ApplicationSteps from "@/components/progress-s7/ApplicationSteps";
import Milestones from "@/components/progress-s7/Milestones";
import StatsCard from "@/components/progress-s7/StatsCard";
import NextSteps from "@/components/progress-s7/NextSteps";
import ProgressLayout from "@/components/layouts/ProgressLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useStudentDashboardUpdates } from "@/hooks/useStudentDashboardUpdates";
import { buildProgressTrackerViewModel } from "@/lib/progress-tracker";

export default function ProgressTrackerPage() {
  const { metrics, loading, firstActivityAt, latestActivityAt } =
    useStudentDashboardUpdates();

  const viewModel = buildProgressTrackerViewModel(metrics, {
    firstActivityAt,
    latestActivityAt,
  });

  return (
    <ProtectedRoute requiredRole="student">
      <ProgressLayout>
        <div className="pt-10"></div>
        <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 lg:p-10">
          <ProgressHeader
            title="Progress Tracker"
            breadcrumb={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Progress Tracker" },
            ]}
            description="Track your journey to studying abroad"
          />

          <div className="mt-6">
            <OverallProgress
              percent={viewModel.overallPercent}
              completedSteps={viewModel.completedSteps}
              totalSteps={viewModel.totalSteps}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left / Main: steps (span 2 on large) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Application Steps</h3>
              {loading ? (
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
                  Loading live progress...
                </div>
              ) : (
                <ApplicationSteps steps={viewModel.steps} />
              )}
            </div>

            {/* Right widgets */}
            <aside className="space-y-4">
              <Milestones items={viewModel.milestones} />
              <StatsCard
                overall={viewModel.stats.overall}
                stepsCompleted={viewModel.stats.stepsCompleted}
                daysActive={viewModel.stats.daysActive}
              />
              <NextSteps
                title={viewModel.nextStepTitle}
                description={viewModel.nextStepDescription}
                actionLabel={viewModel.nextStepActionLabel}
                actionHref={viewModel.nextStepActionHref}
                secondaryHint={viewModel.secondaryHint}
              />
            </aside>
          </div>
        </div>
      </ProgressLayout>
    </ProtectedRoute>
  );
}
