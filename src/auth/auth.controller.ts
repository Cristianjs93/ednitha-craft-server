import { type Response, type NextFunction } from 'express';
import { getUserByEmail } from '../api/user/user.services';
import { type AuthRequestUser } from './auth.types';
import { verifyToken } from './auth.services';
import { type UserDocument } from '../api/user/user.types';

export const isAuthenticated = async (
  req: AuthRequestUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers?.authorization?.split(' ')[1] as string;

    if (token === undefined) {
      throw new Error('Unauthorized! You have to log in first');
    }

    const decoded = verifyToken(token);

    if (decoded === null) {
      throw new Error('Token not decoded');
    }

    const user = await getUserByEmail(decoded.email);

    req.user = user;

    next();
  } catch (error: any) {
    // res.status(400).json({ message: 'Something went wrong, please try again', error: error.message });
    throw new Error(error.message);
  }
};

export function hasRole (rolesAllowed: string[]) {
  return async (req: AuthRequestUser, res: Response, next: NextFunction) => {
    try {
      const { role } = req.user as UserDocument;
      const hasPermission = rolesAllowed.includes(role);

      if (!hasPermission) {
        throw new Error('Invalid credentials');
      }

      next();
    } catch (error: any) {
      // res.status(400).json({ message: 'Something went wrong, please try again', error: error.message });
      throw new Error(error.message);
    }
  };
}
