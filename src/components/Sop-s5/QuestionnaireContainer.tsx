// components/QuestionnaireContainer.tsx
"use client";

import React from "react";

type QuestionnaireContainerProps = {
  title: string;
  description: string;
  progress?: number;
  children: React.ReactNode;
};

export default function QuestionnaireContainer({
  title,
  description,
  progress,
  children,
}: QuestionnaireContainerProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {title}
          </h2>
          {progress !== undefined && (
            <span className="text-sm font-semibold text-gray-600">
              {progress}% Complete
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}