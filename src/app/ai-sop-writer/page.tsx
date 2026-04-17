// "use client";

// import React, { useState } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import TabNavigation from "@/components/Sop-s5/TabNavigation";
// import QuestionnaireContainer from "@/components/Sop-s5/QuestionnaireContainer";
// import QuestionSection from "@/components/Sop-s5/QuestionSection";
// import SubmitButton from "@/components/Sop-s5/SubmitButton";
// import SopLayout from "@/components/layouts/SopLayout";

// type Answers = {
//   [key: string]: string;
// };

// const questions = [
//   {
//     id: "q1",
//     question: "What is your primary motivation for pursuing this program?",
//     options: [
//       { id: "career", label: "Career advancement in my current field" },
//       { id: "switching", label: "Switching to a new career path" },
//       { id: "academic", label: "Academic research and knowledge pursuit" },
//       { id: "entrepreneurial", label: "Entrepreneurial aspirations" },
//     ],
//   },
//   {
//     id: "q2",
//     question: "Which aspect of the program excites you most?",
//     options: [
//       { id: "curriculum", label: "Cutting-edge curriculum and technology" },
//       { id: "faculty", label: "Research opportunities with faculty" },
//       { id: "connections", label: "Industry connections and internships" },
//       { id: "perspective", label: "Global perspective and diversity" },
//     ],
//   },
//   {
//     id: "q3",
//     question: "How do you plan to contribute to the university community?",
//     options: [
//       { id: "organizations", label: "Leading student organizations and clubs" },
//       { id: "perspectives", label: "Sharing diverse cultural perspectives" },
//       { id: "students", label: "Mentoring junior students" },
//       { id: "projects", label: "Participating in research projects" },
//     ],
//   },
//   {
//     id: "q4",
//     question: "What are your long-term career goals?",
//     options: [
//       { id: "leadership", label: "Executive leadership in technology companies" },
//       { id: "development", label: "Research and development in academia" },
//       { id: "venture", label: "Starting my own technology venture" },
//       { id: "consulting", label: "Consulting and advisory roles" },
//     ],
//   },
//   {
//     id: "q5",
//     question: "What unique perspective do you bring?",
//     options: [
//       { id: "cultural", label: "Cross-cultural experience and adaptability" },
//       { id: "technical", label: "Diverse professional background" },
//       { id: "skills", label: "Strong technical and analytical skills" },
//       { id: "experience", label: "Leadership and team-building experience" },
//     ],
//   },
// ];

// export default function AISopWriterPage() {
//   const [activeTab, setActiveTab] = useState("questionnaire");
//   const [answers, setAnswers] = useState<Answers>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleAnswerSelect = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const calculateProgress = () => {
//     const answeredCount = Object.keys(answers).length;
//     return Math.round((answeredCount / questions.length) * 100);
//   };

//   const isComplete = Object.keys(answers).length === questions.length;

//   const handleSubmit = async () => {
//     if (!isComplete) return;
//     setIsSubmitting(true);
//     setTimeout(() => {
//       console.log("Submitted answers:", answers);
//       setIsSubmitting(false);
//       setActiveTab("ai-generation");
//     }, 2000);
//   };

//   return (
//     <SopLayout>
//       {/* 🔧 This wrapper ensures no horizontal scroll and proper spacing below header */}
//       <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full overflow-x-hidden">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "AI SOP Writer" },
//           ]}
//         />

//         {/* Page Header */}
//         <PageHeader
//           title="AI SOP Writer"
//           description="Generate a personalized Statement of Purpose using AI"
//         />

//         {/* Tab Navigation */}
//         <div className="overflow-x-auto no-scrollbar">
//           <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
//         </div>

//         {/* Questionnaire Content */}
//         {activeTab === "questionnaire" && (
//           <QuestionnaireContainer
//             title="Questionnaire"
//             description="Answer these questions to help AI generate a personalized SOP"
//             progress={calculateProgress()}
//           >
//             {questions.map((q, index) => (
//               <QuestionSection
//                 key={q.id}
//                 questionNumber={index + 1}
//                 question={q.question}
//                 options={q.options}
//                 selectedOption={answers[q.id]}
//                 onSelect={(optionId) => handleAnswerSelect(q.id, optionId)}
//               />
//             ))}

