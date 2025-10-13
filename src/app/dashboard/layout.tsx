// // app/dashboard/layout.tsx
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Header
//         onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//         userName="Muneeb"
//         userRole="Student"
//         notificationCount={3}
//       />

//       <div className="flex">
//         {/* Sidebar */}
//         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//         {/* Main Content */}
//         <main className="flex-1 md:ml-[300px] transition-all duration-300">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/std-dash-s1/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onToggleSidebar={handleToggleSidebar}
        userName="Muneeb"
        userRole="Student"
        notificationCount={3}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isExpanded={sidebarExpanded}
          onClose={() => setSidebarOpen(false)}
        />

       {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarExpanded ? "md:ml-[280px]" : "md:ml-[90px]"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
