import { Router } from 'express';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import TasksController from '../../controllers/tasks.controller.ts';
import {
  taskValidateSchema,
  updateTaskValidateSchema,
} from '../../schemas/task.schema.ts';

const tasksRouter: Router = Router();

tasksRouter.post(
  '/',
  auth,
  validate(taskValidateSchema),
  TasksController.create,
);

tasksRouter.get(
  '/',
  auth,
  validate(taskValidateSchema),
  TasksController.getTasks,
);

tasksRouter.patch(
  '/:id',
  auth,
  validate(updateTaskValidateSchema),
  TasksController.updateTask,
);

export default tasksRouter;
