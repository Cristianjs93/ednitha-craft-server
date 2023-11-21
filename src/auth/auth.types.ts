import { type Request } from 'express';
import { type UserDocument } from '../api/user/user.types';
import { type ProductDocument } from '../api/product/product.types';

export interface PayloadType {
  _id: string
  email: string
  iat?: number
  exp?: number
}

export interface AuthRequestUser extends Request {
  user?: UserDocument
}
export interface AuthRequestProduct extends Request {
  product?: ProductDocument
}
