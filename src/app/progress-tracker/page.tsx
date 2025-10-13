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

export default function ProgressTrackerPage() {
  return (
    <ProgressLayout>
    <div className="pt-10"></div>
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 lg:p-10">
      <ProgressHeader title="Progress Tracker" breadcrumb={[{ label: "Dashboard", href: "/dashboard" }, { label: "Progress Tracker" }]} description="Track your journey to studying abroad" />

      <div className="mt-6">
        <OverallProgress percent={35} completedSteps={1} totalSteps={5} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Main: steps (span 2 on large) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Application Steps</h3>
          <ApplicationSteps />
        </div>

        {/* Right widgets */}
        <aside className="space-y-4">
          <Milestones />
          <StatsCard overall={35} stepsCompleted={1} daysActive={3} />
          <NextSteps />
        </aside>
      </div>
    </div>
    </ProgressLayout>
  );
}
