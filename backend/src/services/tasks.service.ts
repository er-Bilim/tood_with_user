import type { HydratedDocument } from 'mongoose';
import Task from '../models/Task.ts';
import type { ITaskMut } from '../types/task.types.ts';
import type { IUser } from '../types/user.types.ts';

const TasksService = {
  create: async (data: ITaskMut) => {
    const task = new Task(data);
    const newTask = await task.populate('user');
    return await newTask.save();
  },

  getTasks: async (user: HydratedDocument<IUser>) => {
    const tasks = await Task.find({ user: user.id });
    return tasks;
  },

  getTaskById: async (user: HydratedDocument<IUser>, task_id: string) => {
    const tasks = await Task.find({ user: user.id, _id: task_id });

    if (tasks.length === 0) return null;

    return tasks;
  },

  updateTask: async (task_id: string, data: ITaskMut) => {
    const updatedTask = await Task.findByIdAndUpdate(task_id, data, {
      returnDocument: 'after',
      runValidators: true,
    });

    return updatedTask;
  },

  deleteTask: async (task_id: string) => {
    const deletedTask = await Task.findByIdAndDelete(task_id);    
    return deletedTask;
  }
};

export default TasksService;
