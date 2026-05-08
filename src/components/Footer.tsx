// export default function Footer() {
//   return (
//     <footer className="w-full bg-gray-50 border-t mt-12">
//       <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
//         <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
//           <div>
//             © {new Date().getFullYear()} The Study Advisor. All rights reserved.
//           </div>
//           <div className="flex gap-4">
//             <a href="/about-us" className="hover:underline">
//               About Us
//             </a>
//             <a href="/contact-us" className="hover:underline">
//               Contact Us
//             </a>
//             <a href="/landing#pricing" className="hover:underline">
//               Pricing
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                StudyAdvisor
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering students globally with AI-driven university
              recommendations and expert counseling to shape the leaders of
              tomorrow.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-indigo-400 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-400 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-400 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-400 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/explore-universities"
                  className="hover:text-white transition-colors"
                >
                  Explore Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-chatbot"
                  className="hover:text-white transition-colors"
                >
                  AI Counselor
                </Link>
              </li>
              <li>
                <Link
                  href="/sop-writer"
                  className="hover:text-white transition-colors"
                >
                  AI SOP Writer
                </Link>
              </li>
              <li>
                <Link
                  href="/landing#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partner Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">
              Get the latest scholarship alerts and study tips.
            </p>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 px-3 focus-within:border-indigo-500 transition-all">
              <Mail size={18} className="text-slate-500" />
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-2 text-white"
              />
              <button className="bg-indigo-600 text-white p-2 px-4 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide">
          <p>
            © {new Date().getFullYear()} StudyAdvisor AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
