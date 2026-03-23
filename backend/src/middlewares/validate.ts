import type { Request, Response, NextFunction } from 'express';
import type { ZodObject } from 'zod';

const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const isValidate = schema.safeParse(req.body);

    if (!isValidate.success) {
      return res.status(400).json({
        error: isValidate.error.message,
      });
    }

    req.body = isValidate.data;

    next();
  };

export default validate;
