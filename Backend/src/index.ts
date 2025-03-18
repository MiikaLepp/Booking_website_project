import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import './database';
import { handleError } from './lib/responses';
import { Routes } from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json()); // used to be: app.post('*', express.json());

console.log('Loaded routes:', Routes); // <-- Debugging: Log the loaded routes

Routes.forEach(route => {
  console.log(`Registering route: ${route.path}`); // <-- Debugging: Log each registered route
  app.use(route.path, route.router);
});

app.get('*', (_req, res) => {
  handleError(res, 'Not found', 404);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
