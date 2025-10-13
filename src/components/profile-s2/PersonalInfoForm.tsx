// "use client";
// import React, { useState } from "react";

// export default function PersonalInfoForm() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dob, setDob] = useState("");
//   const [nationality, setNationality] = useState("");

//   return (
//     <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
//       <h2 className="font-semibold text-gray-800 mb-1">Personal Information</h2>
//       <p className="text-sm text-gray-500 mb-5">Basic personal details</p>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">First Name</label>
//           <input
//             type="text"
//             placeholder="Enter first name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Last Name</label>
//           <input
//             type="text"
//             placeholder="Enter last name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Email Address</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Phone Number</label>
//           <input
//             type="text"
//             placeholder="+1-234-567-890"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Date of Birth</label>
//           <input
//             type="date"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Nationality</label>
//           <select
//             value={nationality}
//             onChange={(e) => setNationality(e.target.value)}
//             className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
//           >
//             <option value="">Select nationality</option>
//             <option>Pakistan</option>
//             <option>United States</option>
//             <option>Canada</option>
//             <option>Germany</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
//after data
"use client";
import React, { useState } from "react";
import { personalInfoData } from "@/data/profile-s2-data/PersonalInfoFormData";

export default function PersonalInfoForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");

  const { title, description, fields } = personalInfoData;

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
      <h2 className="font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">{fields.firstName.label}</label>
          <input
            type="text"
            placeholder={fields.firstName.placeholder}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fields.lastName.label}</label>
          <input
            type="text"
            placeholder={fields.lastName.placeholder}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fields.email.label}</label>
          <input
            type="email"
            placeholder={fields.email.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fields.phone.label}</label>
          <input
            type="text"
            placeholder={fields.phone.placeholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fields.dob.label}</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">{fields.nationality.label}</label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4F46E5] bg-gray-50"
          >
            <option value="">{fields.nationality.placeholder}</option>
            {fields.nationality.options.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
