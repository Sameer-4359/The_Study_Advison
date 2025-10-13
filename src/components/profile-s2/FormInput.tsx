// // components/FormInput.tsx
// "use client";

// import React from "react";

// type FormInputProps = {
//   label: string;
//   type?: string;
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   required?: boolean;
//   disabled?: boolean;
// };

// export default function FormInput({
//   label,
//   type = "text",
//   value,
//   onChange,
//   placeholder = "",
//   required = false,
//   disabled = false,
// }: FormInputProps) {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-900 mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         required={required}
//         disabled={disabled}
//         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//       />
//     </div>
//   );
// }

//after data 
"use client";

import React from "react";
import { formInputDefaults, formInputStyles } from "@/data/profile-s2-data/formInputData";

type FormInputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = formInputDefaults.placeholder,
  required = formInputDefaults.required,
  disabled = formInputDefaults.disabled,
}: FormInputProps) {
  return (
    <div className="w-full">
      <label className={formInputStyles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={formInputStyles.input}
      />
    </div>
  );
}
