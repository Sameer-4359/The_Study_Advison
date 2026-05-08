import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-md text-center px-8">
          <h1 className="text-4xl font-extrabold">Welcome Back</h1>
          <p className="mt-4 text-indigo-100">
            Access your student dashboard, track progress, and get personalized
            recommendations.
          </p>
          <div className="mt-8 text-sm text-indigo-100">
            New here?{" "}
            <Link href="/signup" className="text-white underline">
              Create an account
            </Link>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Use your student account to continue.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
