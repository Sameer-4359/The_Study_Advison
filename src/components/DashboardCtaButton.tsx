"use client";

import { useRouter } from "next/navigation";
import { hasPaidAccess, isLoggedIn } from "@/utils/studentAuth";

type DashboardCtaButtonProps = {
  className?: string;
  label?: string;
};

export default function DashboardCtaButton({
  className,
  label = "Go to Dashboard",
}: DashboardCtaButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    if (!hasPaidAccess()) {
      router.push("/pricing");
      return;
    }

    router.push("/student/dashboard");
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
