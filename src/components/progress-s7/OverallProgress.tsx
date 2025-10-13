// components/progress-tracker/OverallProgress.tsx
"use client";

import React from "react";

export default function OverallProgress({ percent = 0, completedSteps = 0, totalSteps = 5 }: { percent?: number; completedSteps?: number; totalSteps?: number; }) {
  return (
    <div className="bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] p-5 rounded-xl text-white">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium">Overall Progress</h4>
          <p className="text-sm opacity-90">You're {percent}% complete</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{completedSteps}/{totalSteps}</div>
          <div className="text-xs opacity-90">Steps Completed</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
