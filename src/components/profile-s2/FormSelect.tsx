// "use client";

// import React from "react";
// import { ChevronDown } from "lucide-react";
// import { formSelectData } from "@/data/profile-s2-data/FormSelectData";

// type FormSelectProps = {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options?: Array<{ value: string; label: string }>;
//   placeholder?: string;
//   required?: boolean;
//   disabled?: boolean;
// };

// export default function FormSelect({
//   label,
//   value,
//   onChange,
//   options = formSelectData.defaultOptions,
//   placeholder = formSelectData.defaultPlaceholder,
//   required = false,
//   disabled = false,
// }: FormSelectProps) {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-900 mb-2">
//         {label}
//       </label>
//       <div className="relative">
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           required={required}
//           disabled={disabled}
//           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
//         >
//           <option value="">{placeholder}</option>
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//       </div>
//     </div>
//   );
// }


// src/components/profile-s2/FormSelect.tsx
"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { formSelectData } from "@/data/profile-s2-data/FormSelectData";

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export default function FormSelect({
  label,
  value,
  onChange,
  options = formSelectData.defaultOptions,
  placeholder = formSelectData.defaultPlaceholder,
  required = false,
  disabled = false,
  error,
}: FormSelectProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2.5 bg-gray-50 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}