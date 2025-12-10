"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import RoleDropdown, { Role } from "./RoleDropDown";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Student");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSignupRoles, setShowSignupRoles] = useState(false);

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    toast.error("Email and password are required.");
    return;
  }

  try {
    setSubmitting(true);

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Invalid email or password.");
      setSubmitting(false);
      return;
    }

    // ⭐ Context handles saving token + redirect
    login(data.token, data.user);

    toast.success("Welcome back!");
  } catch (err) {
    toast.error("Unable to reach server. Please try again later.");
  } finally {
    setSubmitting(false);
  }
};

  const handleSignupRoleSelect = (selected: Role) => {
    localStorage.setItem("selectedSignupRole", selected);
    setShowSignupRoles(false);
    router.push("/signup");
  };

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <GraduationCap color="#fff" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <h1
            className="font-semibold mb-2 text-[22px] sm:text-[30px] leading-tight"
            style={{ color: "#4169E1" }}
          >
            The Study Advisor
          </h1>

          <p className="text-sm sm:text-[16px] text-[#6B7280] mb-6 sm:mb-8">
            Your Gateway to Global Education
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">

          {/* Email */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-3 sm:py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-3 sm:py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
            />
          </div>

          {/* Role */}
          <div className="mb-5 sm:mb-6">
            <RoleDropdown
              value={role}
              onChange={(v) => setRole(v)}
              label="Role"
            />
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
          )}

          {/* Access Dashboard */}
          <div className="mb-4 sm:mb-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg px-5 sm:px-6 py-3 sm:py-4 font-semibold text-white text-[15px] sm:text-[16px] transition-transform active:scale-95 disabled:opacity-70 hover:opacity-90 duration-200"
              style={{
                background:
                  "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
              }}
            >
              {submitting ? "Accessing..." : "Access Dashboard"}
            </button>
          </div>

          {/* Create Account */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowSignupRoles((s) => !s)}
              className="text-[#4F46E5] font-medium hover:underline text-sm sm:text-base"
            >
              Create Account
            </button>

            {showSignupRoles && (
              <div className="mt-4">
                <RoleDropdown
                  value={role}
                  onChange={(selected) => handleSignupRoleSelect(selected)}
                  label="Sign up as"
                />
              </div>
            )}
          </div>

          <p className="text-center text-xs sm:text-sm text-[#6B7280] mt-6">
            Demo Mode - Choose any role to explore the platform
          </p>
        </form>
      </div>
    </div>
  );
}
