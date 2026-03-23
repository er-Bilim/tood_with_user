import { Router } from 'express';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import TasksController from '../../controllers/tasks.controller.ts';
import taskValidateSchema from '../../schemas/task.schema.ts';

const tasksRouter: Router = Router();

tasksRouter.post('/', auth, validate(taskValidateSchema), TasksController.create);

export default tasksRouter;
