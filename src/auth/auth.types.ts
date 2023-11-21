import { type Request } from 'express';
import { type User } from '../api/user/user.types';
import { type Product } from '../api/product/product.types';

export interface PayloadType {
  id: string
  email: string
  iat?: number
  exp?: number
}

export interface AuthRequestUser extends Request {
  user?: User
}
export interface AuthRequestProduct extends Request {
  product?: Product
}
