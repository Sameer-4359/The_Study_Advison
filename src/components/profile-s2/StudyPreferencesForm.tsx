// "use client";
// import React, { useState } from "react";

// export default function StudyPreferencesForm() {
//   const [program, setProgram] = useState("");
//   const [country, setCountry] = useState("");
//   const [budget, setBudget] = useState("");
//   const [intake, setIntake] = useState("");

//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
//       <h2 className="font-semibold text-gray-800 mb-1">Study Preferences</h2>
//       <p className="text-sm text-gray-500 mb-5">
//         Your preferences for future studies
//       </p>

//       <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Desired Program</label>
//           <select
//             value={program}
//             onChange={(e) => setProgram(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           >
//             <option value="">Select</option>
//             <option>Undergraduate</option>
//             <option>Master’s</option>
//             <option>PhD</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Preferred Country</label>
//           <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           >
//             <option value="">Select country</option>
//             <option>Canada</option>
//             <option>Germany</option>
//             <option>United States</option>
//             <option>Australia</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Budget Range (USD)</label>
//           <select
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           >
//             <option value="">Select budget</option>
//             <option>$10,000 - $25,000</option>
//             <option>$25,000 - $50,000</option>
//             <option>$50,000 - $75,000</option>
//             <option>$75,000 - $100,000</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Preferred Intake</label>
//           <select
//             value={intake}
//             onChange={(e) => setIntake(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-[#4F46E5] text-gray-700"
//           >
//             <option value="">Select intake</option>
//             <option>Spring 2025</option>
//             <option>Fall 2025</option>
//             <option>Winter 2026</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
//after data

// data/studyPreferencesData.ts
export const studyPreferencesData = {
  title: "Study Preferences",
  description: "Your preferences for future studies",
  fields: {
    program: {
      label: "Desired Program",
      placeholder: "Select",
      options: ["Undergraduate", "Master’s", "PhD"],
    },
    country: {
      label: "Preferred Country",
      placeholder: "Select country",
      options: ["Canada", "Germany", "United States", "Australia"],
    },
    budget: {
      label: "Budget Range (USD)",
      placeholder: "Select budget",
      options: [
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000 - $75,000",
        "$75,000 - $100,000",
      ],
    },
    intake: {
      label: "Preferred Intake",
      placeholder: "Select intake",
      options: ["Spring 2025", "Fall 2025", "Winter 2026"],
    },
  },
};
