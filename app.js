import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(`mongodb://${process.env.DATABASE_URL}:${process.envDATABASE_PORT}/${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

export default app;
