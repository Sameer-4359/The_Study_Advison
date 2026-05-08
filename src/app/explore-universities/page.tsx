"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  MapPin,
  GraduationCap,
  BookOpen,
  Lock,
  X,
  Sparkles,
  List,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const PROGRAM_LEVELS = ["BACHELORS", "MASTERS", "PHD", "DIPLOMA", "MBA"];
const COUNTRIES = ["USA", "Canada", "UK", "Australia", "Germany", "France"];
const FIELDS = [
  "Computer Science",
  "Engineering",
  "Business",
  "Medicine",
  "Arts",
];

type University = {
  id?: number;
  name?: string;
  country?: string;
  program_level?: string;
  program_name?: string;
  tuition_fee_usd?: number;
  min_gpa?: number;
  min_ielts?: number | null;
  fields_offered?: string[];
};

export default function ExploreUniversitiesPage() {
  // Navigation State
  const [view, setView] = useState<"menu" | "all" | "ai">("menu");

  // AI Wizard State
  const [step, setStep] = useState(0); // 0: Welcome, 1: Details, 2: Animation
  const [aiLoading, setAiLoading] = useState(false);

  // Form State
  const [preferredCountry, setPreferredCountry] = useState("");
  const [field, setField] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [cgpa, setCgpa] = useState("");

  // Data State
  const [results, setResults] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  // Fetch Logic
  const fetchUniversities = async (isAiSearch = false) => {
    setLoading(true);
    if (isAiSearch) {
      setStep(2); // Move to animation step
      await new Promise((resolve) => setTimeout(resolve, 2500)); // Short "AI Thinking" delay
    }

    try {
      const params = new URLSearchParams();
      if (preferredCountry) params.set("country", preferredCountry);
      if (field) params.set("field", field);
      if (programLevel) params.set("program_level", programLevel);
      params.set("limit", isAiSearch ? "6" : "24");

      const res = await fetch(
        `${API_BASE_URL}/universities?${params.toString()}`,
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);

      if (isAiSearch) setView("all"); // Show filtered results in the card view
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  // Reset filters when changing views
  const handleBackToMenu = () => {
    setView("menu");
    setResults([]);
    setPreferredCountry("");
    setField("");
    setProgramLevel("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            University Discovery
          </h1>
          <p className="mt-3 text-slate-500">
            Find the institution that fits your future.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* VIEW 1: Main Menu */}
        {view === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
            <button
              onClick={() => setView("ai")}
              className="group relative overflow-hidden bg-indigo-600 p-8 rounded-3xl text-white text-left transition-all hover:scale-[1.02] hover:shadow-2xl shadow-indigo-200"
            >
              <Sparkles
                className="mb-4 group-hover:rotate-12 transition-transform"
                size={40}
              />
              <h2 className="text-2xl font-bold">
                Find Desired University with AI
              </h2>
              <p className="text-indigo-100 mt-2">
                Get personalized recommendations based on your academic profile.
              </p>
              <ArrowRight className="mt-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>

            <button
              onClick={() => {
                setView("all");
                fetchUniversities(false);
              }}
              className="group bg-white border-2 border-slate-200 p-8 rounded-3xl text-left transition-all hover:border-indigo-600 hover:shadow-xl"
            >
              <List className="mb-4 text-indigo-600" size={40} />
              <h2 className="text-2xl font-bold text-slate-900">
                See all Available Options
              </h2>
              <p className="text-slate-500 mt-2">
                Browse our complete database of global universities and courses.
              </p>
              <ArrowRight className="mt-6 text-slate-300 group-hover:text-indigo-600 transition-all" />
            </button>
          </div>
        )}

        {/* VIEW 2: AI Recommendation Popup (Wizard) */}
        {view === "ai" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <button
                onClick={handleBackToMenu}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>

              {step === 0 && (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles size={40} className="text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Searching for your desired Uni?
                  </h2>
                  <p className="text-slate-500 mt-4 mb-8">
                    Our AI agent will help you filter 10,000+ programs to find
                    your perfect match.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Start Matching
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="animate-in slide-in-from-right duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-indigo-600" /> Tell us about
                    yourself
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 ml-1">
                        Preferred Country
                      </label>
                      <select
                        value={preferredCountry}
                        onChange={(e) => setPreferredCountry(e.target.value)}
                        className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="">Any Country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 ml-1">
                        Area of Interest
                      </label>
                      <select
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="">Select Field</option>
                        {FIELDS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                          Program Level
                        </label>
                        <select
                          value={programLevel}
                          onChange={(e) => setProgramLevel(e.target.value)}
                          className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="">Select Level</option>
                          {PROGRAM_LEVELS.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                          Your CGPA
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 3.8"
                          className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => fetchUniversities(true)}
                    className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    Find My Universities <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="text-center py-16 animate-pulse">
                  <Loader2
                    className="mx-auto text-indigo-600 animate-spin mb-6"
                    size={60}
                  />
                  <h2 className="text-2xl font-bold text-slate-900">
                    AI is searching...
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Matching your profile with our database
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: Results Display */}
        {view === "all" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackToMenu}
                className="text-indigo-600 font-semibold flex items-center gap-2 hover:underline"
              >
                ← Back to Selection
              </button>
              <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
                {results.length} Results Found
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2
                  className="text-indigo-600 animate-spin mb-4"
                  size={40}
                />
                <p className="text-slate-500">Loading Universities...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {results.map((uni) => (
                  <div
                    key={uni.id}
                    className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <GraduationCap size={24} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {uni.country}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                      <MapPin size={14} /> {uni.country}
                    </p>

                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Program</span>
                        <span className="font-semibold text-slate-700">
                          {uni.program_name || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tuition</span>
                        <span className="font-bold text-indigo-600">
                          ${uni.tuition_fee_usd?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowSigninModal(true)}
                      className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
                    >
                      <Lock size={16} /> Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sign In Modal (Shared) */}
      {showSigninModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Unlock Application
              </h3>
              <button
                onClick={() => setShowSigninModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-slate-500 mb-8">
              Sign in to your student dashboard to start your application
              process for this university.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/login"
                className="bg-indigo-600 text-white text-center py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="border-2 border-slate-100 text-slate-600 text-center py-3 rounded-xl font-bold hover:bg-slate-50 transition"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
