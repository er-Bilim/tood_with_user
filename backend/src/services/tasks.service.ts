import Task from '../models/Task.ts';
import type { ITask } from '../types/task.types.ts';

const TasksService = {

  create: async (data: ITask) => {
    const task = new Task(data);
    const newTask = await task.populate('user');
    return await newTask.save();
  },
};

export default TasksService;
