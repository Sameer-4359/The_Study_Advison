"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

  return (
    <div className="w-full max-w-[620px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <GraduationCap color="#fff" className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <h1
            className="font-semibold mb-1 text-[20px] sm:text-[28px] leading-tight"
            style={{ color: "#4169E1" }}
          >
            The Study Advisor
          </h1>

          <p className="text-sm sm:text-[15px] text-[#6B7280] mb-4 sm:mb-6">
            Your Gateway to Global Education
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-2 sm:mt-4">
          {/* Email */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="mb-4 sm:mb-5">
            <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
            />
          </div>

          {/* Error message */}
          {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}

          {/* Access Dashboard */}
          <div className="mb-3 sm:mb-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-[15px] sm:text-[16px] transition-transform active:scale-95 disabled:opacity-70 hover:opacity-90 duration-200"
              style={{
                background: "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
              }}
            >
              {submitting ? "Accessing..." : "Access Dashboard"}
            </button>
          </div>

          {/* Create Account */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-[#4F46E5] font-medium hover:underline text-sm sm:text-base"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
