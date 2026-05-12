// components/progress-tracker/NextSteps.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  secondaryHint: string;
};

export default function NextSteps({
  title,
  description,
  actionLabel,
  actionHref,
  secondaryHint,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h4>

      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-800 mb-1">{title}</div>
          <div className="text-sm text-gray-700 mb-2">{description}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push(actionHref)}
              className="flex-1 rounded-md px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-sm text-gray-700">
          {secondaryHint}
        </div>
      </div>
    </div>
  );
}
