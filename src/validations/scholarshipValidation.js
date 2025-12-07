import { z } from "zod";

export const scholarshipSchema = z.object({
  scholarshipName: z
    .string()
    .min(3, "Scholarship Name must be at least 3 characters"),

  universityName: z
    .string()
    .min(3, "University Name must be at least 3 characters"),

  universityImage: z.string().url("Provide a valid image URL (https://...)"),

  universityCountry: z
    .string()
    .min(3, "Country name must be least 3 characters"),

  universityCity: z.string().min(3, "City name must be least 3 characters"),

  universityWorldRank: z
    .number({
      invalid_type_error: "World Rank must be a number",
    })
    .positive("World Rank must be positive"),

  subjectCategory: z.string().min(2, "Subject Category is required"),

  scholarshipCategory: z.enum(["Full fund", "Partial", "Self-fund"], {
    errorMap: () => ({ message: "Select a valid scholarship category" }),
  }),

  degree: z.enum(["Diploma", "Bachelor", "Masters", "PhD"], {
    errorMap: () => ({ message: "Select a valid degree" }),
  }),

  tuitionFees: z
    .number({
      invalid_type_error: "Tuition Fees must be a number",
    })
    .optional(),

  applicationFees: z
    .number({
      invalid_type_error: "Application Fees must be a number",
    })
    .min(0, "Application Fees cannot be negative"),

  serviceCharge: z
    .number({
      invalid_type_error: "Service Charge must be a number",
    })
    .min(0, "Service Charge cannot be negative"),

  applicationDeadline: z.string().min(1, "Deadline date is required"),

  postedUserEmail: z.string().email("Provide a valid email"),
});