//             <SubmitButton
//               onClick={handleSubmit}
//               disabled={!isComplete}
//               loading={isSubmitting}
//               label="Generate SOP"
//             />
//           </QuestionnaireContainer>
//         )}

//         {/* AI Generation Tab */}
//         {activeTab === "ai-generation" && (
//           <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   className="w-8 h-8 text-blue-600 animate-spin"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Generating Your SOP
//               </h3>
//               <p className="text-gray-600">
//                 AI is crafting a personalized Statement of Purpose based on your
//                 answers...
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Review & Edit Tab */}
//         {activeTab === "review-edit" && (
//           <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//             <p className="text-gray-600">
//               Review and edit your generated SOP here
//             </p>
//           </div>
//         )}
//       </div>
//     </SopLayout>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import DocumentLayout from "@/components/layouts/DocumentLayout";
import FormSectionCard from "@/components/profile-s2/FormSectionCard";
import FormInput from "@/components/profile-s2/FormInput";
import FormSelect from "@/components/profile-s2/FormSelect";
import FormActions from "@/components/profile-s2/FormActions";
import { useAuth } from "@/context/AuthContext";
import { jsPDF } from "jspdf";

type FormData = {
  name: string;
  country: string;
  university: string;
  program: string;
  whyUniversity: string;
  courseDetails: string;
  achievements: string;
  futureGoals: string;
  tone: "formal" | "passionate" | "academic";
  resumeText: string;
};

