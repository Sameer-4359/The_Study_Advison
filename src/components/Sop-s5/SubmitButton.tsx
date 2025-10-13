// components/SubmitButton.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

type SubmitButtonProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function SubmitButton({
  onClick,
  label = "Generate SOP",
  disabled = false,
  loading = false,
}: SubmitButtonProps) {
  return (
    <div className="flex justify-end pt-6 border-t border-gray-200">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
          transition-all duration-200
          ${
            disabled || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
          }
        `}
      >
        <span>{loading ? "Processing..." : label}</span>
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}