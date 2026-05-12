// // components/University-s4/ProfileFormModal.tsx
// "use client";

// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { StudentProfileRequest } from "@/lib/api";

// interface ProfileFormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (profile: StudentProfileRequest) => void;
//   initialData?: StudentProfileRequest;
// }

// const educationLevels = [
//   { value: "HIGH_SCHOOL", label: "High School" },
//   { value: "BACHELORS", label: "Bachelor's Degree" },
//   { value: "MASTERS", label: "Master's Degree" },
//   { value: "PHD", label: "PhD" },
//   { value: "POST_DOCTORAL", label: "Post Doctoral" },
// ];

// const programTypes = [
//   { value: "BACHELORS", label: "Bachelor's" },
//   { value: "MASTERS", label: "Master's" },
//   { value: "PHD", label: "PhD" },
//   { value: "MBA", label: "MBA" },
//   { value: "RESEARCH_MASTERS", label: "Research Master's" },
// ];

// const countries = [
//   "United States", "United Kingdom", "Canada", "Australia", "Germany",
//   "France", "Netherlands", "Sweden", "Switzerland", "Singapore",
//   "Japan", "South Korea", "China", "Italy", "Spain"
// ];

// const fieldsOfStudy = [
//   "Computer Science", "Business Administration", "Engineering",
//   "Data Science", "Medicine", "Law", "Psychology", "Biology",
//   "Physics", "Mathematics", "Economics", "Finance"
// ];

// export default function ProfileFormModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData,
// }: ProfileFormModalProps) {
//   const [formData, setFormData] = useState<StudentProfileRequest>({
//     gpa: initialData?.gpa || 3.0,
//     experience_years: initialData?.experience_years || 0,
//     research_experience: initialData?.research_experience || false,
//     publications_count: initialData?.publications_count || 0,
//     work_experience_relevant: initialData?.work_experience_relevant || false,
//     leadership_experience: initialData?.leadership_experience || false,
//     current_education_level: initialData?.current_education_level || "BACHELORS",
//     field_of_study: initialData?.field_of_study || "Computer Science",
//     institution_name: initialData?.institution_name || "",
//     desired_program: initialData?.desired_program || "MASTERS",
//     preferred_countries: initialData?.preferred_countries || [],
//     ielts_score: initialData?.ielts_score,
//     toefl_score: initialData?.toefl_score,
//     gre_score: initialData?.gre_score,
//     gmat_score: initialData?.gmat_score,
//     budget_usd: initialData?.budget_usd,
//     preferred_intake: initialData?.preferred_intake,
//     study_mode: initialData?.study_mode,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
    
