import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 1,
    max: 25,
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
