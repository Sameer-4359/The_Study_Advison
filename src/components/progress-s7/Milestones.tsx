// components/progress-tracker/Milestones.tsx
"use client";

import React from "react";

export default function Milestones() {
  const items = [
    { label: "Profile Created", date: "2024-01-15", status: "done" },
    { label: "Documents Uploaded", date: "", status: "in-progress" },
    { label: "Universities Shortlisted", date: "", status: "pending" },
    { label: "SOP Completed", date: "", status: "pending" },
    { label: "Application Ready", date: "", status: "pending" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Milestones</h4>
      <p className="text-xs text-gray-500 mb-4">Key achievements in your journey</p>

      <ul className="space-y-3">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-1">
              <span className={`w-3 h-3 inline-block rounded-full ${it.status === "done" ? "bg-emerald-500" : it.status === "in-progress" ? "bg-blue-400" : "bg-gray-300"}`} />
            </div>
            <div className="flex-1 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="text-gray-800">{it.label}</div>
                {it.status === "done" && <div className="text-emerald-600 text-xs">✓</div>}
              </div>
              {it.date ? <div className="text-xs text-gray-400 mt-1">{it.date}</div> : <div className="text-xs text-gray-400 mt-1">Pending</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
