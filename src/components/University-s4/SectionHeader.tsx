// components/SectionHeader.tsx
"use client";

import React from "react";

type SectionHeaderProps = {
  title: string;
  action?: React.ReactNode;
  className?: string;
};

export default function SectionHeader({
  title,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between mb-4 ${className}`}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        {title}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
}