// components/QuickStats.tsx
"use client";

import React from "react";

type Stat = {
  value: string;
  label: string;
};

type QuickStatsProps = {
  stats?: Stat[];
};

const defaultStats: Stat[] = [
  { value: "30", label: "Partnered Universities" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Support" },
];

export default function QuickStats({ stats = defaultStats }: QuickStatsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Quick Stats
      </h3>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}