// components/progress-tracker/StepCard.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  progressPercent?: number;
  status?: "completed" | "in-progress" | "pending" | "locked";
  actionLabel?: string;
  href?: string;
};

export default function StepCard({
  title,
  subtitle,
  progressPercent = 0,
  status = "pending",
  actionLabel,
  href,
}: Props) {
  const router = useRouter();
  const isDisabled = status === "locked" || !href;

  const bgByStatus = {
    completed: "bg-emerald-50 border-emerald-200",
    "in-progress": "bg-blue-50 border-blue-100",
    pending: "bg-white border-gray-100",
    locked: "bg-red-50 border-red-100",
  }[status];

  const actionStyle = {
    completed: "bg-white border border-gray-200 text-gray-700",
    "in-progress": "bg-black text-white",
    pending: "bg-black text-white",
    locked: "bg-gray-200 text-gray-500 cursor-not-allowed",
  }[status];

  const handleAction = () => {
    if (isDisabled) return;
    router.push(href);
  };

  return (
    <div className={`rounded-xl border ${bgByStatus} p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="hidden sm:block">
            <button
              type="button"
              disabled={isDisabled}
              onClick={handleAction}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${actionStyle}`}
            >
              {actionLabel || "Start"}
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex items-center justify-end text-xs text-gray-500 mt-2">
            <div className="inline-flex items-center gap-2">
              {status === "completed" && <span className="text-emerald-600 text-xs font-semibold px-2 py-0.5 bg-emerald-100 rounded-md">Completed</span>}
              {status === "in-progress" && <span className="text-blue-600 text-xs font-semibold px-2 py-0.5 bg-blue-100 rounded-md">In Progress</span>}
              {status === "locked" && <span className="text-red-600 text-xs font-semibold px-2 py-0.5 bg-red-100 rounded-md">Blocked</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile action button */}
      <div className="sm:hidden w-full">
        <button
          type="button"
          disabled={isDisabled}
          onClick={handleAction}
          className={`w-full mt-2 py-2 rounded-md text-sm font-semibold ${actionStyle}`}
        >
          {actionLabel || "Start"}
        </button>
      </div>
    </div>
  );
}
