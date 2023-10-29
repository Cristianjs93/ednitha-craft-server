import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server ok' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
