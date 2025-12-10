
"use client";

import React from "react";
import { buttonLabels } from "@/data/university-s4-data/buttonLabels"; // 👈 labels/data alag file se import

type EnableEmailButtonProps = {
  onClick?: () => void;
  labelKey?: keyof typeof buttonLabels;
};

export default function EnableEmailButton({
  onClick,
  labelKey = "enableEmail",
}: EnableEmailButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
    >
      {buttonLabels[labelKey]}
    </button>
  );
}
