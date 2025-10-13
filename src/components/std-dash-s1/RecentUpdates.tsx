// // components/RecentUpdates.tsx
// "use client";

// import React from "react";

// type Update = {
//   id: string;
//   message: string;
//   time: string;
//   type: "success" | "warning" | "info";
// };

// type RecentUpdatesProps = {
//   updates?: Update[];
// };

// const defaultUpdates: Update[] = [
//   {
//     id: "1",
//     message: "Your documents have been verified successfully",
//     time: "3 hours ago",
//     type: "info",
//   },
//   {
//     id: "2",
//     message: "Complete your profile to unlock university recommendations",
//     time: "1 day ago",
//     type: "warning",
//   },
//   {
//     id: "3",
//     message: "Welcome to The Study Advisor! Start with profile setup.",
//     time: "2 days ago",
//     type: "success",
//   },
// ];

// const getTypeStyles = (type: Update["type"]) => {
//   switch (type) {
//     case "success":
//       return {
//         bgColor: "bg-green-50",
//         dotColor: "bg-green-500",
//       };
//     case "warning":
//       return {
//         bgColor: "bg-yellow-50",
//         dotColor: "bg-yellow-500",
//       };
//     case "info":
//       return {
//         bgColor: "bg-blue-50",
//         dotColor: "bg-blue-500",
//       };
//   }
// };

// export default function RecentUpdates({
//   updates = defaultUpdates,
// }: RecentUpdatesProps) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6">
//       {/* Header */}
//       <div className="mb-5">
//         <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
//         <p className="text-sm text-gray-600 mt-1">
//           Stay informed with your latest connection
//         </p>
//       </div>

//       {/* Updates List */}
//       <div className="space-y-3">
//         {updates.map((update) => {
//           const styles = getTypeStyles(update.type);
//           return (
//             <div
//               key={update.id}
//               className={`${styles.bgColor} rounded-lg p-4 hover:shadow-sm transition-all duration-200 cursor-pointer`}
//             >
//               <div className="flex items-start gap-3">
//                 {/* Dot Indicator */}
//                 <div className={`${styles.dotColor} w-2 h-2 rounded-full mt-2 flex-shrink-0`} />
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-800 font-medium">
//                     {update.message}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">{update.time}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//after data folder
"use client";

import React from "react";
import { defaultUpdates, updateTypeStyles, Update } from "@/data/std-dash-s1-data/recentUpdatesData";

type RecentUpdatesProps = {
  updates?: Update[];
};

export default function RecentUpdates({
  updates = defaultUpdates,
}: RecentUpdatesProps) {
  const getTypeStyles = (type: Update["type"]) => updateTypeStyles[type];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
        <p className="text-sm text-gray-600 mt-1">
          Stay informed with your latest connection
        </p>
      </div>

      {/* Updates List */}
      <div className="space-y-3">
        {updates.map((update) => {
          const styles = getTypeStyles(update.type);
          return (
            <div
              key={update.id}
              className={`${styles.bgColor} rounded-lg p-4 hover:shadow-sm transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                {/* Dot Indicator */}
                <div
                  className={`${styles.dotColor} w-2 h-2 rounded-full mt-2 flex-shrink-0`}
                />

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">
                    {update.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
