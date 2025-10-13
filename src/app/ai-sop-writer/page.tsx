// // app/ai-sop-writer/page.tsx
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
//     // Simulate API call
//     setTimeout(() => {
//       console.log("Submitted answers:", answers);
//       setIsSubmitting(false);
//       setActiveTab("ai-generation");
//     }, 2000);
//   };

//   return (
//     <SopLayout>
//     <div className="pt-10"></div>
//     <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
//       {/* Breadcrumb */}
//       <Breadcrumb
//         items={[
//           { label: "Dashboard", href: "/dashboard" },
//           { label: "AI SOP Writer" },
//         ]}
//       />

//       {/* Page Header */}
//       <PageHeader
//         title="AI SOP Writer"
//         description="Generate a personalized Statement of Purpose using AI"
//       />

//       {/* Tab Navigation */}
//       <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

//       {/* Questionnaire Content */}
//       {activeTab === "questionnaire" && (
//         <QuestionnaireContainer
//           title="Questionnaire"
//           description="Answer these questions to help AI generate a personalized SOP"
//           progress={calculateProgress()}
//         >
//           {/* All Questions */}
//           {questions.map((q, index) => (
//             <QuestionSection
//               key={q.id}
//               questionNumber={index + 1}
//               question={q.question}
//               options={q.options}
//               selectedOption={answers[q.id]}
//               onSelect={(optionId) => handleAnswerSelect(q.id, optionId)}
//             />
//           ))}

//           {/* Submit Button */}
//           <SubmitButton
//             onClick={handleSubmit}
//             disabled={!isComplete}
//             loading={isSubmitting}
//             label="Generate SOP"
//           />
//         </QuestionnaireContainer>
//       )}

//       {/* AI Generation Tab (Placeholder) */}
//       {activeTab === "ai-generation" && (
//         <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-blue-600 animate-spin"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Generating Your SOP
//             </h3>
//             <p className="text-gray-600">
//               AI is crafting a personalized Statement of Purpose based on your
//               answers...
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Review & Edit Tab (Placeholder) */}
//       {activeTab === "review-edit" && (
//         <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//           <p className="text-gray-600">
//             Review and edit your generated SOP here
//           </p>
//         </div>
//       )}
//     </div>
//     </SopLayout>
//   );
// }

"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import TabNavigation from "@/components/Sop-s5/TabNavigation";
import QuestionnaireContainer from "@/components/Sop-s5/QuestionnaireContainer";
import QuestionSection from "@/components/Sop-s5/QuestionSection";
import SubmitButton from "@/components/Sop-s5/SubmitButton";
import SopLayout from "@/components/layouts/SopLayout";

type Answers = {
  [key: string]: string;
};

const questions = [
  {
    id: "q1",
    question: "What is your primary motivation for pursuing this program?",
    options: [
      { id: "career", label: "Career advancement in my current field" },
      { id: "switching", label: "Switching to a new career path" },
      { id: "academic", label: "Academic research and knowledge pursuit" },
      { id: "entrepreneurial", label: "Entrepreneurial aspirations" },
    ],
  },
  {
    id: "q2",
    question: "Which aspect of the program excites you most?",
    options: [
      { id: "curriculum", label: "Cutting-edge curriculum and technology" },
      { id: "faculty", label: "Research opportunities with faculty" },
      { id: "connections", label: "Industry connections and internships" },
      { id: "perspective", label: "Global perspective and diversity" },
    ],
  },
  {
    id: "q3",
    question: "How do you plan to contribute to the university community?",
    options: [
      { id: "organizations", label: "Leading student organizations and clubs" },
      { id: "perspectives", label: "Sharing diverse cultural perspectives" },
      { id: "students", label: "Mentoring junior students" },
      { id: "projects", label: "Participating in research projects" },
    ],
  },
  {
    id: "q4",
    question: "What are your long-term career goals?",
    options: [
      { id: "leadership", label: "Executive leadership in technology companies" },
      { id: "development", label: "Research and development in academia" },
      { id: "venture", label: "Starting my own technology venture" },
      { id: "consulting", label: "Consulting and advisory roles" },
    ],
  },
  {
    id: "q5",
    question: "What unique perspective do you bring?",
    options: [
      { id: "cultural", label: "Cross-cultural experience and adaptability" },
      { id: "technical", label: "Diverse professional background" },
      { id: "skills", label: "Strong technical and analytical skills" },
      { id: "experience", label: "Leadership and team-building experience" },
    ],
  },
];

export default function AISopWriterPage() {
  const [activeTab, setActiveTab] = useState("questionnaire");
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / questions.length) * 100);
  };

  const isComplete = Object.keys(answers).length === questions.length;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Submitted answers:", answers);
      setIsSubmitting(false);
      setActiveTab("ai-generation");
    }, 2000);
  };

  return (
    <SopLayout>
      {/* 🔧 This wrapper ensures no horizontal scroll and proper spacing below header */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full overflow-x-hidden">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI SOP Writer" },
          ]}
        />

        {/* Page Header */}
        <PageHeader
          title="AI SOP Writer"
          description="Generate a personalized Statement of Purpose using AI"
        />

        {/* Tab Navigation */}
        <div className="overflow-x-auto no-scrollbar">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Questionnaire Content */}
        {activeTab === "questionnaire" && (
          <QuestionnaireContainer
            title="Questionnaire"
            description="Answer these questions to help AI generate a personalized SOP"
            progress={calculateProgress()}
          >
            {questions.map((q, index) => (
              <QuestionSection
                key={q.id}
                questionNumber={index + 1}
                question={q.question}
                options={q.options}
                selectedOption={answers[q.id]}
                onSelect={(optionId) => handleAnswerSelect(q.id, optionId)}
              />
            ))}

            <SubmitButton
              onClick={handleSubmit}
              disabled={!isComplete}
              loading={isSubmitting}
              label="Generate SOP"
            />
          </QuestionnaireContainer>
        )}

        {/* AI Generation Tab */}
        {activeTab === "ai-generation" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 animate-spin"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Generating Your SOP
              </h3>
              <p className="text-gray-600">
                AI is crafting a personalized Statement of Purpose based on your
                answers...
              </p>
            </div>
          </div>
        )}

        {/* Review & Edit Tab */}
        {activeTab === "review-edit" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-600">
              Review and edit your generated SOP here
            </p>
          </div>
        )}
      </div>
    </SopLayout>
  );
}
