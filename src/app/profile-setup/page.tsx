// // app/profile-setup/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import ProfileProgressBar from "@/components/profile-s2/ProfileProgressBar";
// import FormSectionCard from "@/components/profile-s2/FormSectionCard";
// import FormInput from "@/components/profile-s2/FormInput";
// import FormSelect from "@/components/profile-s2/FormSelect";
// import FormActions from "@/components/profile-s2/FormActions";
// import DocumentLayout from "@/components/layouts/DocumentLayout";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dateOfBirth: string;
//   nationality: string;
//   educationLevel: string;
//   institution: string;
//   major: string;
//   gpa: string;
//   ieltsScore: string;
//   desiredProgram: string;
//   preferredCountry: string;
//   budgetRange: string;
//   preferredIntake: string;
// };

// const nationalityOptions = [
//   { value: "us", label: "United States" },
//   { value: "uk", label: "United Kingdom" },
//   { value: "ca", label: "Canada" },
//   { value: "pk", label: "Pakistan" },
//   { value: "in", label: "India" },
//   { value: "other", label: "Other" },
// ];

// const educationLevelOptions = [
//   { value: "bachelors", label: "Bachelor's Degree" },
//   { value: "masters", label: "Master's Degree" },
//   { value: "phd", label: "PhD" },
//   { value: "diploma", label: "Diploma" },
// ];

// const programOptions = [
//   { value: "masters", label: "Master's" },
//   { value: "bachelors", label: "Bachelor's" },
//   { value: "phd", label: "PhD" },
// ];

// const countryOptions = [
//   { value: "canada", label: "Canada" },
//   { value: "usa", label: "United States" },
//   { value: "uk", label: "United Kingdom" },
//   { value: "australia", label: "Australia" },
// ];

// const budgetOptions = [
//   { value: "20-40", label: "$20,000 - $40,000" },
//   { value: "40-60", label: "$40,000 - $60,000" },
//   { value: "60-75", label: "$60,000 - $75,000" },
//   { value: "75+", label: "$75,000+" },
// ];

// const intakeOptions = [
//   { value: "fall2024", label: "Fall 2024" },
//   { value: "spring2025", label: "Spring 2025" },
//   { value: "fall2025", label: "Fall 2025" },
// ];

// export default function ProfileSetupPage() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "John",
//     lastName: "Doe",
//     email: "nn@student.com",
//     phone: "+1-555-0123",
//     dateOfBirth: "05/15/1998",
//     nationality: "us",
//     educationLevel: "bachelors",
//     institution: "State University",
//     major: "Computer Science",
//     gpa: "3.7",
//     ieltsScore: "7.5",
//     desiredProgram: "masters",
//     preferredCountry: "canada",
//     budgetRange: "60-75",
//     preferredIntake: "fall2024",
//   });

//   const [isSaving, setIsSaving] = useState(false);
//   const [progress, setProgress] = useState(0);

//   // Calculate profile completion
//   useEffect(() => {
//     const fields = Object.values(formData);
//     const filledFields = fields.filter((field) => field.trim() !== "").length;
//     const percentage = Math.round((filledFields / fields.length) * 100);
//     setProgress(percentage);
//   }, [formData]);

//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     // Simulate API call
//     setTimeout(() => {
//       console.log("Saving profile:", formData);
//       setIsSaving(false);
//       // Show success message
//     }, 1500);
//   };

//   const handleCancel = () => {
//     console.log("Cancelled");
//     // Reset form or navigate away
//   };

//   return (
//     <DocumentLayout>
//     <div className="pt-10"></div>
//     <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//       {/* Breadcrumb */}
//       <Breadcrumb
//         items={[
//           { label: "Dashboard", href: "/dashboard" },
//           { label: "Profile Setup" },
//         ]}
//       />

//       {/* Page Header */}
//       <PageHeader
//         title="Profile Setup"
//         description="Complete your personal and academic information"
//         completionPercentage={progress}
//       />

//       {/* Progress Bar */}
//       <ProfileProgressBar percentage={progress} />

