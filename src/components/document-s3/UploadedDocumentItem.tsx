// // components/UploadedDocumentItem.tsx
// "use client";

// import React from "react";
// import {
//   FileText,
//   CheckCircle2,
//   AlertCircle,
//   Eye,
//   Download,
//   Trash2,
// } from "lucide-react";

// type DocumentStatus = "verified" | "under-review" | "pending";

// type UploadedDocumentItemProps = {
//   fileName: string;
//   uploadDate: string;
//   fileSize: string;
//   status: DocumentStatus;
//   onView?: () => void;
//   onDownload?: () => void;
//   onDelete?: () => void;
// };

// const statusConfig = {
//   verified: {
//     label: "AI Verified",
//     bgColor: "bg-green-50",
//     textColor: "text-green-700",
//     icon: CheckCircle2,
//     iconColor: "text-green-600",
//   },
//   "under-review": {
//     label: "Under Review",
//     bgColor: "bg-yellow-50",
//     textColor: "text-yellow-700",
//     icon: AlertCircle,
//     iconColor: "text-yellow-600",
//   },
//   pending: {
//     label: "Pending",
//     bgColor: "bg-gray-50",
//     textColor: "text-gray-700",
//     icon: AlertCircle,
//     iconColor: "text-gray-600",
//   },
// };

// export default function UploadedDocumentItem({
//   fileName,
//   uploadDate,
//   fileSize,
//   status,
//   onView,
//   onDownload,
//   onDelete,
// }: UploadedDocumentItemProps) {
//   const config = statusConfig[status];
//   const StatusIcon = config.icon;

//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
//       {/* Left: File Info */}
//       <div className="flex items-start gap-3 flex-1 min-w-0">
//         {/* File Icon */}
//         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
//           <FileText className="w-5 h-5 text-gray-600" />
//         </div>

//         {/* File Details */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <h4 className="text-sm font-semibold text-gray-900 truncate">
//               {fileName}
//             </h4>
//             <StatusIcon className={`w-4 h-4 flex-shrink-0 ${config.iconColor}`} />
//           </div>
//           <p className="text-xs text-gray-600">
//             Uploaded: {uploadDate} · Size: {fileSize}
//           </p>
//         </div>
//       </div>

//       {/* Right: Status Badge & Actions */}
//       <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
//         {/* Status Badge */}
//         <span
//           className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap`}
//         >
//           {config.label}
//         </span>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-1">
//           {/* View */}
//           <button
//             onClick={onView}
//             className="p-2 hover:bg-white rounded-lg transition-colors"
//             aria-label="View document"
//           >
//             <Eye className="w-4 h-4 text-gray-600" />
//           </button>

//           {/* Download */}
//           <button
//             onClick={onDownload}
//             className="p-2 hover:bg-white rounded-lg transition-colors"
//             aria-label="Download document"
//           >
//             <Download className="w-4 h-4 text-gray-600" />
//           </button>

//           {/* Delete */}
//           <button
//             onClick={onDelete}
//             className="p-2 hover:bg-red-50 rounded-lg transition-colors"
//             aria-label="Delete document"
//           >
//             <Trash2 className="w-4 h-4 text-red-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
//after data



"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

export type DocumentStatus = "verified" | "under-review" | "pending";

export type UploadedDocumentItemProps = {
  fileName: string;
  uploadDate: string;
  fileSize: string;
  status: DocumentStatus;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
};

const statusConfig = {
  verified: {
    label: "AI Verified",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    icon: CheckCircle2,
    iconColor: "text-green-600",
  },
  "under-review": {
    label: "Under Review",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    icon: AlertCircle,
    iconColor: "text-yellow-600",
  },
  pending: {
    label: "Pending",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    icon: AlertCircle,
    iconColor: "text-gray-600",
  },
};

export default function UploadedDocumentItem({
  fileName,
  uploadDate,
  fileSize,
  status,
  onView,
  onDownload,
  onDelete,
}: UploadedDocumentItemProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
      {/* Left: File Info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {fileName}
            </h4>
            <StatusIcon className={`w-4 h-4 flex-shrink-0 ${config.iconColor}`} />
          </div>
          <p className="text-xs text-gray-600">
            Uploaded: {uploadDate}
          </p>
        </div>
      </div>

      {/* Right: Status Badge & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        <span
          className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap`}
        >
          {config.label}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={onView}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            aria-label="View document"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDownload}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            aria-label="Download document"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete document"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
