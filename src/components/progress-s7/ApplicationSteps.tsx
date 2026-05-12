// components/progress-tracker/ApplicationSteps.tsx
"use client";

import React from "react";
import StepCard from "@/components/progress-s7/StepCard";
import type { ProgressStep } from "@/lib/progress-tracker";

type Props = {
  steps: ProgressStep[];
};

export default function ApplicationSteps({ steps }: Props) {
  return (
    <div className="space-y-4">
      {steps.map((s) => (
        <StepCard key={s.id} {...s} />
      ))}
    </div>
  );
}
