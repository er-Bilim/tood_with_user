import mongoose from 'mongoose';
import config from '../config.ts';
import User from '../models/user/User.ts';
import Task from '../models/Task.ts';
import { randomUUID } from 'node:crypto';

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('tasks');
  } catch (error) {
    console.error(error);
  }

  const [user1, user2] = await User.create(
    {
      username: 'danil',
      password: '1234567890',
      token: randomUUID(),
    },
    {
      username: 'mathieu',
      password: '1234567890',
      token: randomUUID(),
    },
  );

  await Task.create(
    {
      user: user1!.id,
      title: 'Task 1',
      description: 'Description 1',
      status: 'complete',
    },
    {
      user: user2!.id,
      title: 'Task 2',
      description: 'Description 2',
      status: 'in_progress',
    },
  );

  await db.close();
};

run().catch((error) => console.error(error));
