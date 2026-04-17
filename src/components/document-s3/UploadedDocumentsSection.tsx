// "use client";

// import React from "react";
// import UploadedDocumentItem from "./UploadedDocumentItem";

// export default function UploadedDocumentsSection({
//   documents = [],
//   onView,
//   onDownload,
//   onDelete,
// }: {
//   documents?: {
//     id: string;
//     fileName: string;
//     fileSize: number;
//     uploadDate: string;
//     status: "verified" | "under-review" | "pending";
//     fileUrl: string;
//   }[];
//   onView?: (id: string) => void;
//   onDownload?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//           Uploaded Documents
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">
//           View and manage your uploaded documents
//         </p>
//       </div>

//       {/* Documents List */}
//       <div className="space-y-3">
//         {documents.map((doc) => (
//           <UploadedDocumentItem
//             key={doc.id}
//             fileName={doc.fileName}
//             uploadDate={doc.uploadDate}
//             fileSize={`${(doc.fileSize / 1024 / 1024).toFixed(2)} MB`}
//             status={doc.status}
//             onView={() => onView?.(doc.id)}
//             onDownload={() => onDownload?.(doc.id)}
//             onDelete={() => onDelete?.(doc.id)}
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {documents.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-sm">No documents uploaded yet</p>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/document-s3/UploadedDocumentsSection.tsx
"use client";

import React from "react";
import UploadedDocumentItem from "./UploadedDocumentItem";

export default function UploadedDocumentsSection({
  documents = [],
  onView,
  onDownload,
  onDelete,
}: {
  documents?: {
    id: string;
    fileName: string;
    fileSize: number;
    uploadDate: string;
    status:
      | "verified"
      | "under-review"
      | "pending"
      | "reupload-requested"
      | "rejected";
    fileUrl: string;
  }[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  // Group documents by type for better organization
  const getDocumentType = (fileName: string) => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.includes("transcript")) return "Academic Transcript";
    if (lowerName.includes("degree") || lowerName.includes("diploma"))
      return "Degree Certificate";
    if (lowerName.includes("ielts") || lowerName.includes("toefl"))
      return "Language Proficiency";
    if (lowerName.includes("passport")) return "Passport";
    if (lowerName.includes("resume") || lowerName.includes("cv"))
      return "Resume/CV";
    if (lowerName.includes("sop") || lowerName.includes("statement"))
      return "Statement of Purpose";
    return "Other";
  };

  // Group documents by type
  const groupedDocuments = documents.reduce(
    (acc, doc) => {
      const type = getDocumentType(doc.fileName);
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(doc);
      return acc;
    },
    {} as Record<string, typeof documents>,
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Uploaded Documents ({documents.length})
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage your uploaded documents
        </p>
      </div>

      {/* Documents by Type */}
      {Object.entries(groupedDocuments).map(([type, docs]) => (
        <div key={type} className="mb-6 last:mb-0">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">{type}</h3>
          <div className="space-y-3">
            {docs.map((doc) => (
              <UploadedDocumentItem
                key={doc.id}
                fileName={doc.fileName}
                uploadDate={doc.uploadDate}
                fileSize={`${(doc.fileSize / 1024 / 1024).toFixed(2)} MB`}
                status={doc.status}
                onView={() => onView?.(doc.id)}
                onDownload={() => onDownload?.(doc.id)}
                onDelete={() => onDelete?.(doc.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No documents yet
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Start by uploading your documents using the upload cards above. Your
            progress will be tracked automatically.
          </p>
        </div>
      )}
    </div>
  );
}
