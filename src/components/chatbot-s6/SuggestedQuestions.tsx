// components/SuggestedQuestions.tsx
"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

type SuggestedQuestionsProps = {
  questions: string[];
  onQuestionClick: (question: string) => void;
};

export default function SuggestedQuestions({
  questions,
  onQuestionClick,
}: SuggestedQuestionsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Suggested Questions
        </h3>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 mb-4">
        Click to ask common questions
      </p>

      {/* Questions List */}
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-sm text-gray-800"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}