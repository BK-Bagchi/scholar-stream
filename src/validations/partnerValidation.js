import z from "zod";

export const partnerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  photoURL: z.string().url("Must be a valid URL"),
  subject: z.string().min(2, "Please enter a valid subject"),
  studyMode: z.enum(["Online", "Offline"], {
    required_error: "Select a study mode",
  }),
  availabilityTime: z.string().min(2, "Enter your available time"),
  location: z.string().min(2, "Enter a valid location"),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Expert"], {
    required_error: "Select an experience level",
  }),
  rating: z.coerce
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Rating cannot be negative")
    .max(5, "Rating cannot exceed 5")
    .optional(),
});
