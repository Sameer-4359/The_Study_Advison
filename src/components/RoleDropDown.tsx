// components/RoleDropdown.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type Role = "Student" | "Counselor" | "Admin";

interface RoleDropdownProps {
  value: Role;
  onChange: (v: Role) => void;
  id?: string;
  label?: string;
}

export default function RoleDropdown({ value, onChange, id = "role", label }: RoleDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const options: Role[] = ["Student", "Counselor", "Admin"];

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="w-full" ref={ref}>
      {label && <label htmlFor={id} className="block text-black font-semibold text-[18px] mb-2">{label}</label>}
      <div
        id={id}
        role="combobox"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((s) => !s);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="relative"
      >
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="w-full bg-white border-2 border-[var(--border-gray)] rounded-lg px-4 py-4 flex items-center justify-between text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--royal-blue)] transition"
        >
          <span className="text-gray-700">{value}</span>
          <ChevronDown size={20} className="opacity-70" />
        </button>

        {/* Dropdown panel */}
        <div
          className={`absolute left-0 right-0 mt-2 rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${
            open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 pointer-events-none -translate-y-1"
          }`}
        >
          <ul className="py-2">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#EEF2FF] transition-colors text-gray-700"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
