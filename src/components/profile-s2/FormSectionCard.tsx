// // components/FormSectionCard.tsx
// "use client";

// import React from "react";

// type FormSectionCardProps = {
//   title: string;
//   description: string;
//   children: React.ReactNode;
// };

// export default function FormSectionCard({
//   title,
//   description,
//   children,
// }: FormSectionCardProps) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
//           {title}
//         </h3>
//         <p className="text-sm text-gray-600">{description}</p>
//       </div>

//       {/* Content */}
//       <div>{children}</div>
//     </div>
//   );
// }
//after data
"use client";

import React from "react";
import { formSectionCardData } from "@/data/profile-s2-data/FormSectionCardData";

type FormSectionCardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function FormSectionCard({
  title = formSectionCardData.defaultTitle,
  description = formSectionCardData.defaultDescription,
  children,
}: FormSectionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
