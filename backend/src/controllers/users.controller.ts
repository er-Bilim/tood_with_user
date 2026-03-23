import type { NextFunction, Request, Response } from 'express';
import type { IUserReg } from '../types/user.types.ts';
import UsersService from '../services/users.service.ts';
import { Error } from 'mongoose';

const UsersController = {

  registration: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUserReg = req.body;
      const user = await UsersService.registration(data);
      res.json(user);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({ error: error.errors });
      }

      next(error);
    }
  },

  authentication: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const { user, isMatch } = await UsersService.authentication(
        username,
        password,
      );

      if (!user) {
        return res.status(404).json({ message: 'User is not found' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default UsersController;
