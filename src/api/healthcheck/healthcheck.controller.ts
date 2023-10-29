import { Request, Response } from 'express';

export const healthcheckHandler = (_: Request, res: Response) => {
  res.status(200).json({ message: 'Server ok', uptime: process.uptime() });
};
