// components/progress-tracker/ApplicationSteps.tsx
"use client";

import React from "react";
import StepCard from "@/components/progress-s7/StepCard";

export default function ApplicationSteps() {
  const steps: Array<React.ComponentProps<typeof StepCard>> = [
    {
      id: "profile",
      title: "Profile Setup",
      subtitle: "Complete your personal and academic information",
      duration: "15 minutes",
      progressPercent: 100,
      status: "completed",
      actionLabel: "Review",
    },
    {
      id: "documents",
      title: "Document Upload",
      subtitle: "Upload all required academic and personal documents",
      duration: "30 minutes",
      progressPercent: 75,
      status: "in-progress",
      actionLabel: "Continue",
    },
    {
      id: "recommendations",
      title: "University Recommendations",
      subtitle: "Get personalized university recommendations",
      duration: "20 minutes",
      progressPercent: 0,
      status: "pending",
      actionLabel: "Start",
    },
    {
      id: "sop",
      title: "Statement of Purpose",
      subtitle: "Create your SOP using our AI writer",
      duration: "45 minutes",
      progressPercent: 0,
      status: "locked",
      actionLabel: "Locked",
    },
    {
      id: "ai",
      title: "AI Consultation",
      subtitle: "Get answers to your questions via AI chatbot",
      duration: "Ongoing",
      progressPercent: 0,
      status: "pending",
      actionLabel: "Start",
    },
  ];

  return (
    <div className="space-y-4">
      {steps.map((s) => (
        <StepCard key={s.id} {...s} />
      ))}
    </div>
  );
}