//       {/* Form Sections */}
//       <div className="space-y-6">
//         {/* Personal Information & Academic Information - Side by Side on Desktop */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Personal Information */}
//           <FormSectionCard
//             title="Personal Information"
//             description="Basic personal details"
//           >
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <FormInput
//                   label="First Name"
//                   value={formData.firstName}
//                   onChange={(value) => handleInputChange("firstName", value)}
//                   required
//                 />
//                 <FormInput
//                   label="Last Name"
//                   value={formData.lastName}
//                   onChange={(value) => handleInputChange("lastName", value)}
//                   required
//                 />
//               </div>

//               <FormInput
//                 label="Email Address"
//                 type="email"
//                 value={formData.email}
//                 onChange={(value) => handleInputChange("email", value)}
//                 required
//               />

//               <FormInput
//                 label="Phone Number"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(value) => handleInputChange("phone", value)}
//                 required
//               />

//               <FormInput
//                 label="Date of Birth"
//                 type="text"
//                 value={formData.dateOfBirth}
//                 onChange={(value) => handleInputChange("dateOfBirth", value)}
//                 placeholder="MM/DD/YYYY"
//                 required
//               />

//               <FormSelect
//                 label="Nationality"
//                 value={formData.nationality}
//                 onChange={(value) => handleInputChange("nationality", value)}
//                 options={nationalityOptions}
//                 required
//               />
//             </div>
//           </FormSectionCard>

//           {/* Academic Information */}
//           <FormSectionCard
//             title="Academic Information"
//             description="Current education and qualifications"
//           >
//             <div className="space-y-4">
//               <FormSelect
//                 label="Current Education Level"
//                 value={formData.educationLevel}
//                 onChange={(value) => handleInputChange("educationLevel", value)}
//                 options={educationLevelOptions}
//                 required
//               />

//               <FormInput
//                 label="Institution Name"
//                 value={formData.institution}
//                 onChange={(value) => handleInputChange("institution", value)}
//                 required
//               />

//               <FormInput
//                 label="Major/Field of Study"
//                 value={formData.major}
//                 onChange={(value) => handleInputChange("major", value)}
//                 required
//               />

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <FormInput
//                   label="GPA (4.0 scale)"
//                   type="text"
//                   value={formData.gpa}
//                   onChange={(value) => handleInputChange("gpa", value)}
//                   placeholder="3.5"
//                   required
//                 />
//                 <FormInput
//                   label="IELTS Score"
//                   type="text"
//                   value={formData.ieltsScore}
//                   onChange={(value) => handleInputChange("ieltsScore", value)}
//                   placeholder="7.0"
//                   required
//                 />
//               </div>
//             </div>
//           </FormSectionCard>
//         </div>

//         {/* Study Preferences - Full Width */}
//         <FormSectionCard
//           title="Study Preferences"
//           description="Your preferences for future studies"
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <FormSelect
//               label="Desired Program"
//               value={formData.desiredProgram}
//               onChange={(value) => handleInputChange("desiredProgram", value)}
//               options={programOptions}
//               required
//             />

//             <FormSelect
//               label="Preferred Country"
//               value={formData.preferredCountry}
//               onChange={(value) =>
//                 handleInputChange("preferredCountry", value)
//               }
//               options={countryOptions}
//               required
//             />

//             <FormSelect
//               label="Budget Range (USD)"
//               value={formData.budgetRange}
//               onChange={(value) => handleInputChange("budgetRange", value)}
//               options={budgetOptions}
//               required
//             />

//             <FormSelect
//               label="Preferred Intake"
//               value={formData.preferredIntake}
//               onChange={(value) => handleInputChange("preferredIntake", value)}
//               options={intakeOptions}
//               required
//             />
//           </div>
//         </FormSectionCard>

//         {/* Form Actions */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//           <FormActions
//             onCancel={handleCancel}
//             onSave={handleSave}
//             loading={isSaving}
//           />
//         </div>
//       </div>
//     </div>
//     </DocumentLayout>
//   );
// }






