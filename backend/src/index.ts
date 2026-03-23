import express, { type Express } from 'express';
import cors from 'cors';
import apiRoute from './routes/api.route.ts';
import mongoose from 'mongoose';
import { PORT } from './constants/constants.ts';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoute);

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

const run = async () => {
  await mongoose.connect('mongodb://localhost/todo-bilim');

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
