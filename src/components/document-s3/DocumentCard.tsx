// "use client";

// import React from "react";
// import { CheckCircle2, Upload, X } from "lucide-react";

// export type DocumentCardProps = {
//   icon?: React.ReactNode;
//   title: string;
//   subtitle: string;
//   description: string;
//   status: "uploaded" | "pending" | "required";
//   onUpload?: () => void;
//   stagedFile?: File | null;
//   onRemoveStaged?: () => void;
//   uploading?: boolean;
// };

// export default function DocumentCard({
//   icon,
//   title,
//   subtitle,
//   description,
//   status,
//   onUpload,
//   stagedFile,
//   onRemoveStaged,
//   uploading = false,
// }: DocumentCardProps) {
//   const isUploaded = status === "uploaded";

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-start gap-3 flex-1">
//           {/* Icon */}
//           <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//             {icon}
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

//       {/* If a file is staged show its name + remove (X) */}
//       {stagedFile ? (
//         <div className="flex items-center justify-between gap-2 mb-3">
//           <div className="flex items-center gap-2">
//             <div className="rounded-md bg-gray-100 px-3 py-2 text-sm truncate max-w-[200px]">
//               {stagedFile.name}
//             </div>
//             <span className="text-xs text-gray-500">
//               {(stagedFile.size / 1024 / 1024).toFixed(2)} MB
//             </span>
//           </div>
//           <button
//             onClick={onRemoveStaged}
//             title="Remove staged file"
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>
//       ) : null}

//       {/* Upload Button or Status */}
//       {isUploaded ? (
//         <div className="flex items-center gap-2 text-gray-600">
//           <Upload className="w-4 h-4" />
//           <span className="text-sm font-medium">Uploaded</span>
//         </div>
//       ) : (
//         <button
//           onClick={onUpload}
//           disabled={uploading}
//           className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
//         >
//           {uploading ? (
//             <svg
//               className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8H4z"
//               ></path>
//             </svg>
//           ) : (
//             <Upload className="w-4 h-4" />
//           )}
//           {stagedFile ? (uploading ? "Uploading..." : "Upload Document") : "Upload Document"}
//         </button>
//       )}
//     </div>
//   );
// }




// src/components/document-s3/DocumentCard.tsx
"use client";

import React from "react";
import { CheckCircle2, Upload, X, RefreshCw } from "lucide-react";

export type DocumentCardProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  status: "uploaded" | "pending" | "required";
  onUpload?: () => void;
  stagedFile?: File | null;
  onRemoveStaged?: () => void;
  uploading?: boolean;
  isUpdate?: boolean;
};

export default function DocumentCard({
  icon,
  title,
  subtitle,
  description,
  status,
  onUpload,
  stagedFile,
  onRemoveStaged,
  uploading = false,
  isUpdate = false,
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
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {subtitle}
              </span>
              {isUpdate && isUploaded && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  Update Available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Icon */}
        {isUploaded && !isUpdate && (
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
        )}
        {isUploaded && isUpdate && (
          <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0" />
        )}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-4">{description}</p>

      {/* If a file is staged show its name + remove (X) */}
      {stagedFile ? (
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-gray-100 px-3 py-2 text-sm truncate max-w-[200px]">
              {stagedFile.name}
            </div>
            <span className="text-xs text-gray-500">
              {(stagedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <button
            onClick={onRemoveStaged}
            title="Remove staged file"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ) : null}

      {/* Upload/Update Button */}
      <button
        onClick={onUpload}
        disabled={uploading}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 ${
          isUploaded && isUpdate
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : isUploaded
            ? 'bg-green-100 hover:bg-green-200 text-green-700'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        {uploading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            {isUpdate ? "Updating..." : "Uploading..."}
          </>
        ) : (
          <>
            {isUpdate ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Update Document
              </>
            ) : isUploaded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Uploaded
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {stagedFile ? "Upload Document" : "Upload Document"}
              </>
            )}
          </>
        )}
      </button>

      {/* Helper text for updates */}
      {isUploaded && isUpdate && !stagedFile && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Click to upload a new version
        </p>
      )}
    </div>
  );
}