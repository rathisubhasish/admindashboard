import {z} from "zod";

export const adminSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "FirstName is required")
        .min(2, "FirstName must be at least 2 characters")
        .max(100, "FirstName must not exceed 100 characters"),

    lastName: z
        .string()
        .trim()
        .min(1, "LastName is required")
        .min(2, "LastName must be at least 2 characters")
        .max(100, "LastName must not exceed 100 characters"),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .trim()
        .min(1, "Password is required"),

})