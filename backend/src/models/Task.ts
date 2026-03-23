import { model, Schema } from 'mongoose';
import User from './user/User.ts';

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

    validate: {
      validator: async (user_id: string) => {
        const user = await User.findById(user_id);

        if (!user) {
          return false;
        }

        return true;
      },
      message: 'User with this id not exists :(',
    },
  },
  title: {
    type: String,
    required: true,
    min: 1,
    max: 25,
    unique: true,

    validate: {
      validator: async (title: string) => {
        const task = await Task.findOne({ title });

        if (task) {
          return false;
        }

        return true;
      },

      message: 'Task with this title already exists :(',
    },
  },
  description: {
    type: String,
    required: false,
    min: 5,
    max: 255,
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'complete'],
  },
});

const Task = model('Task', TaskSchema);

export default Task;
