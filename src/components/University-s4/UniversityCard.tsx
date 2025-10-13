// // components/UniversityCard.tsx
// "use client";

// import React from "react";
// import {
//   MapPin,
//   DollarSign,
//   Calendar,
//   Heart,
//   ExternalLink,
//   Bookmark,
// } from "lucide-react";

// type UniversityCardProps = {
//   universityName: string;
//   country: string;
//   ranking: string;
//   location: string;
//   tuitionFee: string;
//   deadline: string;
//   matchPercentage: number;
//   programs: string[];
//   requirements: {
//     minGPA: string;
//     minIELTS: string;
//     minSAT?: string;
//   };
//   isRecommended?: boolean;
//   isSaved?: boolean;
//   onSave?: () => void;
//   onVisitWebsite?: () => void;
//   onApplyNow?: () => void;
// };

// export default function UniversityCard({
//   universityName,
//   country,
//   ranking,
//   location,
//   tuitionFee,
//   deadline,
//   matchPercentage,
//   programs,
//   requirements,
//   isRecommended = false,
//   isSaved = false,
//   onSave,
//   onVisitWebsite,
//   onApplyNow,
// }: UniversityCardProps) {
//   const getMatchColor = (percentage: number) => {
//     if (percentage >= 80) return "text-green-600 bg-green-50";
//     if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
//     return "text-orange-600 bg-orange-50";
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-200">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-start gap-3 flex-1">
//           {/* University Logo/Initial */}
//           <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//             <span className="text-white font-bold text-xl">
//               {universityName.substring(0, 2).toUpperCase()}
//             </span>
//           </div>

//           {/* University Name & Location */}
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">
//               {universityName}
//             </h3>
//             <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <MapPin className="w-4 h-4" />
//                 <span>{location}</span>
//               </div>
//               <span className="text-gray-400">•</span>
//               <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
//                 #{ranking}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Match Percentage */}
//         <div
//           className={`px-3 py-1.5 rounded-lg font-semibold text-sm ${getMatchColor(
//             matchPercentage
//           )}`}
//         >
//           {matchPercentage}% Match
//         </div>
//       </div>

//       {/* Available Programs */}
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold text-gray-900 mb-2">
//           Available Programs
//         </h4>
//         <div className="flex flex-wrap gap-2">
//           {programs.map((program, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
//             >
//               {program}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Requirements */}
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold text-gray-900 mb-2">
//           Requirements
//         </h4>
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
//           <div>
//             <span className="text-gray-600">Min GPA:</span>
//             <p className="font-semibold text-gray-900">{requirements.minGPA}</p>
//           </div>
//           <div>
//             <span className="text-gray-600">Min IELTS:</span>
//             <p className="font-semibold text-gray-900">
//               {requirements.minIELTS}
//             </p>
//           </div>
//           {requirements.minSAT && (
//             <div>
//               <span className="text-gray-600">Min SAT:</span>
//               <p className="font-semibold text-gray-900">
//                 {requirements.minSAT}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-200">
//         <div className="flex items-center gap-2 text-sm">
//           <DollarSign className="w-4 h-4 text-gray-500" />
//           <div>
//             <p className="text-gray-600 text-xs">Tuition</p>
//             <p className="font-semibold text-gray-900">{tuitionFee}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 text-sm">
//           <Calendar className="w-4 h-4 text-gray-500" />
//           <div>
//             <p className="text-gray-600 text-xs">Deadline</p>
//             <p className="font-semibold text-gray-900">{deadline}</p>
//           </div>
//         </div>
//       </div>

//       {/* Recommended Badge */}
//       {isRecommended && (
//         <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
//           <Heart className="w-4 h-4 fill-blue-600" />
//           <span className="font-medium">Recommended #1</span>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//         <button
//           onClick={onSave}
//           className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//         >
//           <Bookmark
//             className={`w-4 h-4 ${isSaved ? "fill-blue-600 text-blue-600" : ""}`}
//           />
//           <span>University Watchlist</span>
//         </button>
//         <button
//           onClick={onApplyNow}
//           className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }
//after data 
// components/UniversityCard.tsx
"use client";

import React from "react";
import { MapPin, DollarSign, Calendar, Heart, Bookmark } from "lucide-react";

export type UniversityRequirements = {
  minGPA: string;
  minIELTS: string;
  minSAT?: string;
};

export type UniversityCardProps = {
  universityName: string;
  country: string;
  ranking: string;
  location: string;
  tuitionFee: string;
  deadline: string;
  matchPercentage: number;
  programs: string[];
  requirements: UniversityRequirements;
  isRecommended?: boolean;
  isSaved?: boolean;
  onSave?: () => void;
  onVisitWebsite?: () => void;
  onApplyNow?: () => void;
};

export default function UniversityCard({
  universityName,
  country,
  ranking,
  location,
  tuitionFee,
  deadline,
  matchPercentage,
  programs,
  requirements,
  isRecommended = false,
  isSaved = false,
  onSave,
  onApplyNow,
}: UniversityCardProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* University Initial */}
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">
              {universityName.substring(0, 2).toUpperCase()}
            </span>
          </div>

          {/* University Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {universityName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                #{ranking}
              </span>
            </div>
          </div>
        </div>

        {/* Match Percentage */}
        <div
          className={`px-3 py-1.5 rounded-lg font-semibold text-sm ${getMatchColor(
            matchPercentage
          )}`}
        >
          {matchPercentage}% Match
        </div>
      </div>

      {/* Programs */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Available Programs
        </h4>
        <div className="flex flex-wrap gap-2">
          {programs.map((program, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
            >
              {program}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Requirements
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Min GPA:</span>
            <p className="font-semibold text-gray-900">{requirements.minGPA}</p>
          </div>
          <div>
            <span className="text-gray-600">Min IELTS:</span>
            <p className="font-semibold text-gray-900">
              {requirements.minIELTS}
            </p>
          </div>
          {requirements.minSAT && (
            <div>
              <span className="text-gray-600">Min SAT:</span>
              <p className="font-semibold text-gray-900">
                {requirements.minSAT}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-600 text-xs">Tuition</p>
            <p className="font-semibold text-gray-900">{tuitionFee}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-600 text-xs">Deadline</p>
            <p className="font-semibold text-gray-900">{deadline}</p>
          </div>
        </div>
      </div>

      {/* Recommended */}
      {isRecommended && (
        <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" />
          <span className="font-medium">Recommended #1</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={onSave}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-blue-600 text-blue-600" : ""}`}
          />
          <span>University Watchlist</span>
        </button>
        <button
          onClick={onApplyNow}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
