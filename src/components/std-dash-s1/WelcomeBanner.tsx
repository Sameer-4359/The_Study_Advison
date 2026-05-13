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
import Link from "next/link";
import { BookMarked, Globe2, PlaneTakeoff } from "lucide-react";

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
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#5B5FEF] to-[#8B5CF6] p-6 text-white shadow-xl sm:p-8">
      <div className="absolute inset-0 bg-slate-950/25" />
      <div className="absolute -left-6 top-4 h-20 w-20 rounded-full bg-white/20 blur-xl" />
      <div className="absolute right-16 -bottom-10 h-32 w-32 rounded-full bg-white/15 blur-xl" />

      <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold">
            <BookMarked className="h-3.5 w-3.5" />
            Study Abroad Student Hub
          </span>

          <div>
            <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
              {welcomeBannerData.titlePrefix} {userName}!
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/95 sm:text-base">
              {welcomeBannerData.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/university-recommendations"
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-white"
            >
              <Globe2 className="h-4 w-4" />
              Explore Destinations
            </Link>
            <Link
              href="/progress-tracker"
              className="inline-flex items-center gap-2 rounded-xl border border-white/55 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <PlaneTakeoff className="h-4 w-4" />
              Track Journey
            </Link>
          </div>

          <div className="rounded-2xl border border-white/35 bg-white/20 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">
                {welcomeBannerData.progressLabel}
              </span>
              <span className="text-sm font-semibold">
                {overallProgress}
                {welcomeBannerData.progressSuffix}
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-56 overflow-hidden rounded-2xl border border-white/35 shadow-xl sm:h-64 md:h-72">
            <img
              src="/dashboard-hero.jpg"
              alt="Students preparing study abroad documents"
              className="h-full w-full object-cover"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/15 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <p className="text-sm font-semibold text-white">
                International Admissions Spotlight
              </p>
              <p className="text-xs text-white/90">
                Keep every profile, document, and SOP milestone on track.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-3 rounded-xl bg-white/90 px-3 py-2 text-indigo-700 shadow-md">
            <p className="text-xs font-semibold">Application Readiness</p>
            <p className="text-lg font-bold">{overallProgress}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
