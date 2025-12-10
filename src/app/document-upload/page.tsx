// "use client";

// import React, { useState, useRef } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import ProgressSection from "@/components/document-s3/ProgressSection";
// import DocumentCard from "@/components/document-s3/DocumentCard";
// import UploadedDocumentsSection from "@/components/document-s3/UploadedDocumentsSection";
// import { FileText, Upload, Award, Globe, FileCheck, User } from "lucide-react";
// import DocumentLayout from "@/components/layouts/DocumentLayout";
// import toast from "react-hot-toast";
// import { useAuth } from "@/context/AuthContext";

// /**
//  * Map display title -> backend DocumentType enum (must match your prisma enum)
//  */
// const TYPE_MAP: Record<string, string> = {
//   "Academic Transcripts": "ACADEMIC_TRANSCRIPT",
//   "Degree/Diploma Certificates": "DEGREE_DIPLOMA",
//   "Language Proficiency": "LANGUAGE_PROFICIENCY",
//   "Passport Copy": "PASSPORT_COPY",
//   "Resume/CV": "RESUME_CV",
//   "Statement of Purpose": "STATEMENT_OF_PURPOSE",
// };

// export default function DocumentUploadPage() {
//   const { token } = useAuth();

//   // stagedFiles keyed by title
//   const [stagedFiles, setStagedFiles] = useState<Record<string, File | null>>(
//     {}
//   );

//   // uploaded documents visible in UI (initially can be empty)
//   const [uploadedDocs, setUploadedDocs] = useState<
//     {
//       id: string;
//       fileName: string;
//       fileSize: number;
//       uploadDate: string;
//       status: "verified" | "under-review" | "pending";
//       fileUrl: string;
//     }[]
//   >([]);

//   // uploading state per doc title
//   const [uploading, setUploading] = useState<Record<string, boolean>>({});

//   // hidden file inputs refs per doc card
//   const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

//   const maxFileSize = 10 * 1024 * 1024; // 10 MB
//   const allowedTypes = [
//     "application/pdf",
//     "image/jpeg",
//     "image/png",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   const handleSelectClick = (title: string) => {
//     // trigger hidden file input
//     const ref = inputRefs.current[title];
//     if (ref) ref.click();
//   };

//   const handleFileChange = (title: string, files: FileList | null) => {
//     if (!files || !files.length) return;
//     const file = files[0];

//     // validations
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Only PDF, JPG, PNG, DOC, DOCX files are allowed.");
//       return;
//     }

//     if (file.size > maxFileSize) {
//       toast.error("File too large. Maximum allowed size is 10 MB.");
//       return;
//     }

//     setStagedFiles((s) => ({ ...s, [title]: file }));
//     toast.success(`${file.name} is staged. Click Upload to send.`);
//   };

//   const handleRemoveStaged = (title: string) => {
//     setStagedFiles((s) => {
//       const copy = { ...s };
//       delete copy[title];
//       return copy;
//     });
//   };

//   const doUpload = async (title: string) => {
//     const file = stagedFiles[title];
//     if (!file) {
//       // If no staged file, open file picker
//       handleSelectClick(title);
//       return;
//     }

//     if (!token) {
//       toast.error("You are not authenticated. Please login.");
//       return;
//     }

//     const docType = TYPE_MAP[title];
//     if (!docType) {
//       toast.error("Unknown document type.");
//       return;
//     }

//     try {
//       setUploading((u) => ({ ...u, [title]: true }));
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("type", docType);

//       const toastId = toast.loading("Uploading...");

//       const res = await fetch("http://localhost:4000/api/documents/upload", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.dismiss(toastId);
//         toast.error(data.message || "Upload failed.");
//         setUploading((u) => ({ ...u, [title]: false }));
//         return;
//       }

//       // success: push to uploadedDocs
//       const uploaded = {
//         id: data.document.id?.toString() ?? Date.now().toString(),
//         fileName: data.document.fileName || file.name,
//         fileSize: file.size,
//         uploadDate: new Date().toLocaleString(),
//         status: "under-review" as const,
//         fileUrl: data.document.fileUrl,
//       };

//       setUploadedDocs((d) => [uploaded, ...d]);

//       // clear staged file for that title
//       setStagedFiles((s) => {
//         const copy = { ...s };
//         delete copy[title];
//         return copy;
//       });

//       toast.dismiss(toastId);
//       toast.success("Uploaded successfully!");
//     } catch (err) {
//       console.error("UPLOAD_ERR", err);
//       toast.error("Unable to upload. Try again later.");
//     } finally {
//       setUploading((u) => ({ ...u, [title]: false }));
//     }
//   };

