"use client";
import React from "react";

const ProgressBar = () => {
  return (
    <div className="w-full bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-800">Profile Completion</span>
        <span className="text-sm font-semibold text-green-600">100%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
