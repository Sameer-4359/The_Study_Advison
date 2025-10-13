// // components/FormActions.tsx
// "use client";

// import React from "react";
// import { Save } from "lucide-react";

// type FormActionsProps = {
//   onCancel: () => void;
//   onSave: () => void;
//   saveLabel?: string;
//   cancelLabel?: string;
//   disabled?: boolean;
//   loading?: boolean;
// };

// export default function FormActions({
//   onCancel,
//   onSave,
//   saveLabel = "Save Changes",
//   cancelLabel = "Cancel",
//   disabled = false,
//   loading = false,
// }: FormActionsProps) {
//   return (
//     <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//       <button
//         onClick={onCancel}
//         disabled={loading}
//         className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {cancelLabel}
//       </button>
//       <button
//         onClick={onSave}
//         disabled={disabled || loading}
//         className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 shadow-sm transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//       >
//         <Save className="w-4 h-4" />
//         <span>{loading ? "Saving..." : saveLabel}</span>
//       </button>
//     </div>
//   );
// }
//after data folder
"use client";

import React from "react";
import { Save } from "lucide-react";
import { defaultFormLabels, buttonStyles } from "@/data/profile-s2-data/formActionsData";

type FormActionsProps = {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function FormActions({
  onCancel,
  onSave,
  saveLabel = defaultFormLabels.saveLabel,
  cancelLabel = defaultFormLabels.cancelLabel,
  disabled = false,
  loading = false,
}: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
      <button
        onClick={onCancel}
        disabled={loading}
        className={buttonStyles.cancel}
      >
        {cancelLabel}
      </button>

      <button
        onClick={onSave}
        disabled={disabled || loading}
        className={buttonStyles.save}
      >
        <Save className="w-4 h-4" />
        <span>{loading ? defaultFormLabels.savingText : saveLabel}</span>
      </button>
    </div>
  );
}
