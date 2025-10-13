// components/ProgressSection.tsx
"use client";

import React from "react";

type ProgressSectionProps = {
  label: string;
  percentage: number;
};

export default function ProgressSection({
  label,
  percentage,
}: ProgressSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}