// // src/app/profile-setup/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import ProfileProgressBar from "@/components/profile-s2/ProfileProgressBar";
// import FormSectionCard from "@/components/profile-s2/FormSectionCard";
// import FormInput from "@/components/profile-s2/FormInput";
// import FormSelect from "@/components/profile-s2/FormSelect";
// import FormActions from "@/components/profile-s2/FormActions";
// import DocumentLayout from "@/components/layouts/DocumentLayout";
// import { useProfile } from "@/hooks/useProfile";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   dateOfBirth: string;
//   nationality: string;
//   gender: string;
//   educationLevel: string;
//   institution: string;
//   major: string;
//   gpa: string;
//   ieltsScore: string;
//   academicYear: string;
//   desiredProgram: string;
//   preferredCountry: string;
//   budgetRangeMin: string;
//   budgetRangeMax: string;
//   preferredIntake: string;
//   studyMode: string;
// };

// // Default gender options
// const genderOptions = [
//   { value: "Male", label: "Male" },
//   { value: "Female", label: "Female" },
//   { value: "Other", label: "Other" },
//   { value: "Prefer not to say", label: "Prefer not to say" },
// ];

// // Default study mode options
// const studyModeOptions = [
//   { value: "FULL_TIME", label: "Full Time" },
//   { value: "PART_TIME", label: "Part Time" },
//   { value: "ONLINE", label: "Online" },
//   { value: "HYBRID", label: "Hybrid" },
// ];

// export default function ProfileSetupPage() {
//   const router = useRouter();
//   const {
//     profile,
//     loading,
//     saving,
//     stats,
//     dropdownData,
//     updateProfile,
//     formatFormData,
//     parseProfileForForm,
//     loadPrograms,
//   } = useProfile();

//   const [formData, setFormData] = useState<FormData>(() => 
//     parseProfileForForm(profile)
//   );
//   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

//   // Update form when profile loads
//   useEffect(() => {
//     if (profile) {
//       setFormData(parseProfileForForm(profile));
//     }
//   }, [profile]);

//   // Load programs when education level changes
//   useEffect(() => {
//     if (formData.educationLevel) {
//       loadPrograms(formData.educationLevel);
//     }
//   }, [formData.educationLevel, loadPrograms]);

//   // Update progress from stats
//   const progress = stats.completionPercentage;

//   // Handle form validation
//   const validateForm = (): boolean => {
//     const errors: Record<string, string> = {};

//     // Validate GPA (0-4.0)
//     if (formData.gpa) {
//       const gpa = parseFloat(formData.gpa);
//       if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
//         errors.gpa = "GPA must be between 0 and 4.0";
//       }
//     }

//     // Validate IELTS (0-9)
//     if (formData.ieltsScore) {
//       const ielts = parseFloat(formData.ieltsScore);
//       if (isNaN(ielts) || ielts < 0 || ielts > 9) {
//         errors.ieltsScore = "IELTS score must be between 0 and 9";
//       }
//     }

//     // Validate budget range
//     if (formData.budgetRangeMin && formData.budgetRangeMax) {
//       const min = parseInt(formData.budgetRangeMin);
//       const max = parseInt(formData.budgetRangeMax);
//       if (isNaN(min) || isNaN(max) || min > max) {
//         errors.budgetRangeMin = "Minimum budget cannot be greater than maximum";
//         errors.budgetRangeMax = "Maximum budget cannot be less than minimum";
//       }
//     }

//     // Validate academic year
//     if (formData.academicYear) {
//       const year = parseInt(formData.academicYear);
//       const currentYear = new Date().getFullYear();
//       if (isNaN(year) || year < 1900 || year > currentYear) {
//         errors.academicYear = "Please enter a valid year";
//       }
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Clear validation error for this field
//     if (validationErrors[field]) {
//       setValidationErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       toast.error("Please fix the validation errors before saving");
//       return;
//     }

