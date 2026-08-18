import { z } from "zod";

export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  confirmNewPassword: z
    .string()
    .trim()
    .min(1, "Confirm Password is required")
    .min(8, "Confirm Password must be at least 8 characters")
    .regex(
      /[A-Z]/,
      "Confirm Password must contain at least one uppercase letter",
    )
    .regex(
      /[a-z]/,
      "Confirm Password must contain at least one lowercase letter",
    )
    .regex(/[0-9]/, "Confirm Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Confirm Password must contain at least one special character",
    ),
});
