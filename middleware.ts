import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/landing",
  "/login",
  "/signup",
  "/pricing",
  "/explore-universities",
  "/about-us",
  "/contact-us",
  "/payment",
  "/ai-chatbot",
  "/university-recommendations",
  "/api",
  "/favicon.ico",
  "/_next",
  "/static",
];

function isPublic(pathname: string) {
  if (pathname === "/" || pathname === "/landing") return true;
  for (const p of PUBLIC_PATHS) {
    if (p === "/" || p === "/landing") continue;
    if (pathname.startsWith(p)) return true;
  }
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  // Public routes - let them pass
  if (isPublic(pathname)) return NextResponse.next();

  const token = req.cookies.get("token");
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = req.cookies.get("role")?.value || "";
  if (role !== "student") {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  const paymentStatus = req.cookies.get("paymentStatus")?.value || "free";
  const isPremiumPath =
    pathname.startsWith("/dashboard") || pathname.startsWith("/student");

  if (isPremiumPath && paymentStatus !== "paid") {
    const pricingUrl = new URL("/pricing", req.url);
    return NextResponse.redirect(pricingUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/student/:path*", "/student"],
};
