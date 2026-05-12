"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/apiConfig";

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
        const message = data.message || "Invalid email or password.";
        const lowered = String(message).toLowerCase();

        if (res.status === 404 || lowered.includes("not registered")) {
          toast.error("You are not registered.");
          setTimeout(() => router.push("/signup"), 800);
        } else {
          toast.error(message);
        }

        setSubmitting(false);
        return;
      }

      const incomingUser = data.user || {};
      const role = incomingUser.role || "student";

      if (role !== "student") {
        toast.error("Only student accounts can access this portal.");
        setSubmitting(false);
        return;
      }

      const paymentStatus =
        incomingUser.paymentStatus || (incomingUser.isPaid ? "paid" : "paid");

      // ⭐ Context handles saving token + redirect
      login(data.token, { ...incomingUser, role, paymentStatus });

      toast.success("Welcome back!");
    } catch (err) {
      toast.error("Unable to reach server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg px-5 py-3 font-semibold text-white text-[15px] sm:text-[16px] transition-transform active:scale-95 disabled:opacity-70 hover:opacity-90 duration-200"
        style={{
          background: "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
        }}
      >
        {submitting ? "Accessing..." : "Access Dashboard"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-indigo-600 font-medium hover:underline text-sm"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
