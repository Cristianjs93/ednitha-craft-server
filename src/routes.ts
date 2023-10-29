import { Application } from 'express';
import healthcheckRouter from './api/healthcheck';

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter);
};

export default routes;
