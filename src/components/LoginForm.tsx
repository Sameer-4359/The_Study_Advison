// // components/LoginForm.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { GraduationCap } from "lucide-react";
// import RoleDropdown, { Role } from "./RoleDropDown";

// export default function LoginForm() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [role, setRole] = useState<Role>("Student");
//   const [submitting, setSubmitting] = useState(false);
//   const [showSignupRoles, setShowSignupRoles] = useState(false);

//   // Login (fake)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // Save to localStorage for header/welcome usage
//     localStorage.setItem("userName", name);
//     localStorage.setItem("userRole", role);

//     setTimeout(() => {
//       setSubmitting(false);
//       router.push("/dashboard");
//     }, 600);
//   };

//   // When user chooses "Create Account" role → save and navigate to signup
//   const handleSignupRoleSelect = (selected: Role) => {
//     localStorage.setItem("selectedSignupRole", selected);
//     setShowSignupRoles(false);
//     router.push("/signup");
//   };

//   return (
//     <div className="w-full max-w-[720px] mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 transition-all duration-300">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center">
//           <div
//             className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
//             style={{ backgroundColor: "#4F46E5" }}
//           >
//             <GraduationCap color="#fff" className="w-8 h-8 sm:w-10 sm:h-10" />
//           </div>

//           <h1
//             className="font-semibold mb-2 text-[22px] sm:text-[30px] leading-tight"
//             style={{ color: "#4169E1" }}
//           >
//             The Study Advisor
//           </h1>

//           <p className="text-sm sm:text-[16px] text-[#6B7280] mb-6 sm:mb-8">
//             Your Gateway to Global Education
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
//           {/* Name */}
//           <div className="mb-4 sm:mb-6">
//             <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
//               Your Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-3 sm:py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
//               aria-label="Your name"
//             />
//           </div>

//           {/* Role (Login as) */}
//           <div className="mb-5 sm:mb-6">
//             <RoleDropdown
//               value={role}
//               onChange={(v) => setRole(v)}
//               label="Login as"
//             />
//           </div>

//           {/* Access Dashboard */}
//           <div className="mb-4 sm:mb-6">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-lg px-5 sm:px-6 py-3 sm:py-4 font-semibold text-white text-[15px] sm:text-[16px] transition-transform active:scale-95 disabled:opacity-70 hover:opacity-90 duration-200"
//               style={{
//                 background: "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
//               }}
//             >
//               {submitting ? "Accessing..." : "Access Dashboard"}
//             </button>
//           </div>

//           {/* Create Account: single control (opens RoleDropdown) */}
//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => setShowSignupRoles((s) => !s)}
//               className="text-[#4F46E5] font-medium hover:underline text-sm sm:text-base"
//             >
//               Create Account
//             </button>

//             {/* Role dropdown for signup (appears inline, responsive) */}
//             {showSignupRoles && (
//               <div className="mt-4">
//                 <RoleDropdown
//                   value={role}
//                   onChange={(selected) => handleSignupRoleSelect(selected)}
//                   label="Sign up as"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <p className="text-center text-xs sm:text-sm text-[#6B7280] mt-6">
//             Demo Mode - Choose any role to explore the platform
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
/// new try
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import RoleDropdown, { Role } from "./RoleDropDown";

export default function LoginForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [submitting, setSubmitting] = useState(false);
  const [showSignupRoles, setShowSignupRoles] = useState(false);

  // ✅ Form Submit — only when user clicks Access Dashboard
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name before continuing!");
      return;
    }

    setSubmitting(true);

    // Save to localStorage for header/welcome usage
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  // ✅ Only used for “Create Account”, not login
  const handleSignupRoleSelect = (selected: Role) => {
    localStorage.setItem("selectedSignupRole", selected);
    setShowSignupRoles(false);
    router.push("/signup");
  };

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <GraduationCap color="#fff" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <h1
            className="font-semibold mb-2 text-[22px] sm:text-[30px] leading-tight"
            style={{ color: "#4169E1" }}
          >
            The Study Advisor
          </h1>

          <p className="text-sm sm:text-[16px] text-[#6B7280] mb-6 sm:mb-8">
            Your Gateway to Global Education
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
          {/* Name */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-black font-semibold text-sm sm:text-[16px] mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-lg px-3 sm:px-4 py-3 sm:py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm sm:text-base"
              aria-label="Your name"
            />
          </div>

          {/* Role (Login as) */}
          <div className="mb-5 sm:mb-6">
            <RoleDropdown
              value={role}
              onChange={(v) => setRole(v)} // ✅ Just update role, no redirect
              label="Login as"
            />
          </div>

          {/* Access Dashboard */}
          <div className="mb-4 sm:mb-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg px-5 sm:px-6 py-3 sm:py-4 font-semibold text-white text-[15px] sm:text-[16px] transition-transform active:scale-95 disabled:opacity-70 hover:opacity-90 duration-200"
              style={{
                background:
                  "linear-gradient(90deg, #818CF8 0%, #A78BFA 100%)",
              }}
            >
              {submitting ? "Accessing..." : "Access Dashboard"}
            </button>
          </div>

          {/* Create Account */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowSignupRoles((s) => !s)}
              className="text-[#4F46E5] font-medium hover:underline text-sm sm:text-base"
            >
              Create Account
            </button>

            {showSignupRoles && (
              <div className="mt-4">
                <RoleDropdown
                  value={role}
                  onChange={(selected) => handleSignupRoleSelect(selected)}
                  label="Sign up as"
                />
              </div>
            )}
          </div>

          <p className="text-center text-xs sm:text-sm text-[#6B7280] mt-6">
            Demo Mode - Choose any role to explore the platform
          </p>
        </form>
      </div>
    </div>
  );
}

