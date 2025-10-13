// app/document-upload/page.tsx
"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import ProgressSection from "@/components/document-s3/ProgressSection";
import DocumentCard from "@/components/document-s3/DocumentCard";
import UploadedDocumentsSection from "@/components/document-s3/UploadedDocumentsSection";
import { FileText, Upload, Award, Globe, FileCheck, User } from "lucide-react";
import DocumentLayout from "@/components/layouts/DocumentLayout";

export default function DocumentUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(50);

  const handleUpload = (documentType: string) => {
    console.log(`Uploading ${documentType}`);
    // Implement file upload logic here
  };

  return (
    <DocumentLayout>
    <div className="pt-10"></div>
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
        completionPercentage={50}
      />

      {/* Progress Section */}
      <ProgressSection
        label="Required Documents Uploaded"
        percentage={uploadProgress}
      />

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Academic Transcripts - Uploaded */}
        <DocumentCard
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          title="Academic Transcripts"
          subtitle="Required"
          description="Official transcripts from your current/previous institutions"
          status="uploaded"
        />

        {/* Degree/Diploma Certificates - Pending */}
        <DocumentCard
          icon={<Award className="w-5 h-5 text-blue-600" />}
          title="Degree/Diploma Certificates"
          subtitle="Required"
          description="Completed degree or diploma certificates"
          status="pending"
          onUpload={() => handleUpload("degree")}
        />

        {/* Language Proficiency - Uploaded */}
        <DocumentCard
          icon={<Globe className="w-5 h-5 text-blue-600" />}
          title="Language Proficiency"
          subtitle="Required"
          description="IELTS, TOEFL, or other language test scores"
          status="uploaded"
        />

        {/* Passport Copy - Uploaded */}
        <DocumentCard
          icon={<FileCheck className="w-5 h-5 text-blue-600" />}
          title="Passport Copy"
          subtitle="Required"
          description="Valid passport bio-data page"
          status="uploaded"
        />

        {/* Resume/CV - Pending */}
        <DocumentCard
          icon={<User className="w-5 h-5 text-blue-600" />}
          title="Resume/CV"
          subtitle="Optional"
          description="Updated curriculum vitae or resume"
          status="pending"
          onUpload={() => handleUpload("resume")}
        />

        {/* Statement of Purpose - Pending */}
        <DocumentCard
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          title="Statement of Purpose"
          subtitle="Optional"
          description="Personal statement or statement of purpose"
          status="pending"
          onUpload={() => handleUpload("sop")}
        />
      </div>

      {/* Uploaded Documents Section */}
      <UploadedDocumentsSection />
    </div>
</DocumentLayout>
  );
}