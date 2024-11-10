import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export const UserDataSchema = z.object({
  public_id: z.string(),
  email: z.string(),
  username: z.nullable(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  verified: z.boolean(),
});

export type UserData = z.infer<typeof UserDataSchema>;
export type SignupForm = z.infer<typeof SignupSchema>;
