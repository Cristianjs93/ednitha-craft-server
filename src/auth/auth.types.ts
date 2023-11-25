import { type Request } from 'express';
import { type UserDocument } from '../api/user/user.types';

export interface PayloadType {
  _id: string
  email: string
  iat?: number
  exp?: number
}

export interface AuthRequestUser extends Request {
  user?: UserDocument
}
