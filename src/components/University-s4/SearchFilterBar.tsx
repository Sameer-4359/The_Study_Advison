// // components/SearchFilterBar.tsx
// "use client";

// import React, { useState } from "react";
// import { Search, SlidersHorizontal } from "lucide-react";

// type SearchFilterBarProps = {
//   onSearch?: (query: string) => void;
//   onFilterClick?: () => void;
//   placeholder?: string;
// };

// export default function SearchFilterBar({
//   onSearch,
//   onFilterClick,
//   placeholder = "Customize your search with search criteria",
// }: SearchFilterBarProps) {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch?.(searchQuery);
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
//       <div className="flex flex-col sm:flex-row gap-3">
//         {/* Search Input */}
//         <form onSubmit={handleSearch} className="flex-1">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder={placeholder}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             />
//           </div>
//         </form>

//         {/* Show Filters Button */}
//         <button
//           onClick={onFilterClick}
//           className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
//         >
//           <SlidersHorizontal className="w-4 h-4" />
//           <span>Show Filters</span>
//         </button>
//       </div>
//     </div>
//   );
// }
//after data




"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { searchBarData } from "@/data/university-s4-data/searchBarData";

type SearchFilterBarProps = {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  placeholderKey?: keyof typeof searchBarData;
};

export default function SearchFilterBar({
  onSearch,
  onFilterClick,
  placeholderKey = "placeholder",
}: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchBarData[placeholderKey]}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </form>

        {/* Show Filters Button */}
        <button
          onClick={onFilterClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{searchBarData.filterButtonLabel}</span>
        </button>
      </div>
    </div>
  );
}
