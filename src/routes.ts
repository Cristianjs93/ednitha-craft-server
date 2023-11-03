import { type Application } from 'express';
import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user'

const routes = (app: Application): void => {
  app.use('/api/healthcheck', healthcheckRouter);
  app.use('/api/user', userRouter);
};

export default routes;
