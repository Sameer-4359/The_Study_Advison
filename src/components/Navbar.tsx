"use client";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (p: string) => pathname === p;
  const isHome = pathname === "/" || pathname === "/landing";

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* <Link
              href="/landing"
              className="text-xl font-semibold text-indigo-600"
            >
              The Study Advisor
            </Link> */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              {/* <h1 className="text-lg sm:text-xl font-bold text-brand-heading tracking-tight">
                The Study Advisor
              </h1> */}
              <Link
                href="/landing"
                // className="text-xl font-semibold text-indigo-600"
                className="text-lg sm:text-xl font-bold text-indigo-600 tracking-tight"
              >
                The Study Advisor
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-2 ml-6">
              <Link
                href="/landing"
                className={`px-3 py-2 rounded-md text-sm ${isHome ? "text-indigo-700 font-medium" : "text-gray-600 hover:text-indigo-600"}`}
              >
                Home
              </Link>
              <Link
                href="/landing#features"
                className="px-3 py-2 rounded-md text-sm text-gray-600 hover:text-indigo-600"
              >
                Features
              </Link>
              <Link
                href="/landing#pricing"
                className="px-3 py-2 rounded-md text-sm text-gray-600 hover:text-indigo-600"
              >
                Pricing
              </Link>
              <Link
                href="/about-us"
                className="px-3 py-2 rounded-md text-sm text-gray-600 hover:text-indigo-600"
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="px-3 py-2 rounded-md text-sm text-gray-600 hover:text-indigo-600"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:opacity-95"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md text-sm hover:bg-indigo-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