//   const handleView = (url: string) => {
//     if (!url) {
//       toast.error("No file URL available.");
//       return;
//     }
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   const handleDownload = (url: string, fileName?: string) => {
//     if (!url) {
//       toast.error("No file URL available.");
//       return;
//     }
//     // trigger download
//     const a = document.createElement("a");
//     a.href = url;
//     if (fileName) a.download = fileName;
//     a.target = "_blank";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//   };

//   const handleDeleteUploaded = (id: string) => {
//     // server-side delete not implemented — keep UI consistent and remove locally
//     setUploadedDocs((d) => d.filter((x) => x.id !== id));
//     toast.success("Document removed locally. Server-side delete not implemented yet.");
//   };

//   return (
//     <DocumentLayout>
//       <div className="pt-10" />
//       <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "Document Upload" },
//           ]}
//         />

//         {/* Page Header */}
//         <PageHeader
//           title="Document Upload"
//           description="Upload your academic and personal documents for verification"
//           completionPercentage={
//             uploadedDocs.length > 0 ? Math.min(100, uploadedDocs.length * 15) : 50
//           }
//         />

//         {/* Progress Section */}
//         <ProgressSection
//           label="Required Documents Uploaded"
//           percentage={Math.min(100, uploadedDocs.length * 15)}
//         />

//         {/* Document Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//           {[
//             {
//               title: "Academic Transcripts",
//               icon: <FileText className="w-5 h-5 text-blue-600" />,
//               subtitle: "Required",
//               description: "Official transcripts from your current/previous institutions",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("transcript")) ? "uploaded" : "pending",
//             },
//             {
//               title: "Degree/Diploma Certificates",
//               icon: <Award className="w-5 h-5 text-blue-600" />,
//               subtitle: "Required",
//               description: "Completed degree or diploma certificates",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("degree") || d.fileName.toLowerCase().includes("diploma")) ? "uploaded" : "pending",
//             },
//             {
//               title: "Language Proficiency",
//               icon: <Globe className="w-5 h-5 text-blue-600" />,
//               subtitle: "Required",
//               description: "IELTS, TOEFL, or other language test scores",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("ielts") || d.fileName.toLowerCase().includes("toefl")) ? "uploaded" : "uploaded",
//             },
//             {
//               title: "Passport Copy",
//               icon: <FileCheck className="w-5 h-5 text-blue-600" />,
//               subtitle: "Required",
//               description: "Valid passport bio-data page",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("passport")) ? "uploaded" : "uploaded",
//             },
//             {
//               title: "Resume/CV",
//               icon: <User className="w-5 h-5 text-blue-600" />,
//               subtitle: "Optional",
//               description: "Updated curriculum vitae or resume",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("resume") || d.fileName.toLowerCase().includes("cv")) ? "uploaded" : "pending",
//             },
//             {
//               title: "Statement of Purpose",
//               icon: <FileText className="w-5 h-5 text-blue-600" />,
//               subtitle: "Optional",
//               description: "Personal statement or statement of purpose",
//               status: uploadedDocs.some((d) => d.fileName.toLowerCase().includes("sop") || d.fileName.toLowerCase().includes("statement")) ? "uploaded" : "pending",
//             },
//           ].map((card) => (
//             <div key={card.title}>
//               <DocumentCard
//                 icon={card.icon}
//                 title={card.title}
//                 subtitle={card.subtitle}
//                 description={card.description}
//                 status={card.status as any}
//                 onUpload={() => {
//                   // if staged file exists -> upload; else -> open picker
//                   if (stagedFiles[card.title]) doUpload(card.title);
//                   else handleSelectClick(card.title);
//                 }}
//                 stagedFile={stagedFiles[card.title] ?? null}
//                 onRemoveStaged={() => handleRemoveStaged(card.title)}
//                 uploading={!!uploading[card.title]}
//               />

//               {/* hidden input */}
//              <input
//   ref={(el) => {
//     inputRefs.current[card.title] = el;
//   }}
//   type="file"
//   accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   className="hidden"
//   onChange={(e) => handleFileChange(card.title, e.target.files)}
// />
//             </div>
//           ))}
//         </div>

//         {/* Uploaded Documents Section */}
//         <UploadedDocumentsSection
//           documents={uploadedDocs}
//           onView={(id) => {
//             const doc = uploadedDocs.find((d) => d.id === id);
//             if (doc) handleView(doc.fileUrl);
//           }}
//           onDownload={(id) => {
//             const doc = uploadedDocs.find((d) => d.id === id);
//             if (doc) handleDownload(doc.fileUrl, doc.fileName);
//           }}
//           onDelete={(id) => handleDeleteUploaded(id)}
//         />
//       </div>
//     </DocumentLayout>
//   );
// }

// // src/app/document-upload/page.tsx
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import ProgressSection from "@/components/document-s3/ProgressSection";
// import DocumentCard from "@/components/document-s3/DocumentCard";
// import UploadedDocumentsSection from "@/components/document-s3/UploadedDocumentsSection";
// import { FileText, Upload, Award, Globe, FileCheck, User } from "lucide-react";
// import DocumentLayout from "@/components/layouts/DocumentLayout";
// import toast from "react-hot-toast";
// import { useDocuments } from "@/hooks/useDocuments";
// import type { DisplayDocumentType } from "@/lib/types/document";

// // Define document cards with proper typing
// const DOCUMENT_CARDS = [
//   {
//     title: "Academic Transcripts" as DisplayDocumentType,
//     icon: <FileText className="w-5 h-5 text-blue-600" />,
//     subtitle: "Required",
//     description: "Official transcripts from your current/previous institutions",
//   },
//   {
//     title: "Degree/Diploma Certificates" as DisplayDocumentType,
//     icon: <Award className="w-5 h-5 text-blue-600" />,
//     subtitle: "Required",
//     description: "Completed degree or diploma certificates",
//   },
//   {
//     title: "Language Proficiency" as DisplayDocumentType,
//     icon: <Globe className="w-5 h-5 text-blue-600" />,
//     subtitle: "Required",
//     description: "IELTS, TOEFL, or other language test scores",
//   },
//   {
//     title: "Passport Copy" as DisplayDocumentType,
//     icon: <FileCheck className="w-5 h-5 text-blue-600" />,
//     subtitle: "Required",
//     description: "Valid passport bio-data page",
//   },
//   {
//     title: "Resume/CV" as DisplayDocumentType,
//     icon: <User className="w-5 h-5 text-blue-600" />,
//     subtitle: "Optional",
//     description: "Updated curriculum vitae or resume",
//   },
//   {
//     title: "Statement of Purpose" as DisplayDocumentType,
//     icon: <FileText className="w-5 h-5 text-blue-600" />,
//     subtitle: "Optional",
//     description: "Personal statement or statement of purpose",
//   },
// ];

// export default function DocumentUploadPage() {
//   const {
//     documents,
//     loading,
//     stats,
//     uploadDocument,
//     deleteDocument,
//     loadDocuments,
//     isDocumentUploaded,
//     getAllDocumentStatus,
//   } = useDocuments();

//   // stagedFiles keyed by DisplayDocumentType
//   const [stagedFiles, setStagedFiles] = useState<Record<DisplayDocumentType, File | null>>(
//     {} as Record<DisplayDocumentType, File | null>
//   );
  
//   // uploading state per document type
//   const [uploading, setUploading] = useState<Record<DisplayDocumentType, boolean>>(
//     {} as Record<DisplayDocumentType, boolean>
//   );
  
//   // For updating documents
//   const [updatingDocId, setUpdatingDocId] = useState<number | null>(null);

//   // hidden file inputs refs per doc card
//   const inputRefs = useRef<Record<DisplayDocumentType, HTMLInputElement | null>>(
//     {} as Record<DisplayDocumentType, HTMLInputElement | null>
//   );

//   const maxFileSize = 10 * 1024 * 1024; // 10 MB
//   const allowedTypes = [
//     "application/pdf",
//     "image/jpeg",
//     "image/png",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   const handleSelectClick = (title: DisplayDocumentType) => {
//     // trigger hidden file input
//     const ref = inputRefs.current[title];
//     if (ref) ref.click();
//   };

//   const handleFileChange = (title: DisplayDocumentType, files: FileList | null) => {
//     if (!files || !files.length) return;
//     const file = files[0];

//     // validations
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Only PDF, JPG, PNG, DOC, DOCX files are allowed.");
//       return;
//     }

//     if (file.size > maxFileSize) {
//       toast.error("File too large. Maximum allowed size is 10 MB.");
//       return;
//     }

//     setStagedFiles((s) => ({ ...s, [title]: file }));
//     toast.success(`${file.name} is staged. Click Upload to send.`);
//   };

//   const handleRemoveStaged = (title: DisplayDocumentType) => {
//     setStagedFiles((s) => {
//       const copy = { ...s };
//       delete copy[title];
//       return copy;
//     });
//   };

//   const doUpload = async (title: DisplayDocumentType) => {
//     const file = stagedFiles[title];
//     if (!file) {
//       // If no staged file, open file picker
//       handleSelectClick(title);
//       return;
//     }

//     try {
//       setUploading((u) => ({ ...u, [title]: true }));
      
//       // Check if document type already exists
//       const existingDoc = getAllDocumentStatus().find(
//         status => status.displayName === title && status.isUploaded
//       );

//       if (existingDoc?.document) {
//         // Update existing document
//         setUpdatingDocId(existingDoc.document.id);
//         await uploadDocument(file, title);
//         setUpdatingDocId(null);
//       } else {
//         // Upload new document
//         await uploadDocument(file, title);
//       }

//       // Clear staged file for that title
//       setStagedFiles((s) => {
//         const copy = { ...s };
//         delete copy[title];
//         return copy;
//       });

//       // Reload documents to get updated list
//       await loadDocuments();
//     } catch (error) {
//       console.error('Upload error:', error);
//     } finally {
//       setUploading((u) => ({ ...u, [title]: false }));
//       setUpdatingDocId(null);
//     }
//   };

//   const handleView = (url: string) => {
//     if (!url) {
//       toast.error("No file URL available.");
//       return;
//     }
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   const handleDownload = (url: string, fileName?: string) => {
//     if (!url) {
//       toast.error("No file URL available.");
//       return;
//     }
//     // trigger download
//     const a = document.createElement("a");
//     a.href = url;
//     if (fileName) a.download = fileName;
//     a.target = "_blank";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//   };

//   const handleDeleteUploaded = async (id: number) => {
//     const confirmed = window.confirm("Are you sure you want to delete this document?");
//     if (!confirmed) return;

//     const success = await deleteDocument(id);
//     if (success) {
//       // Document deleted successfully, state is already updated via hook
//       toast.success("Document deleted successfully!");
//     }
//   };

//   // Format documents for the UploadedDocumentsSection
//   const formattedDocuments = documents.map(doc => ({
//     id: doc.id.toString(),
//     fileName: doc.fileName,
//     fileSize: doc.fileSize || 0,
//     uploadDate: new Date(doc.createdAt).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     }),
//     status: "under-review" as const,
//     fileUrl: doc.fileUrl,
//   }));

//   // Get status for each document type
//   const getDocumentStatus = (title: DisplayDocumentType) => {
//     return isDocumentUploaded(title) ? "uploaded" : "pending";
//   };

//   if (loading && documents.length === 0) {
//     return (
//       <DocumentLayout>
//         <div className="pt-10" />
//         <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading documents...</p>
//             </div>
//           </div>
//         </div>
//       </DocumentLayout>
//     );
//   }

//   return (
//     <DocumentLayout>
//       <div className="pt-10" />
//       <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "Document Upload" },
//           ]}
//         />

//         {/* Page Header */}
//         <PageHeader
//           title="Document Upload"
//           description="Upload your academic and personal documents for verification"
//           completionPercentage={stats.progressPercentage}
//         />

//         {/* Progress Section */}
//         <ProgressSection
//           label="Required Documents Uploaded"
//           percentage={stats.progressPercentage}
//         />

//         {/* Document Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//           {DOCUMENT_CARDS.map((card) => {
//             const isUploaded = getDocumentStatus(card.title) === "uploaded";
//             const existingDoc = getAllDocumentStatus().find(
//               status => status.displayName === card.title && status.isUploaded
//             );
            
//             return (
//               <div key={card.title}>
//                 <DocumentCard
//                   icon={card.icon}
//                   title={card.title}
//                   subtitle={card.subtitle}
//                   description={card.description}
//                   status={isUploaded ? "uploaded" : "pending"}
//                   onUpload={() => doUpload(card.title)}
//                   stagedFile={stagedFiles[card.title] ?? null}
//                   onRemoveStaged={() => handleRemoveStaged(card.title)}
//                   uploading={!!uploading[card.title] || (existingDoc?.document?.id === updatingDocId)}
//                   isUpdate={isUploaded && !!stagedFiles[card.title]}
//                 />

//                 {/* hidden input */}
//                 <input
//                   ref={(el) => {
//                     inputRefs.current[card.title] = el;
//                   }}
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                   className="hidden"
//                   onChange={(e) => handleFileChange(card.title, e.target.files)}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Uploaded Documents Section */}
//         <UploadedDocumentsSection
//           documents={formattedDocuments}
//           onView={(id) => {
//             const doc = documents.find((d) => d.id.toString() === id);
//             if (doc) handleView(doc.fileUrl);
//           }}
//           onDownload={(id) => {
//             const doc = documents.find((d) => d.id.toString() === id);
//             if (doc) handleDownload(doc.fileUrl, doc.fileName);
//           }}
//           onDelete={(id) => handleDeleteUploaded(parseInt(id))}
//         />
//       </div>
//     </DocumentLayout>
//   );
// }



"use client";

import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import ProgressSection from "@/components/document-s3/ProgressSection";
import DocumentCard from "@/components/document-s3/DocumentCard";
import UploadedDocumentsSection from "@/components/document-s3/UploadedDocumentsSection";
import ConfirmationModal from "@/components/ui/ConfirmationModal"; // Add this import
import { FileText, Upload, Award, Globe, FileCheck, User } from "lucide-react";
import DocumentLayout from "@/components/layouts/DocumentLayout";
import toast from "react-hot-toast";
import { useDocuments } from "@/hooks/useDocuments";
import type { DisplayDocumentType } from "@/lib/types/document";

// Define document cards with proper typing
const DOCUMENT_CARDS = [
  {
    title: "Academic Transcripts" as DisplayDocumentType,
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    subtitle: "Required",
    description: "Official transcripts from your current/previous institutions",
  },
  {
    title: "Degree/Diploma Certificates" as DisplayDocumentType,
    icon: <Award className="w-5 h-5 text-blue-600" />,
    subtitle: "Required",
    description: "Completed degree or diploma certificates",
  },
  {
    title: "Language Proficiency" as DisplayDocumentType,
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    subtitle: "Required",
    description: "IELTS, TOEFL, or other language test scores",
  },
  {
    title: "Passport Copy" as DisplayDocumentType,
    icon: <FileCheck className="w-5 h-5 text-blue-600" />,
    subtitle: "Required",
    description: "Valid passport bio-data page",
  },
  {
    title: "Resume/CV" as DisplayDocumentType,
    icon: <User className="w-5 h-5 text-blue-600" />,
    subtitle: "Optional",
    description: "Updated curriculum vitae or resume",
  },
  {
    title: "Statement of Purpose" as DisplayDocumentType,
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    subtitle: "Optional",
    description: "Personal statement or statement of purpose",
  },
];

export default function DocumentUploadPage() {
  const {
    documents,
    loading,
    stats,
    uploadDocument,
    deleteDocument,
    loadDocuments,
    isDocumentUploaded,
    getAllDocumentStatus,
  } = useDocuments();

  // stagedFiles keyed by DisplayDocumentType
  const [stagedFiles, setStagedFiles] = useState<Record<DisplayDocumentType, File | null>>(
    {} as Record<DisplayDocumentType, File | null>
  );
  
  // uploading state per document type
  const [uploading, setUploading] = useState<Record<DisplayDocumentType, boolean>>(
    {} as Record<DisplayDocumentType, boolean>
  );
  
  // For updating documents
  const [updatingDocId, setUpdatingDocId] = useState<number | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{ id: number; fileName: string } | null>(null);

  // hidden file inputs refs per doc card
  const inputRefs = useRef<Record<DisplayDocumentType, HTMLInputElement | null>>(
    {} as Record<DisplayDocumentType, HTMLInputElement | null>
  );

  const maxFileSize = 10 * 1024 * 1024; // 10 MB
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleSelectClick = (title: DisplayDocumentType) => {
    // trigger hidden file input
    const ref = inputRefs.current[title];
    if (ref) ref.click();
  };

  const handleFileChange = (title: DisplayDocumentType, files: FileList | null) => {
    if (!files || !files.length) return;
    const file = files[0];

    // validations
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG, DOC, DOCX files are allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      toast.error("File too large. Maximum allowed size is 10 MB.");
      return;
    }

    setStagedFiles((s) => ({ ...s, [title]: file }));
    toast.success(`${file.name} is staged. Click Upload to send.`);
  };

  const handleRemoveStaged = (title: DisplayDocumentType) => {
    setStagedFiles((s) => {
      const copy = { ...s };
      delete copy[title];
      return copy;
    });
  };

  const doUpload = async (title: DisplayDocumentType) => {
    const file = stagedFiles[title];
    if (!file) {
      // If no staged file, open file picker
      handleSelectClick(title);
      return;
    }

    try {
      setUploading((u) => ({ ...u, [title]: true }));
      
      // Check if document type already exists
      const existingDoc = getAllDocumentStatus().find(
        status => status.displayName === title && status.isUploaded
      );

      if (existingDoc?.document) {
        // Update existing document
        setUpdatingDocId(existingDoc.document.id);
        await uploadDocument(file, title);
        setUpdatingDocId(null);
      } else {
        // Upload new document
        await uploadDocument(file, title);
      }

      // Clear staged file for that title
      setStagedFiles((s) => {
        const copy = { ...s };
        delete copy[title];
        return copy;
      });

      // Reload documents to get updated list
      await loadDocuments();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading((u) => ({ ...u, [title]: false }));
      setUpdatingDocId(null);
    }
  };

  const handleView = (url: string) => {
    if (!url) {
      toast.error("No file URL available.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = (url: string, fileName?: string) => {
    if (!url) {
      toast.error("No file URL available.");
      return;
    }
    // trigger download
    const a = document.createElement("a");
    a.href = url;
    if (fileName) a.download = fileName;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDeleteClick = (id: number, fileName: string) => {
    setDocumentToDelete({ id, fileName });
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;

    const success = await deleteDocument(documentToDelete.id);
    if (success) {
      toast.success("Document deleted successfully!");
    }
  };

  const handleDeleteCancel = () => {
    setModalOpen(false);
    setDocumentToDelete(null);
  };

  // Format documents for the UploadedDocumentsSection
  const formattedDocuments = documents.map(doc => ({
    id: doc.id.toString(),
    fileName: doc.fileName,
    fileSize: doc.fileSize || 0,
    uploadDate: new Date(doc.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: "under-review" as const,
    fileUrl: doc.fileUrl,
  }));

  // Get status for each document type
  const getDocumentStatus = (title: DisplayDocumentType) => {
    return isDocumentUploaded(title) ? "uploaded" : "pending";
  };

  if (loading && documents.length === 0) {
    return (
      <DocumentLayout>
        <div className="pt-10" />
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading documents...</p>
            </div>
          </div>
        </div>
      </DocumentLayout>
    );
  }

  return (
    <>
      <DocumentLayout>
        <div className="pt-10" />
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Document Upload" },
            ]}
          />

          {/* Page Header */}
          <PageHeader
            title="Document Upload"
            description="Upload your academic and personal documents for verification"
            completionPercentage={stats.progressPercentage}
          />

          {/* Progress Section */}
          <ProgressSection
            label="Required Documents Uploaded"
            percentage={stats.progressPercentage}
          />

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {DOCUMENT_CARDS.map((card) => {
              const isUploaded = getDocumentStatus(card.title) === "uploaded";
              const existingDoc = getAllDocumentStatus().find(
                status => status.displayName === card.title && status.isUploaded
              );
              
              return (
                <div key={card.title}>
                  <DocumentCard
                    icon={card.icon}
                    title={card.title}
                    subtitle={card.subtitle}
                    description={card.description}
                    status={isUploaded ? "uploaded" : "pending"}
                    onUpload={() => doUpload(card.title)}
                    stagedFile={stagedFiles[card.title] ?? null}
                    onRemoveStaged={() => handleRemoveStaged(card.title)}
                    uploading={!!uploading[card.title] || (existingDoc?.document?.id === updatingDocId)}
                    isUpdate={isUploaded && !!stagedFiles[card.title]}
                  />

                  {/* hidden input */}
                  <input
                    ref={(el) => {
                      inputRefs.current[card.title] = el;
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => handleFileChange(card.title, e.target.files)}
                  />
                </div>
              );
            })}
          </div>

          {/* Uploaded Documents Section */}
          <UploadedDocumentsSection
            documents={formattedDocuments}
            onView={(id) => {
              const doc = documents.find((d) => d.id.toString() === id);
              if (doc) handleView(doc.fileUrl);
            }}
            onDownload={(id) => {
              const doc = documents.find((d) => d.id.toString() === id);
              if (doc) handleDownload(doc.fileUrl, doc.fileName);
            }}
            onDelete={(id) => {
              const doc = documents.find((d) => d.id.toString() === id);
              if (doc) handleDeleteClick(parseInt(id), doc.fileName);
            }}
          />
        </div>
      </DocumentLayout>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Document"
        message={`Are you sure you want to delete "${documentToDelete?.fileName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}