//     // Prepare data for API
//     const apiData = {
//       ...formatFormData(formData),
//       budgetRangeMin: formData.budgetRangeMin ? parseInt(formData.budgetRangeMin) : undefined,
//       budgetRangeMax: formData.budgetRangeMax ? parseInt(formData.budgetRangeMax) : undefined,
//       academicYear: formData.academicYear ? parseInt(formData.academicYear) : undefined,
//     };

//     const result = await updateProfile(apiData);
    
//     if (result) {
//       toast.success("Profile saved successfully!");
//       router.push("/dashboard");
//     }
//   };

//   const handleCancel = () => {
//     if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
//       router.back();
//     }
//   };

//   // Generate budget options from form data
//   const budgetOptions = formData.budgetRangeMin && formData.budgetRangeMax ? [
//     { 
//       value: `${formData.budgetRangeMin}-${formData.budgetRangeMax}`, 
//       label: `$${parseInt(formData.budgetRangeMin).toLocaleString()} - $${parseInt(formData.budgetRangeMax).toLocaleString()}`
//     }
//   ] : [];

//   if (loading && !profile) {
//     return (
//       <DocumentLayout>
//         <div className="pt-10" />
//         <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading profile...</p>
//             </div>
//           </div>
//         </div>
//       </DocumentLayout>
//     );
//   }

//   return (
//     <DocumentLayout>
//       <div className="pt-10"></div>
//       <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "Profile Setup" },
//           ]}
//         />

//         {/* Page Header */}
//         <PageHeader
//           title="Profile Setup"
//           description="Complete your personal and academic information"
//           completionPercentage={progress}
//         />

//         {/* Progress Bar */}
//         <ProfileProgressBar percentage={progress} />

//         {/* Form Sections */}
//         <div className="space-y-6">
//           {/* Personal Information & Academic Information - Side by Side on Desktop */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Personal Information */}
//             <FormSectionCard
//               title="Personal Information"
//               description="Basic personal details"
//             >
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <FormInput
//                       label="First Name"
//                       value={formData.firstName}
//                       onChange={(value) => handleInputChange("firstName", value)}
//                       required
//                     />
//                     {validationErrors.firstName && (
//                       <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
//                     )}
//                   </div>
//                   <div>
//                     <FormInput
//                       label="Last Name"
//                       value={formData.lastName}
//                       onChange={(value) => handleInputChange("lastName", value)}
//                       required
//                     />
//                     {validationErrors.lastName && (
//                       <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <FormSelect
//                     label="Gender"
//                     value={formData.gender}
//                     onChange={(value) => handleInputChange("gender", value)}
//                     options={genderOptions}
//                   />
//                 </div>

//                 <div>
//                   <FormInput
//                     label="Phone Number"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(value) => handleInputChange("phone", value)}
//                     required
//                   />
//                   {validationErrors.phone && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormInput
//                     label="Date of Birth"
//                     type="date"
//                     value={formData.dateOfBirth}
//                     onChange={(value) => handleInputChange("dateOfBirth", value)}
//                     required
//                   />
//                   {validationErrors.dateOfBirth && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.dateOfBirth}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormSelect
//                     label="Nationality"
//                     value={formData.nationality}
//                     onChange={(value) => handleInputChange("nationality", value)}
//                     options={dropdownData.countries}
//                     placeholder="Select nationality"
//                     required
//                   />
//                   {validationErrors.nationality && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.nationality}</p>
//                   )}
//                 </div>
//               </div>
//             </FormSectionCard>

