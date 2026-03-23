import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod/v3';

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const isValidate = schema.safeParse(req.body);

    if (!isValidate.success) {
      return res.status(400).json({
        error: isValidate.error.errors,
      });
    }

    req.body = isValidate.data;

    next();
  };

export default validate;
