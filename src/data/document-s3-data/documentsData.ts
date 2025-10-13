export type Document = {
  id: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
  status: "verified" | "under-review" | "pending";
};

export const documentsData: Document[] = [
  {
    id: "1",
    fileName: "Academic_Transcript.pdf",
    uploadDate: "2024-01-15",
    fileSize: "2.3 MB",
    status: "verified",
  },
  {
    id: "2",
    fileName: "IELTS_Certificate.pdf",
    uploadDate: "2024-01-14",
    fileSize: "1.8 MB",
    status: "verified",
  },
  {
    id: "3",
    fileName: "Passport_Copy.pdf",
    uploadDate: "2024-01-16",
    fileSize: "1.2 MB",
    status: "under-review",
  },
];
