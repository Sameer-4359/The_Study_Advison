import { FileText } from "lucide-react";
import { DocumentCardProps } from "@/components/document-s3/DocumentCard";

export const documentCardsData: DocumentCardProps[] = [
  {
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    title: "Passport Copy",
    subtitle: "Required for verification",
    description: "Upload a scanned copy of your valid passport.",
    status: "pending",
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    title: "Academic Transcript",
    subtitle: "Education Record",
    description: "Submit transcripts from your latest institution.",
    status: "uploaded",
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    title: "Language Proficiency",
    subtitle: "IELTS / TOEFL",
    description: "Provide proof of your English language test result.",
    status: "required",
  },
];
