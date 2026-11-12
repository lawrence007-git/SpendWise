import { z } from "zod";

/* ---------- Field rules ---------- */

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Enter at least 3 characters.")
  .max(30, "Use 30 characters or fewer.")
  .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, and underscores only.");

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(128, "Use 128 characters or fewer.");

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Enter your full name.")
  .max(100, "Use 100 characters or fewer.");

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(255, "Use 255 characters or fewer.");

/* ---------- Form schemas ---------- */

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

/* ---------- Error helper ---------- */

export type FieldErrors = Record<string, string>;

export function getFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/* ---------- Field definitions (plain data) ---------- */

export const fields = {
  name: {
    name: "name",
    label: "Full name",
    placeholder: "Your full name",
    autoComplete: "name",
    maxLength: 100,
  },
  username: {
    name: "username",
    label: "Username",
    placeholder: "Your username",
    autoComplete: "username",
    maxLength: 30,
  },
  email: {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    maxLength: 255,
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "Repeat your password",
    autoComplete: "new-password",
    maxLength: 128,
  },
} as const;
