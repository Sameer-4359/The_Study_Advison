export type StudentInfo = {
  role?: string;
  paymentStatus?: "free" | "paid";
  [key: string]: unknown;
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getStudent = (): StudentInfo | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudentInfo;
  } catch (err) {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const hasPaidAccess = (): boolean => {
  const student = getStudent();
  if (!student) return false;
  return student.role === "student" && student.paymentStatus === "paid";
};
