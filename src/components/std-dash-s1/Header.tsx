// "use client";

// import React from "react";
// import { Menu, Bell, GraduationCap } from "lucide-react";
// import { headerData } from "@/data/std-dash-s1-data/headerData";
// import { useAuth } from "@/context/AuthContext";

// type HeaderProps = {
//   onToggleSidebar: () => void;
//   notificationCount?: number;
// };

// export default function Header({
//   onToggleSidebar,
//   notificationCount = headerData.defaultNotificationCount,
// }: HeaderProps) {
//   const { user } = useAuth();

//   const userName = user?.fullName || headerData.defaultUser.name;
//   const userRole = user?.role || headerData.defaultUser.role;

//   const initial = userName?.trim()?.[0]?.toUpperCase() ?? "S";

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         {/* Left Section */}
//         <div className="flex items-center gap-3 sm:gap-4">
//           <button
//             onClick={onToggleSidebar}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Toggle sidebar"
//           >
//             <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
//           </button>

//           <div
//             className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: headerData.appColor }}
//           >
//             <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//           </div>

//           <span
//             className="font-semibold text-lg sm:text-xl md:text-2xl"
//             style={{ color: headerData.brandTextColor }}
//           >
//             {headerData.appName}
//           </span>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3 sm:gap-6">
//           <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
//                 {notificationCount}
//               </span>
//             )}
//           </button>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <div
//               className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
//               style={{ backgroundColor: headerData.appColor }}
//             >
//               <span className="text-white font-semibold text-base sm:text-lg">
//                 {initial}
//               </span>
//             </div>

//             <div className="hidden lg:flex flex-col">
//               <span className="text-gray-900 font-semibold text-sm">
//                 {userName}
//               </span>
//               <span className="text-xs font-semibold text-[#2563EB] bg-[#DBEAFE] px-3 py-0.5 rounded-full inline-block mt-0.5">
//                 {userRole}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import React from "react";
import { Menu, Bell, GraduationCap, LogOut } from "lucide-react";
import { headerData } from "@/data/std-dash-s1-data/headerData";
import { useAuth } from "@/context/AuthContext";

type HeaderProps = {
  onToggleSidebar: () => void;
  notificationCount?: number;
};

export default function Header({
  onToggleSidebar,
  notificationCount = headerData.defaultNotificationCount,
}: HeaderProps) {
  const { user, logout } = useAuth();

  const userName = user?.fullName || headerData.defaultUser.name;
  const userRole = user?.role || headerData.defaultUser.role;

  const initial = userName?.trim()?.[0]?.toUpperCase() ?? "S";

  const handleLogout = () => {
    logout(); // This will clear auth state and redirect to /login
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: headerData.appColor }}
          >
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <span
            className="font-semibold text-lg sm:text-xl md:text-2xl"
            style={{ color: headerData.brandTextColor }}
          >
            {headerData.appName}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: headerData.appColor }}
            >
              <span className="text-white font-semibold text-base sm:text-lg">
                {initial}
              </span>
            </div>

            <div className="hidden lg:flex flex-col">
              <span className="text-gray-900 font-semibold text-sm">
                {userName}
              </span>
              <span className="text-xs font-semibold text-[#2563EB] bg-[#DBEAFE] px-3 py-0.5 rounded-full inline-block mt-0.5">
                {userRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}