//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else if (name === "gpa") {
//       setFormData(prev => ({ ...prev, [name]: Math.min(4, Math.max(0, parseFloat(value) || 0)) }));
//     } else if (name === "experience_years" || name === "publications_count") {
//       setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
//     } else if (name === "ielts_score" || name === "budget_usd") {
//       setFormData(prev => ({ ...prev, [name]: parseFloat(value) || undefined }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCountryToggle = (country: string) => {
//     setFormData(prev => ({
//       ...prev,
//       preferred_countries: prev.preferred_countries.includes(country)
//         ? prev.preferred_countries.filter(c => c !== country)
//         : [...prev.preferred_countries, country]
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Academic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Education Level *
//                 </label>
//                 <select
//                   name="current_education_level"
//                   value={formData.current_education_level}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   {educationLevels.map(level => (
//                     <option key={level.value} value={level.value}>
//                       {level.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Field of Study *
//                 </label>
//                 <select
//                   name="field_of_study"
//                   value={formData.field_of_study}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   {fieldsOfStudy.map(field => (
//                     <option key={field} value={field}>
//                       {field}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GPA (0-4 scale) *
//                 </label>
//                 <input
//                   type="number"
//                   name="gpa"
//                   min="0"
//                   max="4"
//                   step="0.1"
//                   value={formData.gpa}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Institution Name
//                 </label>
//                 <input
//                   type="text"
//                   name="institution_name"
//                   value={formData.institution_name || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Test Scores */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-900">Test Scores (Optional)</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   IELTS Score (0-9)
//                 </label>
//                 <input
//                   type="number"
//                   name="ielts_score"
//                   min="0"
//                   max="9"
//                   step="0.5"
//                   value={formData.ielts_score || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   TOEFL Score
//                 </label>
//                 <input
//                   type="number"
//                   name="toefl_score"
//                   min="0"
//                   max="120"
//                   value={formData.toefl_score || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GRE Score
//                 </label>
//                 <input
//                   type="number"
//                   name="gre_score"
//                   min="260"
//                   max="340"
//                   value={formData.gre_score || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GMAT Score
//                 </label>
//                 <input
//                   type="number"
//                   name="gmat_score"
//                   min="200"
//                   max="800"
//                   value={formData.gmat_score || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Experience */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-900">Experience</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Years of Experience
//                 </label>
//                 <input
//                   type="number"
//                   name="experience_years"
//                   min="0"
//                   value={formData.experience_years}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Publications Count
//                 </label>
//                 <input
//                   type="number"
//                   name="publications_count"
//                   min="0"
//                   value={formData.publications_count}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="research_experience"
//                   checked={formData.research_experience}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Research Experience</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="work_experience_relevant"
//                   checked={formData.work_experience_relevant}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Relevant Work Experience</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="leadership_experience"
//                   checked={formData.leadership_experience}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Leadership Experience</span>
//               </label>
//             </div>
//           </div>

//           {/* Preferences */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-900">Study Preferences</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Desired Program *
//                 </label>
//                 <select
//                   name="desired_program"
//                   value={formData.desired_program}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   {programTypes.map(program => (
//                     <option key={program.value} value={program.value}>
//                       {program.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Budget (USD)
//                 </label>
//                 <input
//                   type="number"
//                   name="budget_usd"
//                   min="0"
//                   value={formData.budget_usd || ""}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Preferred Countries (Select multiple)
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {countries.map(country => (
//                   <button
//                     key={country}
//                     type="button"
//                     onClick={() => handleCountryToggle(country)}
//                     className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
//                       formData.preferred_countries.includes(country)
//                         ? 'bg-blue-100 text-blue-700 border-blue-300'
//                         : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
//                     }`}
//                   >
//                     {country}
//                   </button>
//                 ))}
//               </div>
//               {formData.preferred_countries.length > 0 && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   Selected: {formData.preferred_countries.join(", ")}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Save Profile & Get Recommendations
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }





// components/University-s4/ProfileFormModal.tsx - UPDATED VERSION
"use client";

import React, { useState, useEffect } from "react";
import { X, HelpCircle } from "lucide-react";
import { StudentProfileRequest } from "@/lib/api";

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: StudentProfileRequest) => void;
  initialData?: StudentProfileRequest;
  originalProfileData?: StudentProfileRequest;
}

const educationLevels = [
  { value: "HIGH_SCHOOL", label: "High School" },
  { value: "BACHELORS", label: "Bachelor's Degree" },
  { value: "MASTERS", label: "Master's Degree" },
  { value: "PHD", label: "PhD" },
  { value: "POST_DOCTORAL", label: "Post Doctoral" },
];

const programTypes = [
  { value: "BACHELORS", label: "Bachelor's" },
  { value: "MASTERS", label: "Master's" },
  { value: "PHD", label: "PhD" },
  { value: "MBA", label: "MBA" },
  { value: "RESEARCH_MASTERS", label: "Research Master's" },
  { value: "EXECUTIVE_EDUCATION", label: "Executive Education" },
  { value: "RESEARCH_FELLOWSHIP", label: "Research Fellowship" },
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Netherlands", "Sweden", "Switzerland", "Singapore",
  "Japan", "South Korea", "China", "Italy", "Spain"
];

