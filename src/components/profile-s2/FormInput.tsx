// "use client";

// import React from "react";
// import { formInputDefaults, formInputStyles } from "@/data/profile-s2-data/formInputData";

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
//   placeholder = formInputDefaults.placeholder,
//   required = formInputDefaults.required,
//   disabled = formInputDefaults.disabled,
// }: FormInputProps) {
//   return (
//     <div className="w-full">
//       <label className={formInputStyles.label}>{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         required={required}
//         disabled={disabled}
//         className={formInputStyles.input}
//       />
//     </div>
//   );
// }




// src/components/profile-s2/FormInput.tsx
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
  min?: string | number;
  max?: string | number;
  step?: string;
  error?: string;
};

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = formInputDefaults.placeholder,
  required = formInputDefaults.required,
  disabled = formInputDefaults.disabled,
  min,
  max,
  step,
  error,
}: FormInputProps) {
  return (
    <div className="w-full">
      <label className={formInputStyles.label}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`${formInputStyles.input} ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}