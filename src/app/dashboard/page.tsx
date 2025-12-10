// app/dashboard/page.tsx
"use client";

import React from "react";
import WelcomeBanner from "@/components/std-dash-s1/WelcomeBanner";
import FeatureCard from "@/components/std-dash-s1/FeatureCard";
import RecentUpdates from "@/components/std-dash-s1/RecentUpdates";
import { useProfile } from "@/hooks/useProfile"; // Add this import
import ProfileOverview from "@/components/dashboard/ProfileOverview";
import {
  UserCircle,
  Upload,
  Target,
  FileText,
  MessageCircle,
  TrendingUp,
  Check,
  Edit,
  Plus,
  Clock,
  Info,
  BarChart2,
} from "lucide-react";

export default function DashboardPage() {
   const { stats } = useProfile();
     const getProfileSetupStatus = () => {
    if (stats.completionPercentage >= 90) {
      return {
        leftButtonText: "Completed",
        leftButtonBg: "#D1FAE5",
        leftButtonTextColor: "#059669",
        progressColor: "#10B981",
        statusIcon: Check,
        statusIconColor: "#10B981"
      };
    } else if (stats.completionPercentage > 0) {
      return {
        leftButtonText: "In Progress",
        leftButtonBg: "#DBEAFE",
        leftButtonTextColor: "#2563EB",
        progressColor: "#3B82F6",
        statusIcon: Edit,
        statusIconColor: "#3B82F6"
      };
    } else {
      return {
        leftButtonText: "Not Started",
        leftButtonBg: "#F3F4F6",
        leftButtonTextColor: "#6B7280",
        progressColor: "#9CA3AF",
        statusIcon: Clock,
        statusIconColor: "#6B7280"
      };
    }
  };

  const profileStatus = getProfileSetupStatus();
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner  /> 
      {/* userName="ddsd" overallProgress={60} */}

 {/* Profile Overview */}
      <ProfileOverview />
      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Profile Setup */}
        <FeatureCard
          icon={UserCircle}
          iconBgColor="#DBEAFE"
          iconColor="#3B82F6"
          title="Profile Setup"
          description="Complete your personal and academic information"
          progress={stats.completionPercentage}
           progressColor={profileStatus.progressColor}
          statusIcon={profileStatus.statusIcon}
          statusIconColor={profileStatus.statusIconColor}
           leftButton={{
            text: profileStatus.leftButtonText,
            bgColor: profileStatus.leftButtonBg,
            textColor: profileStatus.leftButtonTextColor,
          }}
          rightButton={{
            text: stats.completionPercentage > 0 ? "Review" : "Start",
            onClick: () => window.location.href = "/profile-setup",
          }}
          onClick={() => window.location.href = "/profile-setup"}
        />

        {/* Document Upload */}
        <FeatureCard
          icon={Upload}
          iconBgColor="#DBEAFE"
          iconColor="#3B82F6"
          title="Document Upload"
          description="Upload certificates, transcripts, and passport"
          progress={50}
          progressColor="#3B82F6"
          statusIcon={Edit}
          statusIconColor="#3B82F6"
          leftButton={{
            text: "In Progress",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
          }}
          rightButton={{
            text: "Continue",
            onClick: () => console.log("Continue clicked"),
          }}
          onClick={() => console.log("Document Upload clicked")}
        />

        {/* University Recommendations */}
        <FeatureCard
          icon={Target}
          iconBgColor="#DBEAFE"
          iconColor="#3B82F6"
          title="University Recommendations"
          description="Get personalized university recommendations"
          statusIcon={Plus}
          statusIconColor="#3B82F6"
          leftButton={{
            text: "Available",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
          }}
          rightButton={{
            text: "Start",
            onClick: () => console.log("Start clicked"),
          }}
          onClick={() => console.log("University Recommendations clicked")}
        />

        {/* AI SOP Writer */}
        <FeatureCard
          icon={FileText}
          iconBgColor="#FEF3C7"
          iconColor="#F59E0B"
          title="AI SOP Writer"
          description="Generate your Statement of Purpose with AI"
          progress={30}
          progressColor="#F59E0B"
          statusIcon={Clock}
          statusIconColor="#F59E0B"
          leftButton={{
            text: "Pending",
            bgColor: "#FEF3C7",
            textColor: "#F59E0B",
          }}
          rightButton={{
            text: "Locked",
            onClick: () => console.log("Locked clicked"),
          }}
          onClick={() => console.log("AI SOP Writer clicked")}
        />

        {/* AI Chatbot */}
        <FeatureCard
          icon={MessageCircle}
          iconBgColor="#DBEAFE"
          iconColor="#3B82F6"
          title="AI Chatbot"
          description="Ask questions about universities and programs"
          statusIcon={Info}
          statusIconColor="#3B82F6"
          leftButton={{
            text: "Available",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
          }}
          rightButton={{
            text: "Start",
            onClick: () => console.log("Start clicked"),
          }}
          onClick={() => console.log("AI Chatbot clicked")}
        />

        {/* Progress Tracker */}
        <FeatureCard
          icon={TrendingUp}
          iconBgColor="#DBEAFE"
          iconColor="#3B82F6"
          title="Progress Tracker"
          description="Track your application journey"
          statusIcon={BarChart2}
          statusIconColor="#3B82F6"
          leftButton={{
            text: "Available",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
          }}
          rightButton={{
            text: "Start",
            onClick: () => console.log("Start clicked"),
          }}
          onClick={() => console.log("Progress Tracker clicked")}
        />
      </div>

      {/* Recent Updates */}
      <RecentUpdates />
    </div>
  );
}