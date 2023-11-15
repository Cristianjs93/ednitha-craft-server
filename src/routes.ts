import { type Application } from 'express';
import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user'
import productRouter from './api/product'
import reviewRouter from './api/review'

const routes = (app: Application): void => {
  app.use('/api/healthcheck', healthcheckRouter);
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/review', reviewRouter);
};

export default routes;
