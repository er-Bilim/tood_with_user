export interface ITask {
  user: string;
  title: string;
  description: string | null;
  status: string;
}

export type ITaskMut = Omit<ITask, 'user'>;
