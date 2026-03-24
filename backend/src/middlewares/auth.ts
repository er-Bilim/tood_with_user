import type { NextFunction, Request, Response } from 'express';
import UsersService from '../services/users.service.ts';
import type { HydratedDocument } from 'mongoose';
import type { IUser } from '../types/user.types.ts';
import TasksService from '../services/tasks.service.ts';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const task_id = req.params.id;
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).json({
      error: 'Access denied. No token provided',
    });
  }

  const user = await UsersService.getUserByToken(token);

  if (!user) {
    return res.status(401).json({
      error: 'Access denied. Invalid token',
    });
  }

  if (task_id) {
    const isUserOwner = await TasksService.getTaskById(user, task_id as string);

    if (!isUserOwner) {
      return res.status(403).json({
        error: 'Access denied. You are not the owner of this task',
      });
    }
  }

  req.user = user;
  next();
};

export default auth;
