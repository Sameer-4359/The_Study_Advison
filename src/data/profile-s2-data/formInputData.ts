// data/formInputData.ts

// Default placeholders or texts for generic inputs
export const formInputDefaults = {
  placeholder: "",
  required: false,
  disabled: false,
};

// Common Tailwind classes for input and label styling
export const formInputStyles = {
  label: "block text-sm font-medium text-gray-900 mb-2",
  input:
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
};
