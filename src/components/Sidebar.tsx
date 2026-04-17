"use client";

import React from "react";
import {
  LayoutGrid,
  UserCircle,
  Upload,
  Target,
  FileText,
  MessageCircle,
  TrendingUp,
  Handshake,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type SidebarProps = {
  isOpen: boolean;
  isExpanded: boolean;
  onClose: () => void;
};

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", path: "/dashboard" },
  { icon: UserCircle, label: "Profile Setup", path: "/profile-setup" },
  { icon: Upload, label: "Document Upload", path: "/document-upload" },
  {
    icon: Target,
    label: "University Recommend...",
    path: "/university-recommendations",
  },
  { icon: FileText, label: "AI SOP Writer", path: "/ai-sop-writer" },
  { icon: MessageCircle, label: "AI Chatbot", path: "/ai-chatbot" },
  { icon: TrendingUp, label: "Progress Tracker", path: "/progress-tracker" },
  { icon: Handshake, label: "Connect With Us", path: "/connect-with-us" },
];

export default function Sidebar({ isOpen, isExpanded, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out
          ${isExpanded ? "md:w-[280px]" : "md:w-[80px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-[280px]
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Mobile Close Button */}
          {/* <div className="flex items-center justify-end mb-4 md:hidden">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div> */}

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center transition-all duration-200 text-left rounded-xl py-3.5
                        ${
                          isActive
                            ? "bg-[#4F46E5] text-white font-semibold"
                            : "text-[#4B5563] font-medium hover:bg-gray-100"
                        }
                        ${
                          isExpanded
                            ? "gap-3 px-4 justify-start"
                            : "justify-center px-2"
                        }
                        ${isOpen ? "gap-3 px-4 justify-start" : ""}
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {(isExpanded || isOpen) && (
                        <span className="text-[15px] truncate">
                          {item.label}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
