import express from 'express';
import configExpress from './config/express';
import routes from './routes';

const app = express();
const port = process.env.PORT ?? 8080;

configExpress(app);
routes(app);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default server
