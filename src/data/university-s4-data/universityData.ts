// data/universityData.ts
import { UniversityCardProps } from "@/components/University-s4/UniversityCard";

export const universities: UniversityCardProps[] = [
  {
    universityName: "Harvard University",
    country: "USA",
    ranking: "1",
    location: "Cambridge, MA",
    tuitionFee: "$51,000 / year",
    deadline: "Jan 15, 2025",
    matchPercentage: 92,
    programs: ["Computer Science", "Data Science", "AI Engineering"],
    requirements: {
      minGPA: "3.8",
      minIELTS: "7.5",
      minSAT: "1450",
    },
    isRecommended: true,
    isSaved: false,
  },
  {
    universityName: "Technical University of Munich",
    country: "Germany",
    ranking: "37",
    location: "Munich, Germany",
    tuitionFee: "€1,500 / semester",
    deadline: "May 31, 2025",
    matchPercentage: 75,
    programs: ["Robotics", "Software Engineering"],
    requirements: {
      minGPA: "3.2",
      minIELTS: "6.5",
    },
    isRecommended: false,
    isSaved: true,
  },
];
