// app/signup/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("Student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedSignupRole");
    if (storedRole) setRole(storedRole);
  }, []);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save simple demo data
    localStorage.setItem("userName", name || "User");
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFF] to-[#EEF2FF] px-4 py-10">
      <div className="w-full max-w-[720px] mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
              style={{ backgroundColor: "#4F46E5" }}
            >
              <GraduationCap color="#fff" className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h1
              className="font-semibold mb-2 text-[22px] sm:text-[28px] md:text-[32px] leading-tight"
              style={{ color: "#4169E1" }}
            >
              Sign Up as {role}
            </h1>

            <p className="text-sm sm:text-[16px] text-[#6B7280] mb-6 sm:mb-8">
              Create your {role} account to begin your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-semibold text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F3F4F6] rounded-lg px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F3F4F6] rounded-lg px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F3F4F6] rounded-lg px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full bg-[#F3F4F6] rounded-lg px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg px-6 py-3 font-semibold text-white text-[16px] hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
                }}
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-5">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-[#4F46E5] font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
