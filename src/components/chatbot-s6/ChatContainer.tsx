// components/ChatContainer.tsx
"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

type ChatContainerProps = {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
};

export default function ChatContainer({
  title,
  subtitle,
  badge,
  children,
}: ChatContainerProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-2">
          <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {title}
              </h2>
              {badge && (
                <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="space-y-4">{children}</div>
    </div>
  );
}