// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import DashboardCtaButton from "@/components/DashboardCtaButton";
// import Link from "next/link";
// import { Sparkles, MessageSquare, ArrowRight, Check } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-white">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-24">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
//           <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
//           <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
//             <span className="text-sm font-medium">
//               🎓 Your AI Study Companion
//             </span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//             Find Your Perfect University
//           </h1>
//           <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
//             Get AI-powered university recommendations and chat with our
//             intelligent counselor. Discover your ideal institution in minutes.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//             <Link
//               href="/explore-universities"
//               className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
//             >
//               Explore Universities <ArrowRight size={20} />
//             </Link>
//             <Link
//               href="/ai-chatbot"
//               className="px-8 py-4 bg-indigo-400/20 border-2 border-white text-white font-semibold rounded-lg hover:bg-indigo-400/30 transition-all"
//             >
//               Chat with AI Counselor
//             </Link>
//             <DashboardCtaButton
//               className="px-8 py-4 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
//               label="Student Dashboard"
//             />
//           </div>

//           <div className="text-sm text-indigo-100">
//             Free access • No credit card required
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
//             Powerful Features
//           </h2>
//           <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
//             Everything you need to find and apply to your dream university
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Free Features */}
//             <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-green-100 rounded-lg">
//                   <Check size={24} className="text-green-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Free Features
//                 </h3>
//               </div>

//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <Sparkles
//                     size={20}
//                     className="text-green-600 mt-1 flex-shrink-0"
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       AI University Recommendation
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Get limited matches of universities based on your profile
//                       and preferences
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <MessageSquare
//                     size={20}
//                     className="text-green-600 mt-1 flex-shrink-0"
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       University Chatbot
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Ask limited questions about courses, fees, and admission
//                       requirements
//                     </p>
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             {/* Premium Features */}
//             <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg transform hover:scale-105 transition-transform">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-yellow-400/20 rounded-lg">
//                   <Sparkles size={24} className="text-yellow-300" />
//                 </div>
//                 <h3 className="text-2xl font-bold">Pro Features</h3>
//               </div>

//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <div className="p-1 bg-yellow-400/30 rounded">
//                     <Check size={16} className="text-yellow-300" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">
//                       AI-powered University Recommendation
//                     </p>
//                     <p className="text-sm text-indigo-100">
//                       Get personalized matches based on your profile and
//                       aspirations
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="p-1 bg-yellow-400/30 rounded">
//                     <Check size={16} className="text-yellow-300" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Personalized Chatbot</p>
//                     <p className="text-sm text-indigo-100">
//                       Ask unlimited questions and get tailored responses about
//                       universities, courses, and admissions
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="p-1 bg-yellow-400/30 rounded">
//                     <Check size={16} className="text-yellow-300" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">AI SOP Writer</p>
//                     <p className="text-sm text-indigo-100">
//                       Craft your Statement of Purpose with AI assistance
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="p-1 bg-yellow-400/30 rounded">
//                     <Check size={16} className="text-yellow-300" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">
//                       Profile & Document Management
//                     </p>
//                     <p className="text-sm text-indigo-100">
//                       Organize applications and track progress
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="p-1 bg-yellow-400/30 rounded">
//                     <Check size={16} className="text-yellow-300" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Priority Counselor Support</p>
//                     <p className="text-sm text-indigo-100">
//                       Get expert guidance from our advisors
//                     </p>
//                   </div>
//                 </li>
//               </ul>

//               <Link
//                 href="/login"
//                 className="mt-8 block w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold text-center hover:bg-indigo-50 transition-all"
//               >
//                 Unlock Pro Features
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
//             How It Works
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Create Account",
//                 description:
//                   "Sign up for free and set up your profile with academic details and preferences",
//               },
//               {
//                 step: "02",
//                 title: "Get Recommendations",
//                 description:
//                   "Use our AI to find universities that match your profile, goals, and budget",
//               },
//               {
//                 step: "03",
//                 title: "Chat & Learn",
//                 description:
//                   "Ask our AI counselor any questions about universities, admissions, and more",
//               },
//             ].map((item, idx) => (
//               <div key={idx} className="relative">
//                 <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 h-full">
//                   <div className="text-4xl font-bold text-indigo-600 mb-4">
//                     {item.step}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-700">{item.description}</p>
//                 </div>
//                 {idx < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2">
//                     <ArrowRight size={32} className="text-indigo-300" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
//             Simple, Transparent Pricing
//           </h2>
//           <p className="text-center text-gray-600 mb-16">
//             Start free, upgrade when you need more
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Free",
//                 price: "$0",
//                 period: "Forever",
//                 features: [
//                   "University recommendations",
//                   "AI chatbot access",
//                   "Basic profile",
//                   "Email support",
//                 ],
//                 cta: "Get Started",
//                 ctaHref: "/signup",
//                 highlight: false,
//               },
//               {
//                 name: "Pro",
//                 price: "$10",
//                 period: "/month",
//                 features: [
//                   "Everything in Free",
//                   "AI SOP Writer",
//                   "Document management",
//                   "Priority support",
//                   "Application tracking",
//                 ],
//                 cta: "Start Free Trial",
//                 ctaHref: "/login",
//                 highlight: true,
//               },
//               {
//                 name: "Advisor",
//                 price: "Custom",
//                 period: "pricing",
//                 features: [
//                   "Everything in Pro",
//                   "1-on-1 counselor",
//                   "Application review",
//                   "Interview prep",
//                   "Dedicated support",
//                 ],
//                 cta: "Contact Us",
//                 ctaHref: "/contact-us",
//                 highlight: false,
//               },
//             ].map((plan, idx) => (
//               <div
//                 key={idx}
//                 className={`rounded-2xl p-8 transition-all ${
//                   plan.highlight
//                     ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-2 border-indigo-600 shadow-2xl transform hover:scale-105"
//                     : "bg-white border-2 border-gray-200 hover:border-indigo-200"
//                 }`}
//               >
//                 <h3
//                   className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}
//                 >
//                   {plan.name}
//                 </h3>
//                 <div className="mb-6">
//                   <span
//                     className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}
//                   >
//                     {plan.price}
//                   </span>
//                   <span
//                     className={`text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-600"}`}
//                   >
//                     {" "}
//                     {plan.period}
//                   </span>
//                 </div>