//             {/* Academic Information */}
//             <FormSectionCard
//               title="Academic Information"
//               description="Current education and qualifications"
//             >
//               <div className="space-y-4">
//                 <div>
//                   <FormSelect
//                     label="Current Education Level"
//                     value={formData.educationLevel}
//                     onChange={(value) => handleInputChange("educationLevel", value)}
//                     options={dropdownData.educationLevels}
//                     placeholder="Select education level"
//                     required
//                   />
//                   {validationErrors.educationLevel && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.educationLevel}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormInput
//                     label="Institution Name"
//                     value={formData.institution}
//                     onChange={(value) => handleInputChange("institution", value)}
//                     required
//                   />
//                   {validationErrors.institution && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.institution}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormInput
//                     label="Major/Field of Study"
//                     value={formData.major}
//                     onChange={(value) => handleInputChange("major", value)}
//                     required
//                   />
//                   {validationErrors.major && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.major}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div>
//                     <FormInput
//                       label="GPA (4.0 scale)"
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       max="4.0"
//                       value={formData.gpa}
//                       onChange={(value) => handleInputChange("gpa", value)}
//                       placeholder="3.5"
//                       required
//                     />
//                     {validationErrors.gpa && (
//                       <p className="text-red-500 text-xs mt-1">{validationErrors.gpa}</p>
//                     )}
//                   </div>
//                   <div>
//                     <FormInput
//                       label="IELTS Score"
//                       type="number"
//                       step="0.5"
//                       min="0"
//                       max="9"
//                       value={formData.ieltsScore}
//                       onChange={(value) => handleInputChange("ieltsScore", value)}
//                       placeholder="7.0"
//                       required
//                     />
//                     {validationErrors.ieltsScore && (
//                       <p className="text-red-500 text-xs mt-1">{validationErrors.ieltsScore}</p>
//                     )}
//                   </div>
//                   <div>
//                     <FormInput
//                       label="Academic Year"
//                       type="number"
//                       min="1900"
//                       max={new Date().getFullYear()}
//                       value={formData.academicYear}
//                       onChange={(value) => handleInputChange("academicYear", value)}
//                       placeholder="2023"
//                     />
//                     {validationErrors.academicYear && (
//                       <p className="text-red-500 text-xs mt-1">{validationErrors.academicYear}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </FormSectionCard>
//           </div>

//           {/* Study Preferences - Full Width */}
//           <FormSectionCard
//             title="Study Preferences"
//             description="Your preferences for future studies"
//           >
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <FormSelect
//                     label="Desired Program"
//                     value={formData.desiredProgram}
//                     onChange={(value) => handleInputChange("desiredProgram", value)}
//                     options={dropdownData.programs}
//                     placeholder={formData.educationLevel ? "Select program" : "Select education level first"}
//                     required
//                     disabled={!formData.educationLevel}
//                   />
//                   {validationErrors.desiredProgram && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.desiredProgram}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormSelect
//                     label="Preferred Country"
//                     value={formData.preferredCountry}
//                     onChange={(value) => handleInputChange("preferredCountry", value)}
//                     options={dropdownData.countries}
//                     placeholder="Select country"
//                     required
//                   />
//                   {validationErrors.preferredCountry && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.preferredCountry}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormSelect
//                     label="Study Mode"
//                     value={formData.studyMode}
//                     onChange={(value) => handleInputChange("studyMode", value)}
//                     options={studyModeOptions}
//                     placeholder="Select study mode"
//                     required
//                   />
//                   {validationErrors.studyMode && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.studyMode}</p>
//                   )}
//                 </div>

//                 <div>
//                   <FormInput
//                     label="Preferred Intake"
//                     value={formData.preferredIntake}
//                     onChange={(value) => handleInputChange("preferredIntake", value)}
//                     placeholder="e.g., Fall 2024"
//                     required
//                   />
//                   {validationErrors.preferredIntake && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.preferredIntake}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <FormInput
//                     label="Minimum Budget (USD)"
//                     type="number"
//                     value={formData.budgetRangeMin}
//                     onChange={(value) => handleInputChange("budgetRangeMin", value)}
//                     placeholder="20000"
//                   />
//                   {validationErrors.budgetRangeMin && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.budgetRangeMin}</p>
//                   )}
//                 </div>
//                 <div>
//                   <FormInput
//                     label="Maximum Budget (USD)"
//                     type="number"
//                     value={formData.budgetRangeMax}
//                     onChange={(value) => handleInputChange("budgetRangeMax", value)}
//                     placeholder="50000"
//                   />
//                   {validationErrors.budgetRangeMax && (
//                     <p className="text-red-500 text-xs mt-1">{validationErrors.budgetRangeMax}</p>
//                   )}
//                 </div>
//               </div>

