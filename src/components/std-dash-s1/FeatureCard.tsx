// // components/FeatureCard.tsx
// "use client";

// import React from "react";
// import { LucideIcon } from "lucide-react";

// type FeatureCardProps = {
//   icon: LucideIcon;
//   iconBgColor: string;
//   iconColor: string;
//   title: string;
//   description: string;
//   progress?: number;
//   progressColor?: string;
//   statusIcon?: LucideIcon;
//   statusIconColor?: string;
//   leftButton: {
//     text: string;
//     bgColor: string;
//     textColor: string;
//   };
//   rightButton: {
//     text: string;
//     onClick?: () => void;
//   };
//   onClick?: () => void;
// };

// export default function FeatureCard({
//   icon: Icon,
//   iconBgColor,
//   iconColor,
//   title,
//   description,
//   progress,
//   progressColor,
//   statusIcon: StatusIcon,
//   statusIconColor,
//   leftButton,
//   rightButton,
//   onClick,
// }: FeatureCardProps) {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer relative"
//     >
//       {/* Status Icon - Top Right */}
//       {StatusIcon && (
//         <div className="absolute top-6 right-6">
//           <div
//             className="w-8 h-8 rounded-full flex items-center justify-center"
//             style={{ backgroundColor: `${statusIconColor}20` }}
//           >
//             <StatusIcon
//               className="w-4 h-4"
//               style={{ color: statusIconColor }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-start gap-4 mb-4">
//         <div
//           className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
//           style={{ backgroundColor: iconBgColor }}
//         >
//           <Icon className="w-6 h-6" style={{ color: iconColor }} />
//         </div>
//         <div className="flex-1 pr-8">
//           <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-600 mt-1">{description}</p>
//         </div>
//       </div>

//       {/* Progress Bar (if provided) */}
//       {progress !== undefined && (
//         <div className="mb-4">
//           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full rounded-full transition-all duration-500"
//               style={{
//                 width: `${progress}%`,
//                 backgroundColor: progressColor,
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex items-center justify-between gap-3 mt-6">
//         <span
//           className="px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{
//             backgroundColor: leftButton.bgColor,
//             color: leftButton.textColor,
//           }}
//         >
//           {leftButton.text}
//         </span>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             rightButton.onClick?.();
//           }}
//           className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
//         >
//           {rightButton.text}
//         </button>
//       </div>
//     </div>
//   );
// }

// after data folder
"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { featureCardData } from "@/data/std-dash-s1-data/featureCardData"; // Import separated data

type FeatureCardProps = {
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  title?: string;
  description?: string;
  progress?: number;
  progressColor?: string;
  statusIcon?: LucideIcon;
  statusIconColor?: string;
  leftButton?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  rightButton?: {
    text: string;
    onClick?: () => void;
  };
  onClick?: () => void;
};

export default function FeatureCard({
  icon: Icon,
  iconBgColor = featureCardData.defaultIconBgColor,
  iconColor = featureCardData.defaultIconColor,
  title = featureCardData.sampleFeature.title,
  description = featureCardData.sampleFeature.description,
  progress = featureCardData.sampleFeature.progress,
  progressColor = featureCardData.defaultProgressColor,
  statusIcon: StatusIcon = featureCardData.sampleFeature.statusIcon,
  statusIconColor = featureCardData.defaultStatusIconColor,
  leftButton = featureCardData.sampleFeature.leftButton,
  rightButton = featureCardData.sampleFeature.rightButton,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer relative"
    >
      {/* Status Icon - Top Right */}
      {StatusIcon && (
        <div className="absolute top-6 right-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${statusIconColor}20` }}
          >
            <StatusIcon
              className="w-4 h-4"
              style={{ color: statusIconColor }}
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        <div className="flex-1 pr-8">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-between gap-3 mt-6">
        <span
          className="px-4 py-2 rounded-lg text-sm font-semibold"
          style={{
            backgroundColor: leftButton.bgColor,
            color: leftButton.textColor,
          }}
        >
          {leftButton.text}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            rightButton.onClick?.();
          }}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          {rightButton.text}
        </button>
      </div>
    </div>
  );
}
