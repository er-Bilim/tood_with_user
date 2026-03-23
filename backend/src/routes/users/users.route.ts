import { Router } from 'express';
import validate from '../../middlewares/validate.ts';
import userValidateSchema from '../../schemas/user.schema.ts';
import UsersController from '../../controllers/users.controller.ts';
import auth from '../../middlewares/auth.ts';

const usersRouter: Router = Router();

usersRouter.post(
  '/',
  validate(userValidateSchema),
  UsersController.registration,
);

usersRouter.post(
  '/sessions',
  validate(userValidateSchema),
  auth,
  UsersController.authentication,
);

export default usersRouter;