//               {budgetOptions.length > 0 && (
//                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-blue-700">
//                     <span className="font-semibold">Selected Budget Range:</span> {budgetOptions[0].label}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </FormSectionCard>

//           {/* Form Actions */}
//           <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//             <FormActions
//               onCancel={handleCancel}
//               onSave={handleSave}
//               loading={saving}
//               disabled={!validateForm()}
//             />
//           </div>
//         </div>
//       </div>
//     </DocumentLayout>
//   );
// }










// src/app/profile-setup/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import ProfileProgressBar from "@/components/profile-s2/ProfileProgressBar";
import FormSectionCard from "@/components/profile-s2/FormSectionCard";
import FormInput from "@/components/profile-s2/FormInput";
import FormSelect from "@/components/profile-s2/FormSelect";
import FormActions from "@/components/profile-s2/FormActions";
import DocumentLayout from "@/components/layouts/DocumentLayout";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  educationLevel: string;
  institution: string;
  major: string;
  gpa: string;
  ieltsScore: string;
  academicYear: string;
  desiredProgram: string;
  preferredCountry: string;
  budgetRangeMin: string;
  budgetRangeMax: string;
  preferredIntake: string;
  studyMode: string;
};

// Default gender options
const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

// Default study mode options
const studyModeOptions = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Hybrid" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const {
    profile,
    loading,
    saving,
    stats,
    dropdownData,
    updateProfile,
    formatFormData,
    parseProfileForForm,
    loadPrograms,
  } = useProfile();

  const [formData, setFormData] = useState<FormData>(() => 
    parseProfileForForm(profile)
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Memoize the initial form data
  const initialFormData = useMemo(() => parseProfileForForm(profile), [profile]);

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData(parseProfileForForm(profile));
    }
  }, [profile]);

  // Load programs when education level changes - FIXED: useCallback
  useEffect(() => {
    if (formData.educationLevel) {
      loadPrograms(formData.educationLevel);
    }
  }, [formData.educationLevel]); // Removed loadPrograms from dependency array

  // Update progress from stats
  const progress = stats.completionPercentage;

  // Replace the current validateForm function with this:
const validateForm = useCallback((validateAll = false): boolean => {
  const errors: Record<string, string> = {};
  
  // Only validate if the field has been touched or if we're validating all fields (on save)
  const shouldValidate = (field: string) => {
    return validateAll || touchedFields[field];
  };

  // Validate required fields
  if (shouldValidate("firstName") && !formData.firstName.trim()) errors.firstName = "First name is required";
  if (shouldValidate("lastName") && !formData.lastName.trim()) errors.lastName = "Last name is required";
  if (shouldValidate("phone") && !formData.phone.trim()) errors.phone = "Phone number is required";
  if (shouldValidate("dateOfBirth") && !formData.dateOfBirth.trim()) errors.dateOfBirth = "Date of birth is required";
  if (shouldValidate("nationality") && !formData.nationality.trim()) errors.nationality = "Nationality is required";
  if (shouldValidate("educationLevel") && !formData.educationLevel.trim()) errors.educationLevel = "Education level is required";
  if (shouldValidate("institution") && !formData.institution.trim()) errors.institution = "Institution name is required";
  if (shouldValidate("major") && !formData.major.trim()) errors.major = "Major/Field of study is required";
  if (shouldValidate("desiredProgram") && !formData.desiredProgram.trim()) errors.desiredProgram = "Desired program is required";
  if (shouldValidate("preferredCountry") && !formData.preferredCountry.trim()) errors.preferredCountry = "Preferred country is required";
  if (shouldValidate("preferredIntake") && !formData.preferredIntake.trim()) errors.preferredIntake = "Preferred intake is required";

  // Validate GPA (only if touched or has value)
  if (shouldValidate("gpa") && formData.gpa) {
    const gpa = parseFloat(formData.gpa);
    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
      errors.gpa = "GPA must be between 0 and 4.0";
    }
  } else if (shouldValidate("gpa") && !formData.gpa.trim()) {
    errors.gpa = "GPA is required";
  }

  // Similar logic for other fields...

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
}, [formData]);

