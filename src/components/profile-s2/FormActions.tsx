// "use client";

// import React from "react";
// import { Save } from "lucide-react";
// import { defaultFormLabels, buttonStyles } from "@/data/profile-s2-data/formActionsData";

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
//   saveLabel = defaultFormLabels.saveLabel,
//   cancelLabel = defaultFormLabels.cancelLabel,
//   disabled = false,
//   loading = false,
// }: FormActionsProps) {
//   return (
//     <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//       <button
//         onClick={onCancel}
//         disabled={loading}
//         className={buttonStyles.cancel}
//       >
//         {cancelLabel}
//       </button>

//       <button
//         onClick={onSave}
//         disabled={disabled || loading}
//         className={buttonStyles.save}
//       >
//         <Save className="w-4 h-4" />
//         <span>{loading ? defaultFormLabels.savingText : saveLabel}</span>
//       </button>
//     </div>
//   );
// }


// src/components/profile-s2/FormActions.tsx
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
        type="button"
      >
        {cancelLabel}
      </button>

      <button
        onClick={onSave}
        disabled={disabled || loading}
        className={`${buttonStyles.save} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        type="button"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{defaultFormLabels.savingText}</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>{saveLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}