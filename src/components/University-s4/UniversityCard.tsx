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


// // components/UniversityCard.tsx
// "use client";

// import React from "react";
// import { MapPin, DollarSign, Calendar, Heart, Bookmark } from "lucide-react";

// export type UniversityRequirements = {
//   minGPA: string;
//   minIELTS: string;
//   minSAT?: string;
// };

// export type UniversityCardProps = {
//   universityName: string;
//   country: string;
//   ranking: string;
//   location: string;
//   tuitionFee: string;
//   deadline: string;
//   matchPercentage: number;
//   programs: string[];
//   requirements: UniversityRequirements;
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
//           {/* University Initial */}
//           <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//             <span className="text-white font-bold text-xl">
//               {universityName.substring(0, 2).toUpperCase()}
//             </span>
//           </div>

//           {/* University Info */}
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

//       {/* Programs */}
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

//       {/* Stats */}
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

//       {/* Recommended */}
//       {isRecommended && (
//         <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
//           <Heart className="w-4 h-4 fill-blue-600" />
//           <span className="font-medium">Recommended #1</span>
//         </div>
//       )}

//       {/* Actions */}
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


// components/University-s4/UniversityCard.tsx - UPDATED VERSION
"use client";

import React from "react";
import { MapPin, DollarSign, Calendar, Heart, Bookmark, TrendingUp, Award, Globe } from "lucide-react";

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
  // New props
  acceptanceRate?: number;
  scholarshipAvailable?: boolean;
  description?: string;
  reasons?: string[];
  similarityScore?: number;
  eligibilityScore?: number;
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
  onVisitWebsite,
  acceptanceRate,
  scholarshipAvailable,
  description,
  reasons = [],
  similarityScore,
  eligibilityScore,
}: UniversityCardProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const getAdmissionChance = (percentage: number): { label: string; color: string } => {
    if (percentage >= 85) return { label: "Very High", color: "bg-green-500" };
    if (percentage >= 70) return { label: "High", color: "bg-green-400" };
    if (percentage >= 55) return { label: "Moderate", color: "bg-yellow-500" };
    if (percentage >= 40) return { label: "Low", color: "bg-orange-500" };
    return { label: "Very Low", color: "bg-red-500" };
  };

  const admissionChance = getAdmissionChance(matchPercentage);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-200">
      {/* Header with Ranking and Match */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* University Initial with Ranking Badge */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">
                {universityName.substring(0, 2).toUpperCase()}
              </span>
            </div>
            {ranking !== "Not Ranked" && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-100 border border-blue-300 rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-blue-600" />
              </div>
            )}
          </div>

          {/* University Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {universityName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{country}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
              
              {/* Ranking Badge */}
              {ranking !== "Not Ranked" && (
                <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {ranking}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Score with Admission Chance */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Admission Chance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-lg font-semibold text-sm border ${getMatchColor(matchPercentage)}`}>
              {matchPercentage}% Match
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${admissionChance.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{admissionChance.label}</span>
            </div>
          </div>
        </div>
        
        {/* Score Breakdown */}
        {(similarityScore !== undefined || eligibilityScore !== undefined) && (
          <div className="mt-2 grid grid-cols-2 gap-3">
            {eligibilityScore !== undefined && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Eligibility</span>
                  <span>{Math.round(eligibilityScore * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${eligibilityScore * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {similarityScore !== undefined && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Similarity</span>
                  <span>{Math.round(similarityScore * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${similarityScore * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      )}

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-50 p-2 rounded-lg">
            <span className="text-gray-600 text-xs">Min GPA</span>
            <p className="font-semibold text-gray-900">{requirements.minGPA}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <span className="text-gray-600 text-xs">Min IELTS</span>
            <p className="font-semibold text-gray-900">
              {requirements.minIELTS}
            </p>
          </div>
          {requirements.minSAT && (
            <div className="bg-gray-50 p-2 rounded-lg">
              <span className="text-gray-600 text-xs">Min GRE</span>
              <p className="font-semibold text-gray-900">
                {requirements.minSAT}
              </p>
            </div>
          )}
          {acceptanceRate && (
            <div className="bg-gray-50 p-2 rounded-lg">
              <span className="text-gray-600 text-xs">Acceptance Rate</span>
              <p className="font-semibold text-gray-900">
                {acceptanceRate}%
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
            <p className="text-gray-600 text-xs">Tuition (per year)</p>
            <p className="font-semibold text-gray-900">{tuitionFee}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-gray-600 text-xs">Application Deadline</p>
            <p className="font-semibold text-gray-900">{deadline}</p>
          </div>
        </div>
        {scholarshipAvailable && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 text-green-500">💸</div>
            <div>
              <p className="text-gray-600 text-xs">Scholarships</p>
              <p className="font-semibold text-green-600">Available</p>
            </div>
          </div>
        )}
      </div>

      {/* Reasons for Recommendation */}
      {reasons.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Why this is a good match:
          </h4>
          <ul className="space-y-1">
            {reasons.slice(0, 3).map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Badge */}
      {isRecommended && (
        <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" />
          <span className="font-medium">Top Recommendation</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={onSave}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg transition-colors text-sm font-medium ${
            isSaved 
              ? 'bg-blue-50 border-blue-300 text-blue-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-blue-600 text-blue-600" : ""}`}
          />
          <span>{isSaved ? "Saved" : "Save to Watchlist"}</span>
        </button>
        {onVisitWebsite && (
          <button
            onClick={onVisitWebsite}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Visit Website
          </button>
        )}
        <button
          onClick={onApplyNow}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors text-sm font-semibold"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}