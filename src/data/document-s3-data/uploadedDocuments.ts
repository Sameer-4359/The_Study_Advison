import { UploadedDocumentItemProps } from "@/components/document-s3/UploadedDocumentItem";

export const uploadedDocuments: UploadedDocumentItemProps[] = [
  {
    fileName: "Passport.pdf",
    uploadDate: "2025-10-09",
    fileSize: "1.2 MB",
    status: "verified",
  },
  {
    fileName: "Transcript.pdf",
    uploadDate: "2025-10-07",
    fileSize: "3.4 MB",
    status: "under-review",
  },
  {
    fileName: "IELTS_Score.pdf",
    uploadDate: "2025-10-03",
    fileSize: "800 KB",
    status: "pending",
  },
];