//                 <ul className="space-y-3 mb-8">
//                   {plan.features.map((feature, fIdx) => (
//                     <li key={fIdx} className="flex items-center gap-3">
//                       <Check
//                         size={20}
//                         className={
//                           plan.highlight ? "text-yellow-300" : "text-green-600"
//                         }
//                       />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <Link
//                   href={plan.ctaHref}
//                   className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
//                     plan.highlight
//                       ? "bg-white text-indigo-600 hover:bg-indigo-50"
//                       : "bg-indigo-600 text-white hover:bg-indigo-700"
//                   }`}
//                 >
//                   {plan.cta}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
//         <div className="max-w-4xl mx-auto px-6 text-center text-white">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Find Your Perfect University?
//           </h2>
//           <p className="text-lg text-indigo-100 mb-8">
//             Start exploring personalized recommendations and chat with our AI
//             counselor today—completely free.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/explore-universities"
//               className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all"
//             >
//               Explore Now
//             </Link>
//             <Link
//               href="/login"
//               className="px-8 py-3 bg-indigo-400/20 border-2 border-white text-white font-semibold rounded-lg hover:bg-indigo-400/30 transition-all"
//             >
//               Sign In
//             </Link>
//             <DashboardCtaButton
//               className="px-8 py-3 bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
//               label="Go to Dashboard"
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCtaButton from "@/components/DashboardCtaButton";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  Check,
  Rocket,
  BookOpen,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#0a0c10]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full mb-8 border border-white/10 shadow-2xl">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-indigo-100 tracking-wide uppercase">
              The Future of Admissions
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight text-white">
            Your Dream University <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Found by AI.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Skip the stress of endless searching. Our intelligent counselor
            analyzes your profile to find the perfect global match in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/explore-universities"
              className="group px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Explore Universities
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Chat with Counselor
            </Link>
          </div>

          {/* Social Proof / Trust */}
          <div className="flex flex-col items-center gap-4 py-8 border-t border-white/5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">
              Trusted by students at
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-200">
              {/* Replace with real logos if needed */}
              <span className="text-xl font-bold text-white italic">
                IVY LEAGUE
              </span>
              <span className="text-xl font-bold text-white">OXFORD</span>
              <span className="text-xl font-bold text-white tracking-tighter">
                STANFORD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">
              Capabilities
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900">
              Everything you need to succeed.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rocket className="text-indigo-600" />}
              title="AI Matching"
              description="Proprietary algorithms that match your GPA and goals to thousands of global universities."
            />
            <FeatureCard
              icon={<MessageSquare className="text-indigo-600" />}
              title="24/7 AI Advisor"
              description="Instant answers about visa requirements, tuition fees, and campus life anywhere in the world."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-indigo-600" />}
              title="SOP Assistant"
              description="Get AI-driven feedback and drafting help for your Statement of Purpose to stand out."
            />
          </div>
        </div>
      </section>

      {/* Pricing - Re-imagined as "Selection" */}
      <section id="pricing" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                Choose your path to success.
              </h2>
              <p className="text-slate-600 mb-8">
                Whether you're just exploring or ready to apply, we have a plan
                to help you get there.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Join 10,000+ students
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Free</h4>
                <div className="text-3xl font-bold text-slate-900 mb-6">
                  $0
                  <span className="text-base font-normal text-slate-500">
                    /mo
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Basic Recommendations",
                    "Limited AI Chat",
                    "Public University Search",
                  ].map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-3 text-slate-600 text-sm"
                    >
                      <Check size={18} className="text-indigo-600" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="block w-full py-3 text-center border-2 border-slate-100 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Start Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-500 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">
                  Popular
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Pro Scholar
                </h4>
                <div className="text-3xl font-bold text-white mb-6">
                  $10
                  <span className="text-base font-normal text-slate-400">
                    /mo
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited AI Counselor",
                    "AI SOP Generator",
                    "Application Tracker",
                    "Priority Support",
                  ].map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-3 text-slate-300 text-sm"
                    >
                      <Check size={18} className="text-indigo-400" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="block w-full py-3 text-center bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-indigo-700 to-purple-800 p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">
              Ready to make your move?
            </h2>
            <p className="text-indigo-100 mb-10 max-w-xl mx-auto">
              Don't let the paperwork slow you down. Let our AI do the heavy
              lifting while you focus on your future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <DashboardCtaButton
                label="Open Dashboard"
                className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform"
              />
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Sub-component for clean code
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
