// "use client";

// import React from "react";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";
// import { breadcrumbData } from "@/data/document-s3-data/breadcrumbData";

// type BreadcrumbItem = {
//   label: string;
//   href?: string;
// };

// type BreadcrumbProps = {
//   items?: BreadcrumbItem[];
//   type?: keyof typeof breadcrumbData;
// };

// export default function Breadcrumb({ items, type }: BreadcrumbProps) {
//   // Priority: if items are passed manually, use them; else load from data file
//   const breadcrumbItems = items || (type ? breadcrumbData[type] : []);

//   return (
//     <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
//       {breadcrumbItems.map((item, index) => (
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



// src/components/document-s3/Breadcrumb.tsx
"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-700"
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