// Add this state to track touched fields
const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

// Update the handleInputChange function:
const handleInputChange = useCallback((field: keyof FormData, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  // Mark field as touched
  setTouchedFields((prev) => ({
    ...prev,
    [field]: true,
  }));

  // Clear validation error for this field
  setValidationErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[field];
    return newErrors;
  });
}, []);

// Update handleSave to validate all fields:
const handleSave = async () => {
  if (!validateForm(true)) { // Pass true to validate all fields
    toast.error("Please fix the validation errors before saving");
    return;
  }

    // Prepare data for API
    const apiData = {
      ...formatFormData(formData),
      budgetRangeMin: formData.budgetRangeMin ? parseInt(formData.budgetRangeMin) : undefined,
      budgetRangeMax: formData.budgetRangeMax ? parseInt(formData.budgetRangeMax) : undefined,
      academicYear: formData.academicYear ? parseInt(formData.academicYear) : undefined,
    };

    const result = await updateProfile(apiData);
    
    if (result) {
      toast.success("Profile saved successfully!");
      router.push("/dashboard");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      // Check if form has been modified
      const isModified = JSON.stringify(formData) !== JSON.stringify(initialFormData);
      
      if (isModified) {
        const discardChanges = window.confirm(
          "You have unsaved changes. Are you sure you want to discard them?"
        );
        if (!discardChanges) return;
      }
      
      router.back();
    }
  };

  // Memoize form validity to prevent unnecessary re-renders
  const isFormValid = useMemo(() => validateForm(), [validateForm]);

  // Generate budget options from form data
  const budgetOptions = formData.budgetRangeMin && formData.budgetRangeMax ? [
    { 
      value: `${formData.budgetRangeMin}-${formData.budgetRangeMax}`, 
      label: `$${parseInt(formData.budgetRangeMin).toLocaleString()} - $${parseInt(formData.budgetRangeMax).toLocaleString()}`
    }
  ] : [];

  if (loading && !profile) {
    return (
      <DocumentLayout>
        <div className="pt-10" />
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </DocumentLayout>
    );
  }

  return (
    <DocumentLayout>
      <div className="pt-10"></div>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Profile Setup" },
          ]}
        />

        {/* Page Header */}
        <PageHeader
          title="Profile Setup"
          description="Complete your personal and academic information"
          completionPercentage={progress}
        />

        {/* Progress Bar */}
        <ProfileProgressBar percentage={progress} />

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information & Academic Information - Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <FormSectionCard
              title="Personal Information"
              description="Basic personal details"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FormInput
                      label="First Name"
                      value={formData.firstName}
                      onChange={(value) => handleInputChange("firstName", value)}
                      required
                      error={validationErrors.firstName}
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(value) => handleInputChange("lastName", value)}
                      required
                      error={validationErrors.lastName}
                    />
                  </div>
                </div>

                <div>
                  <FormSelect
                    label="Gender"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                    options={genderOptions}
                    error={validationErrors.gender}
                  />
                </div>

                <div>
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => handleInputChange("phone", value)}
                    required
                    error={validationErrors.phone}
                  />
                </div>

                <div>
                  <FormInput
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    required
                    error={validationErrors.dateOfBirth}
                  />
                </div>

                <div>
                  <FormSelect
                    label="Nationality"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                    options={dropdownData.countries}
                    placeholder="Select nationality"
                    required
                    error={validationErrors.nationality}
                  />
                </div>
              </div>
            </FormSectionCard>

            {/* Academic Information */}
            <FormSectionCard
              title="Academic Information"
              description="Current education and qualifications"
            >
              <div className="space-y-4">
                <div>
                  <FormSelect
                    label="Current Education Level"
                    value={formData.educationLevel}
                    onChange={(value) => handleInputChange("educationLevel", value)}
                    options={dropdownData.educationLevels}
                    placeholder="Select education level"
                    required
                    error={validationErrors.educationLevel}
                  />
                </div>

                <div>
                  <FormInput
                    label="Institution Name"
                    value={formData.institution}
                    onChange={(value) => handleInputChange("institution", value)}
                    required
                    error={validationErrors.institution}
                  />
                </div>

                <div>
                  <FormInput
                    label="Major/Field of Study"
                    value={formData.major}
                    onChange={(value) => handleInputChange("major", value)}
                    required
                    error={validationErrors.major}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <FormInput
                      label="GPA (4.0 scale)"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={formData.gpa}
                      onChange={(value) => handleInputChange("gpa", value)}
                      placeholder="3.5"
                      required
                      error={validationErrors.gpa}
                    />
                  </div>
                  <div>
                    <FormInput
                      label="IELTS Score"
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      value={formData.ieltsScore}
                      onChange={(value) => handleInputChange("ieltsScore", value)}
                      placeholder="7.0"
                      required
                      error={validationErrors.ieltsScore}
                    />
                  </div>
                  <div>
                    <FormInput
                      label="Academic Year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.academicYear}
                      onChange={(value) => handleInputChange("academicYear", value)}
                      placeholder="2023"
                      error={validationErrors.academicYear}
                    />
                  </div>
                </div>
              </div>
            </FormSectionCard>
          </div>

          {/* Study Preferences - Full Width */}
          <FormSectionCard
            title="Study Preferences"
            description="Your preferences for future studies"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <FormSelect
                    label="Desired Program"
                    value={formData.desiredProgram}
                    onChange={(value) => handleInputChange("desiredProgram", value)}
                    options={dropdownData.programs}
                    placeholder={formData.educationLevel ? "Select program" : "Select education level first"}
                    required
                    disabled={!formData.educationLevel}
                    error={validationErrors.desiredProgram}
                  />
                </div>

                <div>
                  <FormSelect
                    label="Preferred Country"
                    value={formData.preferredCountry}
                    onChange={(value) => handleInputChange("preferredCountry", value)}
                    options={dropdownData.countries}
                    placeholder="Select country"
                    required
                    error={validationErrors.preferredCountry}
                  />
                </div>

                <div>
                  <FormSelect
                    label="Study Mode"
                    value={formData.studyMode}
                    onChange={(value) => handleInputChange("studyMode", value)}
                    options={studyModeOptions}
                    placeholder="Select study mode"
                    required
                    error={validationErrors.studyMode}
                  />
                </div>

                <div>
                  <FormInput
                    label="Preferred Intake"
                    value={formData.preferredIntake}
                    onChange={(value) => handleInputChange("preferredIntake", value)}
                    placeholder="e.g., Fall 2024"
                    required
                    error={validationErrors.preferredIntake}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormInput
                    label="Minimum Budget (USD)"
                    type="number"
                    value={formData.budgetRangeMin}
                    onChange={(value) => handleInputChange("budgetRangeMin", value)}
                    placeholder="20000"
                    error={validationErrors.budgetRangeMin}
                  />
                </div>
                <div>
                  <FormInput
                    label="Maximum Budget (USD)"
                    type="number"
                    value={formData.budgetRangeMax}
                    onChange={(value) => handleInputChange("budgetRangeMax", value)}
                    placeholder="50000"
                    error={validationErrors.budgetRangeMax}
                  />
                </div>
              </div>

              {budgetOptions.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Selected Budget Range:</span> {budgetOptions[0].label}
                  </p>
                </div>
              )}
            </div>
          </FormSectionCard>

          {/* Form Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <FormActions
              onCancel={handleCancel}
              onSave={handleSave}
              loading={saving}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </DocumentLayout>
  );
}