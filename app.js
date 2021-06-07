/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import CategoryModel from './src/models/Category';
import ProductModel from './src/models/Product';
import CategoryRoutes from './src/routes/category';
import ProductRoutes from './src/routes/product';
import ManagerRoutes from './src/routes/manager';

const app = express();

mongoose.connect(`mongodb://${process.env.DATABASE_URL}:${process.envDATABASE_PORT}/${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', CategoryRoutes);
app.use('/', ProductRoutes);
app.use('/', ManagerRoutes);

export default app;
