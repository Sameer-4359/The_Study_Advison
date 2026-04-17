// "use client";

// import React, { useEffect, useState } from "react";

// export default function WelcomeBanner() {
//   const [userName, setUserName] = useState<string>("User");
//   const [overallProgress, setOverallProgress] = useState<number>(60); // dummy progress

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     if (storedName) setUserName(storedName);
//   }, []);

//   return (
//     <div className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-2xl p-6 sm:p-8 text-white">
//       {/* Welcome Text */}
//       <h1 className="text-2xl sm:text-3xl font-bold">
//         Welcome back, {userName}!
//       </h1>
//       <p className="text-sm sm:text-base opacity-90 mt-2">
//         Continue your journey to global education
//       </p>

//       {/* Progress Section */}
//       <div className="mt-6 sm:mt-8">
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-sm font-medium">Overall Progress</span>
//           <span className="text-sm font-semibold">
//             {overallProgress}% Complete
//           </span>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-white rounded-full transition-all duration-500"
//             style={{ width: `${overallProgress}%` }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
//after data folder

"use client";

import React, { useEffect, useState } from "react";
import { welcomeBannerData } from "@/data/std-dash-s1-data/welcomeBannerData";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeBanner() {
  const { user } = useAuth(); // Get user from AuthContext
  const [overallProgress, setOverallProgress] = useState<number>(
    welcomeBannerData.defaultProgress,
  );

  // Get user name from context (preferred) or fallback to localStorage
  const storedUserName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  const userName =
    user?.fullName || storedUserName || welcomeBannerData.defaultUserName;

  // You can optionally sync the user name to localStorage for backward compatibility
  useEffect(() => {
    if (user?.fullName) {
      localStorage.setItem("userName", user.fullName);
    }
  }, [user?.fullName]);

  return (
    <div className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-2xl p-6 sm:p-8 text-white">
      {/* Welcome Text */}
      <h1 className="text-2xl sm:text-3xl font-bold">
        {welcomeBannerData.titlePrefix} {userName}!
      </h1>
      <p className="text-sm sm:text-base opacity-90 mt-2">
        {welcomeBannerData.subtitle}
      </p>

      {/* Progress Section */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">
            {welcomeBannerData.progressLabel}
          </span>
          <span className="text-sm font-semibold">
            {overallProgress}
            {welcomeBannerData.progressSuffix}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
