// // components/PageHeader.tsx
// "use client";

// import React from "react";
// import { CheckCircle2 } from "lucide-react";

// type PageHeaderProps = {
//   title: string;
//   description: string;
//   completionPercentage?: number;
// };

// export default function PageHeader({
//   title,
//   description,
//   completionPercentage,
// }: PageHeaderProps) {
//   return (
//     <div className="mb-6 sm:mb-8">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             {title}
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 mt-1">
//             {description}
//           </p>
//         </div>
//         {completionPercentage !== undefined && (
//           <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
//             <CheckCircle2 className="w-5 h-5" />
//             <span className="text-sm font-semibold">
//               {completionPercentage}% Complete
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// after data
"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export type PageHeaderProps = {
  title: string;
  description: string;
  completionPercentage?: number;
};

export default function PageHeader({
  title,
  description,
  completionPercentage,
}: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {description}
          </p>
        </div>

        {completionPercentage !== undefined && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-semibold">
              {completionPercentage}% Complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
