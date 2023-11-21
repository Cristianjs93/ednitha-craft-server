import { type Response, type NextFunction } from 'express';
import { getUserByEmail } from '../api/user/user.services';
import { type AuthRequestUser } from './auth.types';
// import { type UserDocument } from '../api/user/user.types';
import {
  verifyToken
  // getRoleById
} from './auth.services';

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
    res.status(400).json({ message: 'Something went wrong, please try again', error: error.message });
  }
};

// export function hasRole (rolesAllowed: string[]) {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     const { roleId } = req.users;
//     const role = await getRoleById(roleId);
//     const hasPermission = rolesAllowed.includes(role?.name as string);

//     if (!hasPermission) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     next();
//   };
// }
