import z from "zod";

export const register = z.object({
  body: z.object({
    name: z.string("Name is required"),
    email: z.string("Email is required").email("Invalid email address"),
    password: z
      .string("password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  }),
});

export const login = z.object({
  body: z.object({
    email: z.string("Email is required").email("Invalid email address"),
    password: z
      .string("Password is required")
      .min(3, "password much be more then 3 characters"),
  }),
});

export const password = z.object({
  body: z.object({
    oldPassword: z.string("old password is required"),
    newPassword: z
      .string("New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/),
  }),
});
