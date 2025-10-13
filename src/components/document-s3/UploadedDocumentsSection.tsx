// // components/UploadedDocumentsSection.tsx
// "use client";

// import React from "react";
// import UploadedDocumentItem from "./UploadedDocumentItem";

// type Document = {
//   id: string;
//   fileName: string;
//   uploadDate: string;
//   fileSize: string;
//   status: "verified" | "under-review" | "pending";
// };

// type UploadedDocumentsSectionProps = {
//   documents?: Document[];
// };

// const defaultDocuments: Document[] = [
//   {
//     id: "1",
//     fileName: "Academic_Transcript.pdf",
//     uploadDate: "2024-01-15",
//     fileSize: "2.3 MB",
//     status: "verified",
//   },
//   {
//     id: "2",
//     fileName: "IELTS_Certificate.pdf",
//     uploadDate: "2024-01-14",
//     fileSize: "1.8 MB",
//     status: "verified",
//   },
//   {
//     id: "3",
//     fileName: "Passport_Copy.pdf",
//     uploadDate: "2024-01-16",
//     fileSize: "1.2 MB",
//     status: "under-review",
//   },
// ];

// export default function UploadedDocumentsSection({
//   documents = defaultDocuments,
// }: UploadedDocumentsSectionProps) {
//   const handleView = (id: string) => {
//     console.log("View document:", id);
//   };

//   const handleDownload = (id: string) => {
//     console.log("Download document:", id);
//   };

//   const handleDelete = (id: string) => {
//     console.log("Delete document:", id);
//   };

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
//             fileSize={doc.fileSize}
//             status={doc.status}
//             onView={() => handleView(doc.id)}
//             onDownload={() => handleDownload(doc.id)}
//             onDelete={() => handleDelete(doc.id)}
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
//after data
"use client";

import React from "react";
import UploadedDocumentItem from "./UploadedDocumentItem";
import { documentsData } from "@/data/document-s3-data/documentsData"; // 👈 separate data file se import

export default function UploadedDocumentsSection() {
  const handleView = (id: string) => {
    console.log("View document:", id);
  };

  const handleDownload = (id: string) => {
    console.log("Download document:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete document:", id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Uploaded Documents
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage your uploaded documents
        </p>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documentsData.map((doc) => (
          <UploadedDocumentItem
            key={doc.id}
            fileName={doc.fileName}
            uploadDate={doc.uploadDate}
            fileSize={doc.fileSize}
            status={doc.status}
            onView={() => handleView(doc.id)}
            onDownload={() => handleDownload(doc.id)}
            onDelete={() => handleDelete(doc.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {documentsData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No documents uploaded yet</p>
        </div>
      )}
    </div>
  );
}
