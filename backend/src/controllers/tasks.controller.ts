import type { NextFunction, Request, Response } from 'express';
import type { RequestWithUser } from '../middlewares/auth.ts';
import TasksService from '../services/tasks.service.ts';
import { Error } from 'mongoose';

const TasksController = {

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as RequestWithUser;

      const user = authReq.user;

      const data = {
        user: user.id,
        ...req.body,
      };

      const task = await TasksService.create(data);
      res.json(task);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({
          error: error.errors.title,
        });
      }
      next(error);
    }
  },
};

export default TasksController;
