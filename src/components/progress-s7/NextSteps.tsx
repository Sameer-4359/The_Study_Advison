// components/progress-tracker/NextSteps.tsx
"use client";

import React from "react";

export default function NextSteps() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h4>

      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="text-sm text-gray-700 mb-2">Complete document upload to unlock university recommendations</div>
          <div className="flex items-center gap-2">
            <button className="flex-1 rounded-md px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm">Continue Upload</button>
            <div className="p-2 bg-white border border-gray-200 rounded-md text-sm">Save</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-sm text-gray-700">
          Start exploring universities while your documents are being verified
        </div>
      </div>
    </div>
  );
}
