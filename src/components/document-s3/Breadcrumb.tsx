// // components/Breadcrumb.tsx
// "use client";

// import React from "react";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// type BreadcrumbItem = {
//   label: string;
//   href?: string;
// };

// type BreadcrumbProps = {
//   items: BreadcrumbItem[];
// };

// export default function Breadcrumb({ items }: BreadcrumbProps) {
//   return (
//     <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
//       {items.map((item, index) => (
//         <React.Fragment key={index}>
//           {index > 0 && (
//             <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           )}
//           {item.href ? (
//             <Link
//               href={item.href}
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               {item.label}
//             </Link>
//           ) : (
//             <span className="text-gray-900 font-medium">{item.label}</span>
//           )}
//         </React.Fragment>
//       ))}
//     </nav>
//   );
// }
//after data
"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbData } from "@/data/document-s3-data/breadcrumbData";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  type?: keyof typeof breadcrumbData;
};

export default function Breadcrumb({ items, type }: BreadcrumbProps) {
  // Priority: if items are passed manually, use them; else load from data file
  const breadcrumbItems = items || (type ? breadcrumbData[type] : []);

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
