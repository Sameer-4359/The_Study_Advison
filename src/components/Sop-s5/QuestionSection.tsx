// // components/QuestionSection.tsx
// "use client";

// import React from "react";

// type Option = {
//   id: string;
//   label: string;
// };

// type QuestionSectionProps = {
//   questionNumber: number;
//   question: string;
//   options: Option[];
//   selectedOption?: string;
//   onSelect: (optionId: string) => void;
// };

// export default function QuestionSection({
//   questionNumber,
//   question,
//   options,
//   selectedOption,
//   onSelect,
// }: QuestionSectionProps) {
//   return (
//     <div className="mb-8">
//       {/* Question */}
//       <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
//         {questionNumber}. {question}
//       </h3>

//       {/* Options */}
//       <div className="space-y-3">
//         {options.map((option) => {
//           const isSelected = selectedOption === option.id;
//           return (
//             <button
//               key={option.id}
//               onClick={() => onSelect(option.id)}
//               className={`
//                 w-full text-left px-4 py-3.5 rounded-lg border-2 transition-all duration-200
//                 ${
//                   isSelected
//                     ? "border-blue-600 bg-blue-50"
//                     : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
//                 }
//               `}
//             >
//               <div className="flex items-center gap-3">
//                 {/* Radio Button */}
//                 <div
//                   className={`
//                   w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
//                   ${
//                     isSelected
//                       ? "border-blue-600"
//                       : "border-gray-300"
//                   }
//                 `}
//                 >
//                   {isSelected && (
//                     <div className="w-3 h-3 rounded-full bg-blue-600" />
//                   )}
//                 </div>

//                 {/* Option Label */}
//                 <span
//                   className={`text-sm sm:text-base ${
//                     isSelected ? "text-blue-900 font-medium" : "text-gray-700"
//                   }`}
//                 >
//                   {option.label}
//                 </span>
//               </div>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

type Option = {
  id: string;
  label: string;
};

type QuestionSectionProps = {
  questionNumber: number;
  question: string;
  options: Option[];
  selectedOption?: string;
  onSelect: (optionId: string) => void;
};

export default function QuestionSection({
  questionNumber,
  question,
  options,
  selectedOption,
  onSelect,
}: QuestionSectionProps) {
  return (
    <div className="mb-8 overflow-x-hidden"> {/* 👈 This line fixes the horizontal scroll */}
      {/* Question */}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        {questionNumber}. {question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left px-4 py-3.5 rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-3 overflow-hidden"> {/* 👈 ensures safe layout */}
                {/* Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? "border-blue-600" : "border-gray-300"}`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                  )}
                </div>

                {/* Option Label */}
                <span
                  className={`text-sm sm:text-base ${
                    isSelected ? "text-blue-900 font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
