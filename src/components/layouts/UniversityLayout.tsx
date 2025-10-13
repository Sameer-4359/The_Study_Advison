"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/std-dash-s1/Header";
import Sidebar from "@/components/Sidebar";

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // desktop

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  // Auto-close sidebar on resize (mobile → desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        onToggleSidebar={handleToggleSidebar}
        userName="Muneeb Adil"
        userRole="Student"
        notificationCount={3}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isExpanded={sidebarExpanded}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 p-4 sm:p-6 ${
            sidebarExpanded ? "md:ml-[280px]" : "md:ml-[90px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
