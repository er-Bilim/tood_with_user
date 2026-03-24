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

  getTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as RequestWithUser;

      const tasks = await TasksService.getTasks(authReq.user);

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as RequestWithUser;
      const task_id = req.params.id as string;
      const data = req.body;
      const isUserTask = await TasksService.getTaskById(authReq.user, task_id);

      if (!isUserTask) {
        return res.status(403).json({
          error: 'Access denied. You are not the owner of this task',
        });
      }

      const updatedTask = await TasksService.updateTask(task_id, data);

      return res.json(updatedTask);
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
