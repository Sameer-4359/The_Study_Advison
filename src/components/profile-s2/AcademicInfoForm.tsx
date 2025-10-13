// "use client";
// import React, { useState } from "react";

// export default function AcademicInfoForm() {
//   const [education, setEducation] = useState("");
//   const [institution, setInstitution] = useState("");
//   const [major, setMajor] = useState("");
//   const [gpa, setGpa] = useState("");
//   const [ielts, setIelts] = useState("");

//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
//       <h2 className="font-semibold text-gray-800 mb-1">Academic Information</h2>
//       <p className="text-sm text-gray-500 mb-5">
//         Current education and qualifications
//       </p>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Current Education Level</label>
//           <select
//             value={education}
//             onChange={(e) => setEducation(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           >
//             <option value="">Select level</option>
//             <option>High School</option>
//             <option>Bachelor's Degree</option>
//             <option>Master's Degree</option>
//             <option>PhD</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Institution Name</label>
//           <input
//             type="text"
//             placeholder="Enter institution"
//             value={institution}
//             onChange={(e) => setInstitution(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Major / Field of Study</label>
//           <input
//             type="text"
//             placeholder="e.g. Computer Science"
//             value={major}
//             onChange={(e) => setMajor(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-600">GPA (4.0 scale)</label>
//             <input
//               type="text"
//               placeholder="e.g. 3.7"
//               value={gpa}
//               onChange={(e) => setGpa(e.target.value)}
//               className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">IELTS Score</label>
//             <input
//               type="text"
//               placeholder="e.g. 7.5"
//               value={ielts}
//               onChange={(e) => setIelts(e.target.value)}
//               className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//after data folder
"use client";
import React, { useState } from "react";
import {
  educationLevels,
  fieldLabels,
  placeholders,
} from "@/data/profile-s2-data/academicInfoData";

export default function AcademicInfoForm() {
  const [education, setEducation] = useState("");
  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
      <h2 className="font-semibold text-gray-800 mb-1">{fieldLabels.title}</h2>
      <p className="text-sm text-gray-500 mb-5">{fieldLabels.description}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">
            {fieldLabels.educationLevel}
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
          >
            <option value="">Select level</option>
            {educationLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            {fieldLabels.institutionName}
          </label>
          <input
            type="text"
            placeholder={placeholders.institution}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fieldLabels.major}</label>
          <input
            type="text"
            placeholder={placeholders.major}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">{fieldLabels.gpa}</label>
            <input
              type="text"
              placeholder={placeholders.gpa}
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">{fieldLabels.ielts}</label>
            <input
              type="text"
              placeholder={placeholders.ielts}
              value={ielts}
              onChange={(e) => setIelts(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
