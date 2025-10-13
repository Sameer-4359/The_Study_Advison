// data/recentUpdatesData.ts

export type Update = {
  id: string;
  message: string;
  time: string;
  type: "success" | "warning" | "info";
};

export const defaultUpdates: Update[] = [
  {
    id: "1",
    message: "Your documents have been verified successfully",
    time: "3 hours ago",
    type: "info",
  },
  {
    id: "2",
    message: "Complete your profile to unlock university recommendations",
    time: "1 day ago",
    type: "warning",
  },
  {
    id: "3",
    message: "Welcome to The Study Advisor! Start with profile setup.",
    time: "2 days ago",
    type: "success",
  },
];

// 🎨 Centralized type-to-color mapping
export const updateTypeStyles = {
  success: {
    bgColor: "bg-green-50",
    dotColor: "bg-green-500",
  },
  warning: {
    bgColor: "bg-yellow-50",
    dotColor: "bg-yellow-500",
  },
  info: {
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-500",
  },
};
