"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("student");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedSignupRole");
    if (storedRole) setRole(storedRole.trim().toLowerCase());
  }, []);

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      const pendingSignup = {
        fullName,
        email,
        password,
        role: "student",
      };

      localStorage.setItem("pendingSignup", JSON.stringify(pendingSignup));
      router.push("/payment?flow=signup");
    } catch (err) {
      toast.error("Unable to continue. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-md text-center px-8">
          <h1 className="text-4xl font-extrabold">Join the Journey</h1>
          <p className="mt-4 text-indigo-100">
            Create a student account and unlock personalized university
            recommendations and smart guidance.
          </p>
          <div className="mt-8 text-sm text-indigo-100">
            Already have an account?{" "}
            <Link href="/login" className="text-white underline">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign Up as {roleLabel}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your student account to begin your journey.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

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

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
