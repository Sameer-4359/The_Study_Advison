import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Clock,
  Globe,
  Send,
  Sparkles,
} from "lucide-react";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0a0c10] pt-24 pb-44 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              We're here for you
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Let's Start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Conversation
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about a specific university or need help
            navigating our AI tools, our team of experts is ready to assist.
          </p>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT INFO: Quick Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Student Support
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Our dedicated team is ready to help with technical and
                    academic queries.
                  </p>
                  <a
                    href="mailto:support@thestudyadvisor.com"
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    support@thestudyadvisor.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Global Office Hours
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-1">
                    Monday – Friday
                  </p>
                  <p className="text-slate-900 font-bold">
                    9:00 AM — 6:00 PM (GMT)
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href="#"
                      className="p-3 bg-slate-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-slate-50 rounded-xl hover:bg-pink-600 hover:text-white transition-all"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-slate-50 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] shadow-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-indigo-200" />
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="text-indigo-100 leading-relaxed text-sm">
                We are on a mission to democratize global education. Through AI,
                we ensure every student finds their ideal future without
                barriers.
              </p>
            </div>
          </div>

          {/* RIGHT INFO: Modern Form */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8">
              Send us a Message
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="md:col-span-1 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Subject
                </label>
                <select className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-500">
                  <option>University Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Partnership Proposal</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="button"
                  className="w-full group bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-3"
                >
                  Send Message
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* --- FLOATING CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
            Need an Instant Answer?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">
            Our AI Counselor is trained on thousands of data points to give you
            immediate advice on admissions and scholarships.
          </p>
          <a
            href="/ai-chatbot"
            className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl relative z-10"
          >
            <Sparkles size={20} className="text-indigo-600" />
            Talk to AI Advisor
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
