import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { type PayloadType } from './auth.types';

config();

const SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (token: string): PayloadType => {
  try {
    const decoded = jwt.verify(token, SECRET) as PayloadType;
    return decoded;
  } catch (error: any) {
    throw new Error(error.message)
  }
};

export const signToken = (payload: PayloadType): string => {
  try {
    const token = jwt.sign(payload, SECRET, {
      expiresIn: `${1000 * 60 * 60 * 24}`
    });

    return token;
  } catch (error: any) {
    throw new Error(error.message)
  }
};
