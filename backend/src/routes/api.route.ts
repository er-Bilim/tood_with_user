import { Router } from 'express';
import tasksRouter from './tasks/tasks.route.ts';
import usersRouter from './users/users.route.ts';

const apiRoute: Router = Router();

apiRoute.use('/tasks', tasksRouter);
apiRoute.use('/users', usersRouter);

export default apiRoute;
