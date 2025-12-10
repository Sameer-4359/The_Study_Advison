// src/components/dashboard/ProfileOverview.tsx
"use client";

import React from "react";
import { User, GraduationCap, Globe, Calendar } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";

export default function ProfileOverview() {
  const { profile, stats } = useProfile();

  if (!profile) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Profile Incomplete
          </h3>
          <p className="text-gray-600 mb-4">
            Complete your profile to get personalized university recommendations
          </p>
          <Link
            href="/profile-setup"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Overview</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {stats.completionPercentage}%
            </span>
          </div>
        </div>
        <Link
          href="/profile-setup"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personal Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Personal</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-sm text-gray-600">{profile.nationality || "Not set"}</p>
        </div>

        {/* Academic Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Academic</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {profile.currentEducationLevel || "Not set"}
          </p>
          <p className="text-sm text-gray-600">{profile.institutionName || "Not set"}</p>
        </div>

        {/* Study Preferences */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Preferences</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {profile.desiredProgram || "Not set"}
          </p>
          <p className="text-sm text-gray-600">{profile.preferredCountry || "Not set"}</p>
        </div>
      </div>

      {/* Missing Fields Warning */}
      {stats.missingFields.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium mb-1">
            Complete these fields for better recommendations:
          </p>
          <ul className="text-sm text-yellow-700 list-disc list-inside">
            {stats.missingFields.slice(0, 3).map((field, index) => (
              <li key={index} className="capitalize">
                {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </li>
            ))}
            {stats.missingFields.length > 3 && (
              <li>and {stats.missingFields.length - 3} more...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}