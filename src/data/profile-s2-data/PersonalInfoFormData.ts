// data/PersonalInfoFormData.ts
export const personalInfoData = {
  title: "Personal Information",
  description: "Basic personal details",
  fields: {
    firstName: { label: "First Name", placeholder: "Enter first name" },
    lastName: { label: "Last Name", placeholder: "Enter last name" },
    email: { label: "Email Address", placeholder: "Enter your email" },
    phone: { label: "Phone Number", placeholder: "+1-234-567-890" },
    dob: { label: "Date of Birth" },
    nationality: {
      label: "Nationality",
      placeholder: "Select nationality",
      options: ["Pakistan", "United States", "Canada", "Germany"],
    },
  },
};
