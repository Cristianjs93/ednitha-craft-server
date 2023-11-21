// import { type Response, type NextFunction } from 'express';
// import { getUserByEmail } from '../api/user/user.services';
// import { type AuthRequestUser } from './auth.types';
// // import { type UserDocument } from '../api/user/user.types';
// import { verifyToken, getRoleById } from './auth.services';

// export const isAuthenticated = async (
//   req: AuthRequestUser,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   const token: any = req.headers?.authorization?.split(' ')[1];

//   if (token === null) {
//     return res
//       .status(401)
//       .json({ message: 'Unauthorized! You have to log in first.' });
//   }

//   const decoded = verifyToken(token);

//   if (decoded === null) {
//     return res.status(401).json({ message: 'Token not decoded' });
//   }

//   const user = (await getUserByEmail(decoded.email));

//   req.users = user;

//   next();
// };

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
