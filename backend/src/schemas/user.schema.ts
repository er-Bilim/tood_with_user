import z from 'zod/v3';

const userValidateSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(15, 'Username must be at most 15 characters long'),
  password: z
    .string()
    .trim()
    .min(10, 'Password must be at least 10 characters long')
    .max(35, 'Password must be at most 35 characters long'),
});

export default userValidateSchema;