const toneOptions = [
  { value: "formal", label: "Formal" },
  { value: "passionate", label: "Passionate" },
  { value: "academic", label: "Academic" },
];

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default function AISopWriterPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savingPdf, setSavingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "review">("form");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [latestSopReview, setLatestSopReview] = useState<{
    id: number;
    status: string;
    reviewNotes: string | null;
    reviewedAt?: string | null;
    comments: Array<{
      id: number;
      body: string;
      createdAt: string;
      author?: {
        fullName?: string;
        role?: string;
      } | null;
    }>;
  } | null>(null);
  const [loadingSopReview, setLoadingSopReview] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    country: "",
    university: "",
    program: "",
    whyUniversity: "",
    courseDetails: "",
    achievements: "",
    futureGoals: "",
    tone: "passionate",
    resumeText: "",
  });

  const progress = useMemo(() => {
    const fields: Array<keyof FormData> = [
      "name",
      "country",
      "university",
      "program",
      "whyUniversity",
      "courseDetails",
      "achievements",
      "futureGoals",
      "tone",
    ];
    const filled = fields.filter(
      (k) => String(formData[k]).trim() !== "",
    ).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  const renderSopPdfBlob = (title: string, content: string) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 48;
    const topY = 56;
    const lineHeight = 18;
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxTextWidth = doc.internal.pageSize.getWidth() - marginX * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title || "Statement of Purpose", marginX, topY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(content, maxTextWidth);
    let y = topY + 28;

    lines.forEach((line: string) => {
      if (y > pageHeight - 48) {
        doc.addPage();
        y = 56;
      }
      doc.text(line, marginX, y);
      y += lineHeight;
    });

    return doc.output("blob");
  };

  const loadSopReview = async () => {
    if (!token) {
      setLoadingSopReview(false);
      return;
    }

    try {
      setLoadingSopReview(true);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

      const listRes = await fetch(`${baseUrl}/student/sop`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!listRes.ok) {
        throw new Error("Failed to load SOP status");
      }

      const listData: {
        sops?: Array<{
          id: number;
          status: string;
          reviewNotes?: string | null;
          reviewedAt?: string | null;
          updatedAt?: string;
          createdAt?: string;
        }>;
      } = await listRes.json();

      const latest = (listData.sops || [])[0];
      if (!latest) {
        setLatestSopReview(null);
        return;
      }

      const detailRes = await fetch(`${baseUrl}/student/sop/${latest.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!detailRes.ok) {
        throw new Error("Failed to load SOP details");
      }

      const detailData: {
        sop?: {
          id: number;
          status: string;
          reviewNotes?: string | null;
          reviewedAt?: string | null;
          comments?: Array<{
            id: number;
            body: string;
            createdAt: string;
            author?: {
              fullName?: string;
              role?: string;
            } | null;
          }>;
        };
      } = await detailRes.json();

      if (!detailData.sop) {
        setLatestSopReview(null);
        return;
      }

      setLatestSopReview({
        id: detailData.sop.id,
        status: detailData.sop.status,
        reviewNotes: detailData.sop.reviewNotes || null,
        reviewedAt: detailData.sop.reviewedAt || null,
        comments: detailData.sop.comments || [],
      });
    } catch (error) {
      console.error("Failed to load SOP review status", error);
    } finally {
      setLoadingSopReview(false);
    }
  };

  useEffect(() => {
    loadSopReview();
  }, [token]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please upload a resume smaller than 5MB.");
      return;
    }

    setLoading(true);
    toast.loading("Processing resume…", { id: "resume" });

    try {
      const payload = new FormData();
      payload.append("resume", file);

      const res = await fetch("/api/demo/parse-resume", {
        method: "POST",
        body: payload,
      });

      const data: {
        name?: string;
        achievements?: string;
        extractedText?: string;
        error?: string;
      } = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Resume parsing failed.");
      }

      setFormData((prev) => ({
        ...prev,
        resumeText: data.extractedText ?? prev.resumeText,
        achievements: data.achievements ?? prev.achievements,
        name: data.name ?? prev.name,
      }));

      toast.success("Resume processed. Auto-filled details where possible.", {
        id: "resume",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Couldn’t process resume. Please fill fields manually.";
      toast.error(message, {
        id: "resume",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    toast.loading("Generating SOP…", { id: "generate" });

    try {
      const res = await fetch("/api/demo/generate-motivation-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data: { letter?: string; error?: string } = await res.json();
      if (!res.ok || !data.letter) {
        throw new Error(data.error || "Generation failed.");
      }

      setGeneratedLetter(data.letter);
      setActiveTab("review");
      toast.success("SOP generated successfully.", { id: "generate" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Generation failed. Try again.";
      toast.error(message, { id: "generate" });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePdfVersion = async (submit = false) => {
    if (!token) {
      toast.error("Please login first.");
      return;
    }

    if (!generatedLetter.trim()) {
      toast.error("Please generate or write SOP content before saving PDF.");
      return;
    }

    const title =
      `${formData.university || "University"} ${formData.program || "Program"} SOP`.trim();

    setSavingPdf(true);
    toast.loading(
      submit ? "Saving and submitting SOP PDF..." : "Saving SOP PDF version...",
      {
        id: "save-pdf",
      },
    );

    try {
      const pdfBlob = renderSopPdfBlob(title, generatedLetter);
      const file = new File([pdfBlob], `sop-${Date.now()}.pdf`, {
        type: "application/pdf",
      });

      const body = new FormData();
      body.append("file", file);
      body.append("title", title);
      body.append("content", generatedLetter);
      body.append("submit", submit ? "true" : "false");

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const response = await fetch(`${baseUrl}/student/sop/save-pdf-version`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const payload: { message?: string } = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || "Failed to save SOP PDF");
      }

      toast.success(
        submit
          ? "SOP PDF version saved and submitted."
          : "SOP PDF version saved successfully.",
        { id: "save-pdf" },
      );

      await loadSopReview();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save SOP PDF";
      toast.error(message, { id: "save-pdf" });
    } finally {
      setSavingPdf(false);
    }
  };

  const handleCancel = () => {
    setGeneratedLetter("");
    setActiveTab("form");
    setFormData({
      name: "",
      country: "",
      university: "",
      program: "",
      whyUniversity: "",
      courseDetails: "",
      achievements: "",
      futureGoals: "",
      tone: "passionate",
      resumeText: "",
    });
    toast.success("Form cleared.");
  };

  return (
    <DocumentLayout>
      <div className="pt-10" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI SOP Writer" },
          ]}
        />

        <PageHeader
          title="AI SOP Writer"
          description="Generate and refine your Statement of Purpose."
          completionPercentage={progress}
        />

        <div className="mt-6 space-y-6">
          {loadingSopReview ? (
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
              Loading latest SOP review status...
            </div>
          ) : latestSopReview ? (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="text-sm font-semibold text-blue-900">
                Latest Counselor SOP Feedback
              </h3>
              <p className="text-xs text-blue-800 mt-1">
                Status: {latestSopReview.status}
              </p>
              {latestSopReview.reviewNotes && (
                <p className="text-xs text-gray-700 mt-2">
                  Notes: {latestSopReview.reviewNotes}
                </p>
              )}
              {(latestSopReview.comments || [])
                .filter(
                  (item) =>
                    String(item.author?.role || "").toLowerCase() ===
                    "counselor",
                )
                .slice(-2)
                .map((item) => (
                  <div
                    key={`sop-comment-${item.id}`}
                    className="mt-2 rounded-lg border border-blue-100 bg-white p-2"
                  >
                    <p className="text-xs font-medium text-gray-900">
                      {item.author?.fullName || "Counselor"}
                    </p>
                    <p className="text-xs text-gray-700 mt-1">{item.body}</p>
                  </div>
                ))}
            </div>
          ) : null}

          {activeTab === "form" && (
            <>
              <FormSectionCard
                title="Personal Information"
                description="Basic details"
              >
                <div className="space-y-4">
                  <FormInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(v) => handleInputChange("name", v)}
                    placeholder="John Doe"
                    required
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Resume Upload (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-600 hover:file:opacity-90"
                      disabled={loading}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Supports .pdf, .docx, and .txt. Text-based files work
                      best.
                    </p>
                  </div>
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="Program Details"
                description="Where and what you’re applying for"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Country"
                      value={formData.country}
                      onChange={(v) => handleInputChange("country", v)}
                      placeholder="Germany"
                      required
                    />
                    <FormInput
                      label="University"
                      value={formData.university}
                      onChange={(v) => handleInputChange("university", v)}
                      placeholder="Technical University"
                      required
                    />
                  </div>

                  <FormInput
                    label="Program"
                    value={formData.program}
                    onChange={(v) => handleInputChange("program", v)}
                    placeholder="MSc Computer Science"
                    required
                  />

                  <TextAreaField
                    label="Why this program/university?"
                    value={formData.whyUniversity}
                    onChange={(v) => handleInputChange("whyUniversity", v)}
                    rows={4}
                    placeholder="Write 3–5 lines about motivation and fit…"
                  />

                  <TextAreaField
                    label="Courses / Features you care about"
                    value={formData.courseDetails}
                    onChange={(v) => handleInputChange("courseDetails", v)}
                    rows={3}
                    placeholder="Mention relevant courses, labs, professors, etc…"
                  />
                </div>
              </FormSectionCard>

              <FormSectionCard
                title="Your Story"
                description="What makes you a strong candidate"
              >
                <div className="space-y-4">
                  <TextAreaField
                    label="Achievements"
                    value={formData.achievements}
                    onChange={(v) => handleInputChange("achievements", v)}
                    rows={4}
                    placeholder="Projects, awards, leadership, impact…"
                  />

                  <TextAreaField
                    label="Future Goals"
                    value={formData.futureGoals}
                    onChange={(v) => handleInputChange("futureGoals", v)}
                    rows={4}
                    placeholder="Short-term and long-term goals…"
                  />

                  <FormSelect
                    label="Letter Tone"
                    value={formData.tone}
                    onChange={(v) =>
                      handleInputChange("tone", v as FormData["tone"])
                    }
                    options={toneOptions}
                    required
                  />
                </div>
              </FormSectionCard>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <FormActions
                  onCancel={handleCancel}
                  onSave={handleGenerate}
                  saveLabel="Generate SOP"
                  loading={loading}
                />
              </div>
            </>
          )}

          {activeTab === "review" && (
            <FormSectionCard
              title="Review & Edit"
              description="Review, edit, and finalize your SOP draft."
            >
              <div className="space-y-4">
                <textarea
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  rows={18}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <FormActions
                    onCancel={() => setActiveTab("form")}
                    onSave={() => {
                      navigator.clipboard.writeText(generatedLetter);
                      toast.success("Copied to clipboard.");
                    }}
                    saveLabel="Copy SOP"
                    cancelLabel="Back to Form"
                    loading={false}
                  />

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={savingPdf}
                      onClick={() => handleSavePdfVersion(false)}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-60"
                    >
                      Save as PDF Version
                    </button>
                    <button
                      type="button"
                      disabled={savingPdf}
                      onClick={() => handleSavePdfVersion(true)}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      Save PDF and Submit
                    </button>
                  </div>
                </div>
              </div>
            </FormSectionCard>
          )}
        </div>
      </div>
    </DocumentLayout>
  );
}
