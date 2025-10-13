// components/TabNavigation.tsx
"use client";

import React from "react";
import { FileText, Wand2, ClipboardCheck } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const tabs: Tab[] = [
  {
    id: "questionnaire",
    label: "Questionnaire",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "ai-generation",
    label: "AI Generation",
    icon: <Wand2 className="w-4 h-4" />,
  },
  {
    id: "review-edit",
    label: "Review & Edit",
    icon: <ClipboardCheck className="w-4 h-4" />,
  },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap
                border-b-2 transition-all duration-200
                ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}