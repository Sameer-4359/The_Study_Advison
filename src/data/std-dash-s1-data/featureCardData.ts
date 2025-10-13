// data/featureCardData.ts
import { CheckCircle, XCircle } from "lucide-react";

export const featureCardData = {
  defaultIconBgColor: "#EEF2FF", // light indigo
  defaultIconColor: "#4F46E5", // indigo
  defaultProgressColor: "#4F46E5",
  defaultStatusIconColor: "#16A34A", // green

  // Example content (can be replaced dynamically)
  sampleFeature: {
    title: "AI Study Assistance",
    description: "Get instant AI-powered study help anytime.",
    progress: 75,
    leftButton: {
      text: "Active",
      bgColor: "#DBEAFE",
      textColor: "#1E40AF",
    },
    rightButton: {
      text: "View Details",
      onClick: () => alert("Details opened!"),
    },
    statusIcon: CheckCircle,
  },

  inactiveFeature: {
    title: "Premium Access",
    description: "Unlock all study materials and analytics.",
    progress: 40,
    leftButton: {
      text: "Inactive",
      bgColor: "#FEE2E2",
      textColor: "#991B1B",
    },
    rightButton: {
      text: "Upgrade",
      onClick: () => alert("Upgrade clicked!"),
    },
    statusIcon: XCircle,
  },
};
