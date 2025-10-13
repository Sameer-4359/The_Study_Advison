// // components/DocumentCard.tsx
// "use client";

// import React from "react";
// import { FileText, CheckCircle2, Upload } from "lucide-react";

// type DocumentCardProps = {
//   icon?: React.ReactNode;
//   title: string;
//   subtitle: string;
//   description: string;
//   status: "uploaded" | "pending" | "required";
//   onUpload?: () => void;
// };

// export default function DocumentCard({
//   icon,
//   title,
//   subtitle,
//   description,
//   status,
//   onUpload,
// }: DocumentCardProps) {
//   const isUploaded = status === "uploaded";
//   const isPending = status === "pending";

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-start gap-3 flex-1">
//           {/* Icon */}
//           <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//             {icon || <FileText className="w-5 h-5 text-blue-600" />}
//           </div>
//           {/* Title and Subtitle */}
//           <div className="flex-1">
//             <h3 className="text-base sm:text-lg font-semibold text-gray-900">
//               {title}
//             </h3>
//             <span className="text-xs sm:text-sm text-gray-600 font-medium">
//               {subtitle}
//             </span>
//           </div>
//         </div>
//         {/* Status Icon */}
//         {isUploaded && (
//           <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
//         )}
//       </div>

//       {/* Description */}
//       <p className="text-xs sm:text-sm text-gray-600 mb-4">{description}</p>

//       {/* Upload Button or Status */}
//       {isUploaded ? (
//         <div className="flex items-center gap-2 text-gray-600">
//           <Upload className="w-4 h-4" />
//           <span className="text-sm font-medium">Uploaded</span>
//         </div>
//       ) : (
//         <button
//           onClick={onUpload}
//           className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
//         >
//           <Upload className="w-4 h-4" />
//           Upload Document
//         </button>
//       )}
//     </div>
//   );
// }
//after data

"use client";

import React from "react";
import { CheckCircle2, Upload } from "lucide-react";

export type DocumentCardProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  status: "uploaded" | "pending" | "required";
  onUpload?: () => void;
};

export default function DocumentCard({
  icon,
  title,
  subtitle,
  description,
  status,
  onUpload,
}: DocumentCardProps) {
  const isUploaded = status === "uploaded";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          {/* Title and Subtitle */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Status Icon */}
        {isUploaded && (
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
        )}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-4">{description}</p>

      {/* Upload Button or Status */}
      {isUploaded ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Upload className="w-4 h-4" />
          <span className="text-sm font-medium">Uploaded</span>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      )}
    </div>
  );
}
