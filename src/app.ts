import express from 'express';
import configExpress from './config/express';
import routes from './routes';
import connect from './config/database';

const app = express();

void connect()

const port = process.env.PORT ?? 8080;

configExpress(app);
routes(app);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default server
