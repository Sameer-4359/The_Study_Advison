// components/progress-tracker/StatsCard.tsx
"use client";

import React from "react";

export default function StatsCard({ overall = 0, stepsCompleted = 0, daysActive = 0 }: { overall?: number; stepsCompleted?: number; daysActive?: number; }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Your Stats</h4>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-indigo-600">{overall}%</div>
          <div className="text-xs text-gray-500">Overall Progress</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">{stepsCompleted}</div>
          <div className="text-xs text-gray-500">Steps Completed</div>
          <div className="mt-2 text-sm font-semibold text-gray-800">{daysActive}</div>
          <div className="text-xs text-gray-500">Days Active</div>
        </div>
      </div>
    </div>
  );
}
