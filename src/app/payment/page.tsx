"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/apiConfig";

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};

const isValidExpiry = (value: string) => {
  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  const now = new Date();
  const expiry = new Date(year, month - 1, 1);
  expiry.setMonth(expiry.getMonth() + 1);
  return expiry > now;
};

const luhnCheck = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 16) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const flow = searchParams.get("flow") || "";

  const [pendingSignup, setPendingSignup] = useState<{
    fullName: string;
    email: string;
    password: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let parsed: {
      fullName: string;
      email: string;
      password: string;
      role: string;
    } | null = null;
    const raw = localStorage.getItem("pendingSignup");
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }
    }
    setPendingSignup(parsed);

    const paid = String(document.cookie).includes("paymentStatus=paid");
    if (paid) {
      router.push("/student/dashboard");
      return;
    }

    if (flow === "signup" && !parsed) {
      toast.error("Please complete signup first.");
      router.push("/signup");
    }
  }, [flow, router]);

  const handlePayment = async () => {
    if (!cardName.trim()) {
      toast.error("Cardholder name is required.");
      return;
    }

    if (!luhnCheck(cardNumber)) {
      toast.error("Card number must be 16 digits and valid.");
      return;
    }

    if (!isValidExpiry(expiry)) {
      toast.error("Enter a valid expiry date (MM/YY).");
      return;
    }

    if (!/^\d{3}$/.test(cvc)) {
      toast.error("CVC must be 3 digits.");
      return;
    }

    if (flow === "signup" && !pendingSignup) {
      toast.error("Missing signup details. Please sign up again.");
      router.push("/signup");
      return;
    }

    try {
      setProcessing(true);

      // NOTE: This is a demo payment validation only (no real charge).
      if (flow === "signup" && pendingSignup) {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: pendingSignup.fullName,
            email: pendingSignup.email,
            password: pendingSignup.password,
            role: "student",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Account creation failed.");
          setProcessing(false);
          return;
        }

        // Mark paid locally and proceed to dashboard
        const user = {
          ...data.user,
          role: "student",
          paymentStatus: "paid",
        };

        localStorage.removeItem("pendingSignup");
        signup(data.token, user);
        toast.success("Payment successful! Account created.");
        return;
      }

      // If existing user pays to unlock
      document.cookie = `paymentStatus=paid; path=/`;
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        u.paymentStatus = "paid";
        localStorage.setItem("user", JSON.stringify(u));
      }
      toast.success("Payment successful!");
      router.push("/student/dashboard");
    } catch (err) {
      toast.error("Payment failed. Try again later.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
          <p className="mt-2 text-gray-600">
            Complete payment to activate your student account and unlock premium
            access.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Full name on card"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry (MM/YY)
                </label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  placeholder="123"
                  inputMode="numeric"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {processing ? "Processing..." : "Pay and Continue"}
            </button>

            <p className="text-xs text-gray-500">
              This is a demo payment form. No real charges are processed.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl text-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">Premium Student Access</h2>
          <p className="mt-3 text-indigo-100">
            Unlock the complete student dashboard, SOP tools, and progress
            tracking.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li>• Full SOP Writer access</li>
            <li>• Document management and tracking</li>
            <li>• Priority counselor support</li>
            <li>• Application readiness insights</li>
          </ul>

          <div className="mt-8 text-sm text-indigo-100">
            Your payment activates your account immediately.
          </div>
        </section>
      </main>
    </div>
  );
}
