import z from 'zod';

const taskValidateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be at least 1 character long')
    .max(25, 'Title must be at most 25 characters long'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long')
    .max(255, 'Description must be at most 255 characters long'),
  status: z.enum(['new', 'in_progress', 'complete'], {
    error: () => ({
      message: 'Status must be "new", "in_progress" or "complete"',
    }),
  }),
});

export default taskValidateSchema;