const fieldsOfStudy = [
  "Computer Science", "Business Administration", "Engineering",
  "Data Science", "Medicine", "Law", "Psychology", "Biology",
  "Physics", "Mathematics", "Economics", "Finance"
];

const intakeOptions = [
  "FALL_2024", "SPRING_2025", "SUMMER_2025", "FALL_2025",
  "FALL", "SPRING", "SUMMER", "WINTER"
];

const studyModes = [
  "FULL_TIME", "PART_TIME", "ONLINE", "HYBRID"
];

export default function ProfileFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  originalProfileData,
}: ProfileFormModalProps) {
  const [formData, setFormData] = useState<StudentProfileRequest>({
    gpa: initialData?.gpa || 3.0,
    experience_years: initialData?.experience_years || 0,
    research_experience: initialData?.research_experience || false,
    publications_count: initialData?.publications_count || 0,
    work_experience_relevant: initialData?.work_experience_relevant || false,
    leadership_experience: initialData?.leadership_experience || false,
    current_education_level: initialData?.current_education_level || "BACHELORS",
    field_of_study: initialData?.field_of_study || "Computer Science",
    institution_name: initialData?.institution_name || "",
    desired_program: initialData?.desired_program || "MASTERS",
    preferred_countries: initialData?.preferred_countries || [],
    ielts_score: initialData?.ielts_score,
    toefl_score: initialData?.toefl_score,
    gre_score: initialData?.gre_score,
    gmat_score: initialData?.gmat_score,
    budget_usd: initialData?.budget_usd,
    preferred_intake: initialData?.preferred_intake,
    study_mode: initialData?.study_mode,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleResetToProfile = () => {
    if (originalProfileData) {
      setFormData(originalProfileData);
      setErrors({});
    }
  };

  // Conditional field visibility
  const showTestScores = ["MASTERS", "PHD", "MBA", "RESEARCH_MASTERS"].includes(formData.desired_program);
  const showResearchFields = ["MASTERS", "PHD", "RESEARCH_MASTERS", "RESEARCH_FELLOWSHIP"].includes(formData.desired_program);
  const showWorkExperience = ["MBA", "EXECUTIVE_EDUCATION"].includes(formData.desired_program);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.gpa || formData.gpa < 0 || formData.gpa > 4) {
      newErrors.gpa = "GPA must be between 0.0 and 4.0";
    }

    if (!formData.current_education_level) {
      newErrors.current_education_level = "Current education level is required";
    }

    if (!formData.field_of_study) {
      newErrors.field_of_study = "Field of study is required";
    }

    if (!formData.desired_program) {
      newErrors.desired_program = "Desired program is required";
    }

    // Validate test scores if entered
    if (formData.ielts_score && (formData.ielts_score < 0 || formData.ielts_score > 9)) {
      newErrors.ielts_score = "IELTS score must be between 0.0 and 9.0";
    }

    if (formData.toefl_score && (formData.toefl_score < 0 || formData.toefl_score > 120)) {
      newErrors.toefl_score = "TOEFL score must be between 0 and 120";
    }

    if (formData.gre_score && (formData.gre_score < 260 || formData.gre_score > 340)) {
      newErrors.gre_score = "GRE score must be between 260 and 340";
    }

    if (formData.gmat_score && (formData.gmat_score < 200 || formData.gmat_score > 800)) {
      newErrors.gmat_score = "GMAT score must be between 200 and 800";
    }

    // Validate experience years
    if (formData.experience_years < 0) {
      newErrors.experience_years = "Experience years cannot be negative";
    }

    // Validate publications
    if (formData.publications_count < 0) {
      newErrors.publications_count = "Publications count cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "gpa") {
      const numValue = parseFloat(value) || 0;
      setFormData(prev => ({ ...prev, [name]: Math.min(4, Math.max(0, numValue)) }));
    } else if (name === "experience_years" || name === "publications_count") {
      const numValue = parseInt(value) || 0;
      setFormData(prev => ({ ...prev, [name]: Math.max(0, numValue) }));
    } else if (["ielts_score", "budget_usd"].includes(name)) {
      const numValue = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue || undefined }));
    } else if (["toefl_score", "gre_score", "gmat_score"].includes(name)) {
      const numValue = parseInt(value);
      setFormData(prev => ({ ...prev, [name]: numValue || undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryToggle = (country: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_countries: prev.preferred_countries.includes(country)
        ? prev.preferred_countries.filter(c => c !== country)
        : [...prev.preferred_countries, country]
    }));
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <HelpCircle className="w-4 h-4 text-gray-400 cursor-help ml-1" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded-lg z-50">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
            <p className="text-sm text-gray-500 mt-1">Complete your profile for personalized recommendations</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Education Level *
                </label>
                <select
                  name="current_education_level"
                  value={formData.current_education_level}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.current_education_level ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select education level</option>
                  {educationLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                {errors.current_education_level && (
                  <p className="mt-1 text-sm text-red-600">{errors.current_education_level}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study *
                </label>
                <select
                  name="field_of_study"
                  value={formData.field_of_study}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.field_of_study ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select field of study</option>
                  {fieldsOfStudy.map(field => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
                {errors.field_of_study && (
                  <p className="mt-1 text-sm text-red-600">{errors.field_of_study}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (0-4 scale) *
                  </label>
                  <Tooltip text="Enter your GPA on a 4.0 scale. Most competitive programs require 3.0+" />
                </div>
                <input
                  type="number"
                  name="gpa"
                  min="0"
                  max="4"
                  step="0.1"
                  value={formData.gpa}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gpa ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.gpa && (
                  <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Example: 3.5 for a B+ average</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institution_name"
                  value={formData.institution_name || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., University of Example"
                />
              </div>
            </div>
          </div>

          {/* Test Scores Section - Conditional */}
          {showTestScores && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Test Scores</h3>
              <p className="text-sm text-gray-600">Required or recommended for {formData.desired_program} programs</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IELTS Score
                    </label>
                    <Tooltip text="IELTS: 0-9 scale (6.5+ usually required for English programs)" />
                  </div>
                  <input
                    type="number"
                    name="ielts_score"
                    min="0"
                    max="9"
                    step="0.5"
                    value={formData.ielts_score || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.ielts_score ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 7.5"
                  />
                  {errors.ielts_score && (
                    <p className="mt-1 text-sm text-red-600">{errors.ielts_score}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">0-9 scale (6.5+ recommended)</p>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TOEFL Score
                    </label>
                    <Tooltip text="TOEFL: 0-120 scale (90+ usually required)" />
                  </div>
                  <input
                    type="number"
                    name="toefl_score"
                    min="0"
                    max="120"
                    value={formData.toefl_score || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.toefl_score ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 100"
                  />
                  {errors.toefl_score && (
                    <p className="mt-1 text-sm text-red-600">{errors.toefl_score}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">0-120 scale (90+ recommended)</p>
                </div>

                {formData.desired_program === "PHD" && (
                  <>
                    <div>
                      <div className="flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GRE Score
                        </label>
                        <Tooltip text="GRE: 260-340 scale (310+ recommended for competitive programs)" />
                      </div>
                      <input
                        type="number"
                        name="gre_score"
                        min="260"
                        max="340"
                        value={formData.gre_score || ""}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.gre_score ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 320"
                      />
                      {errors.gre_score && (
                        <p className="mt-1 text-sm text-red-600">{errors.gre_score}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">260-340 scale</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GMAT Score
                        </label>
                        <Tooltip text="GMAT: 200-800 scale (650+ recommended for MBA programs)" />
                      </div>
                      <input
                        type="number"
                        name="gmat_score"
                        min="200"
                        max="800"
                        value={formData.gmat_score || ""}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.gmat_score ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 700"
                      />
                      {errors.gmat_score && (
                        <p className="mt-1 text-sm text-red-600">{errors.gmat_score}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">200-800 scale (650+ for MBA)</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Experience Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {showWorkExperience ? "Professional Experience" : "Experience & Achievements"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience_years"
                  min="0"
                  value={formData.experience_years}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.experience_years ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.experience_years && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience_years}</p>
                )}
                {showWorkExperience && (
                  <p className="mt-1 text-xs text-gray-500">MBA programs typically require 2+ years</p>
                )}
              </div>

              {showResearchFields && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publications Count
                  </label>
                  <input
                    type="number"
                    name="publications_count"
                    min="0"
                    value={formData.publications_count}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.publications_count ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.publications_count && (
                    <p className="mt-1 text-sm text-red-600">{errors.publications_count}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Research publications, papers, etc.</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {showResearchFields && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="research_experience"
                    checked={formData.research_experience}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Research Experience</span>
                  <Tooltip text="Research experience is valuable for Master's and PhD programs" />
                </label>
              )}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="work_experience_relevant"
                  checked={formData.work_experience_relevant}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Relevant Work Experience</span>
                <Tooltip text="Work experience related to your field of study" />
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="leadership_experience"
                  checked={formData.leadership_experience}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Leadership Experience</span>
                <Tooltip text="Leadership roles, team management, project leadership" />
              </label>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Study Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Program *
                </label>
                <select
                  name="desired_program"
                  value={formData.desired_program}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.desired_program ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select program type</option>
                  {programTypes.map(program => (
                    <option key={program.value} value={program.value}>
                      {program.label}
                    </option>
                  ))}
                </select>
                {errors.desired_program && (
                  <p className="mt-1 text-sm text-red-600">{errors.desired_program}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (USD per year)
                  </label>
                  <Tooltip text="Annual tuition budget including living expenses" />
                </div>
                <input
                  type="number"
                  name="budget_usd"
                  min="0"
                  step="1000"
                  value={formData.budget_usd || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30000"
                />
                <p className="mt-1 text-xs text-gray-500">Average: $20,000-$50,000 per year</p>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Intake
                  </label>
                  <Tooltip text="Format: SEASON_YEAR (e.g., FALL_2024) or just SEASON" />
                </div>
                <input
                  type="text"
                  name="preferred_intake"
                  value={formData.preferred_intake || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., FALL_2024 or FALL"
                  list="intake-options"
                />
                <datalist id="intake-options">
                  {intakeOptions.map(intake => (
                    <option key={intake} value={intake} />
                  ))}
                </datalist>
                <p className="mt-1 text-xs text-gray-500">Examples: FALL_2024, SPRING_2025, FALL</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Study Mode
                </label>
                <select
                  name="study_mode"
                  value={formData.study_mode || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select study mode</option>
                  {studyModes.map(mode => (
                    <option key={mode} value={mode}>
                      {mode.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Countries (Select multiple)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {countries.map(country => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleCountryToggle(country)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      formData.preferred_countries.includes(country)
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
              {formData.preferred_countries.length > 0 ? (
                <p className="text-sm text-gray-600">
                  Selected: {formData.preferred_countries.join(", ")}
                </p>
              ) : (
                <p className="text-sm text-gray-500">No countries selected - will consider all countries</p>
              )}
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <span>{showAdvanced ? '▲ Hide' : '▼ Show'} Advanced Options</span>
            </button>
            
            {showAdvanced && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-900">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add any additional advanced fields here */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements
                    </label>
                    <textarea
                      name="special_requirements"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows={2}
                      placeholder="Any special requirements or considerations..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="additional_notes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows={2}
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Fields marked with * are required
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {originalProfileData && (
                <button
                  type="button"
                  onClick={handleResetToProfile}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset to Profile
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Recommendations
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}