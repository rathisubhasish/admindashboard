import { z } from "zod";

export const tenantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  legalName: z
    .string()
    .trim()
    .max(150, "Legal name must not exceed 150 characters")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  mobile: z
    .string()
    .trim()
    .min(1, "Mobile is required")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(250, "Address must not exceed 250 characters"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),

  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(100, "State must not exceed 100 characters"),

  pinCode: z
    .string()
    .trim()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Please enter a valid 6-digit pincode"),

  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .max(100, "Country must not exceed 100 characters"),
});
