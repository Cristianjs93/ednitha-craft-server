import { type Application } from 'express';
import healthcheckRouter from './api/healthcheck';

const routes = (app: Application): void => {
  app.use('/api/healthcheck', healthcheckRouter);
};

export default routes;
