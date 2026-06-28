// Form data types matching the schema
export interface FormData {
  // Step 1 - Personal Information
  fullName: string;
  email: string;
  whatsappNumber: string;
  alternativeNumber: string;
  parentGuardianPhoneNumber: string;
  kcseIndexNumber: string;
  kcpeIndexNumber: string;

  // Step 2 - Education
  level: "Degree" | "Tvet" | "Kmtc" | "";
  course: string;
  institutionType: "Public" | "Private" | "Kmtc" | "";
  institutionName: string;
  admissionNumber: string;

  // Step 3 - Background
  hasDisabilities: boolean | null;
  wasSponsored: boolean | null;
  familyStatus:
    | "Both parents alive"
    | "Single parent"
    | "Adopted"
    | "Parent/parents deceased"
    | "";

  // Step 4 - Documents
  documents: DocumentFile[];
}

export interface DocumentFile {
  type: string;
  file: File | null;
  preview: string;
  uploaded: boolean;
  progress: number;
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  alternativeNumber: "",
  parentGuardianPhoneNumber: "",
  kcseIndexNumber: "",
  kcpeIndexNumber: "",
  level: "",
  course: "",
  institutionType: "",
  institutionName: "",
  admissionNumber: "",
  hasDisabilities: null,
  wasSponsored: null,
  familyStatus: "",
  documents: [],
};

export type StepErrors = Record<string, string>;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d+\-() ]{9,15}$/.test(phone);
}

export function validateStep(step: number, data: FormData): StepErrors {
  const errors: StepErrors = {};

  switch (step) {
    case 0: {
      if (!data.fullName.trim()) errors.fullName = "Full name is required";
      if (!data.email.trim()) errors.email = "Email is required";
      else if (!isValidEmail(data.email))
        errors.email = "Please enter a valid email";
      if (!data.whatsappNumber.trim())
        errors.whatsappNumber = "WhatsApp number is required";
      else if (!isValidPhone(data.whatsappNumber))
        errors.whatsappNumber = "Please enter a valid phone number";
      if (
        data.alternativeNumber &&
        !isValidPhone(data.alternativeNumber)
      )
        errors.alternativeNumber = "Please enter a valid phone number";
      if (!data.parentGuardianPhoneNumber.trim())
        errors.parentGuardianPhoneNumber =
          "Parent/guardian phone number is required";
      else if (!isValidPhone(data.parentGuardianPhoneNumber))
        errors.parentGuardianPhoneNumber =
          "Please enter a valid phone number";
      if (!data.kcseIndexNumber.trim())
        errors.kcseIndexNumber = "KCSE index number is required";
      if (!data.kcpeIndexNumber.trim())
        errors.kcpeIndexNumber = "KCPE index number is required";
      break;
    }
    case 1: {
      if (!data.level) errors.level = "Please select your level";
      if (!data.course.trim()) errors.course = "Course is required";
      if (!data.institutionType)
        errors.institutionType = "Please select your institution type";
      if (!data.institutionName.trim())
        errors.institutionName = "Institution name is required";
      if (!data.admissionNumber.trim())
        errors.admissionNumber = "Admission/Reg number is required";
      break;
    }
    case 2: {
      if (data.hasDisabilities === null)
        errors.hasDisabilities = "Please select an option";
      if (data.wasSponsored === null)
        errors.wasSponsored = "Please select an option";
      if (!data.familyStatus)
        errors.familyStatus = "Please select your family status";
      break;
    }
    case 3: {
      const requiredDocs = ["passport_photo", "identity_document"];

      if (data.wasSponsored) {
        requiredDocs.push("sponsorship_letter");
      }
      if (data.hasDisabilities) {
        requiredDocs.push("ncpwd_certificate");
      }

      for (const docType of requiredDocs) {
        const doc = data.documents.find((d) => d.type === docType);
        if (!doc || !doc.file) {
          errors[docType] = `This document is required`;
        }
      }
      break;
    }
  }

  return errors;
}
