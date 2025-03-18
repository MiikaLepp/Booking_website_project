import { z } from 'zod';

const registrationSchema = z.object({
  // name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1)
});

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1)
});

export type IAuthLogin = z.infer<typeof loginSchema>;
export type IAuthRegister = z.infer<typeof registrationSchema>;

export { loginSchema, registrationSchema };
