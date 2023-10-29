import { type Request, type Response } from 'express';

export const healthcheckHandler = (_: Request, res: Response): void => {
  res.status(200).json({ message: 'Server ok', uptime: process.uptime() });
};
