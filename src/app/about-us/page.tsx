import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Target,
  Lightbulb,
  ShieldCheck,
  Cpu,
  Globe2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Our Story
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            The Bridge Between <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Ambition & Opportunity.
            </span>
          </h1>

          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Study Advisor was founded on a simple realization: global education
            is the world's greatest equalizer, yet the path to get there is
            unnecessarily broken. We're using AI to fix it.
          </p>
        </div>
      </section>

      {/* --- MISSION BENTO GRID --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-slate-500 leading-relaxed">
              To democratize elite university guidance, making top-tier
              counseling accessible to every student, regardless of their
              location or budget.
            </p>
          </div>

          <div className="p-10 bg-indigo-600 rounded-[2.5rem] shadow-xl shadow-indigo-200 text-white hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Cpu className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
            <p className="text-indigo-50 leading-relaxed">
              We merge deep academic datasets with generative AI to provide
              hyper-personalized roadmaps that adapt to a student's evolving
              goals.
            </p>
          </div>

          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
            <p className="text-slate-500 leading-relaxed">
              Total transparency. We don't sell student data. Our loyalty lies
              with the student's success, ensuring honest, unbiased
              recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-200 rounded-full blur-[80px] opacity-50" />
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
              Why We Built <br />
              Study Advisor
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Choosing a university abroad used to mean navigating a maze of
                scattered information, high-pressure sales from consultants, and
                expensive fees that many couldn't afford.
              </p>
              <p>
                We built Study Advisor to bring the "human touch" of an expert
                counselor into the digital age. By automating the data-heavy
                research, we allow students to focus on what matters:{" "}
                <strong>their future.</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl shadow-slate-200 relative">
            <div className="absolute top-6 right-8 text-indigo-100">
              <Lightbulb size={120} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 relative z-10">
              Platform Highlights
            </h3>
            <ul className="space-y-5 relative z-10">
              {[
                "AI University Recommendation Engine",
                "24/7 Intelligent Admissions Chatbot",
                "Advanced AI SOP Drafting Tool",
                "Comprehensive Global University Database",
                "End-to-End Application Tracking",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-slate-600 font-medium"
                >
                  <CheckCircle2
                    className="text-indigo-500 flex-shrink-0"
                    size={20}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- STATS / VALUES --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4">Built on Innovation</h2>
            <p className="text-slate-500">
              Transforming the study abroad industry with a tech-first mindset.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "AI-Driven", val: "Smart Logic" },
              { label: "Student-First", val: "100% Biased to You" },
              { label: "Global Reach", val: "30+ Countries" },
              { label: "Modern UX", val: "Fast & Fluid" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl font-extrabold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.label}
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {stat.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-50" />
          <Globe2
            className="mx-auto mb-8 text-indigo-400 opacity-50"
            size={60}
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10 italic">
            Your journey doesn't <br /> have to be a guessing game.
          </h2>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Join the Platform <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
