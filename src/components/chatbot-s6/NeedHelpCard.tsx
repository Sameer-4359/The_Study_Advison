// // components/NeedHelpCard.tsx
// "use client";

// import React from "react";
// import { HelpCircle } from "lucide-react";

// type NeedHelpCardProps = {
//   onContactClick: () => void;
// };

// export default function NeedHelpCard({ onContactClick }: NeedHelpCardProps) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-3">
//         <HelpCircle className="w-5 h-5 text-green-500" />
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900">
//           Need More Help?
//         </h3>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-600 mb-4">
//         For complex questions or personalized guidance, schedule a session with
//         our counselor.
//       </p>

//       {/* Button */}
//       <button
//         onClick={onContactClick}
//         className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors"
//       >
//         Contact Counselor
//       </button>
//     </div>
//   );
// }

// data component below
"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { needHelpData } from "../../data/needHelpData"; // 👈 import data

type NeedHelpCardProps = {
  onContactClick: () => void;
};

export default function NeedHelpCard({ onContactClick }: NeedHelpCardProps) {
  const { title, description, buttonText } = needHelpData;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-green-500" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Button */}
      <button
        onClick={onContactClick}
        className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
