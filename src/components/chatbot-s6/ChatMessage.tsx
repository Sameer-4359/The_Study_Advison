// components/ChatMessage.tsx
"use client";

import React from "react";
import { Bot, ThumbsUp, ThumbsDown } from "lucide-react";

type ChatMessageProps = {
  type: "bot" | "user";
  message: string;
  timestamp: string;
  showActions?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
};

export default function ChatMessage({
  type,
  message,
  timestamp,
  showActions = true,
  onLike,
  onDislike,
}: ChatMessageProps) {
  return (
    <div className="flex gap-3 sm:gap-4 mb-6">
      {/* Avatar */}
      {type === "bot" && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions & Timestamp */}
        {type === "bot" && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{timestamp}</span>
            {showActions && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onLike}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Like response"
                >
                  <ThumbsUp className="w-4 h-4 text-gray-500 hover:text-green-600" />
                </button>
                <button
                  onClick={onDislike}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Dislike response"
                >
                  <ThumbsDown className="w-4 h-4 text-gray-500 hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}