import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { type PayloadType } from './auth.types';
config();

const SECRET = process.env.JWT_SECRET as string;

// export const verifyToken = (token: string): any => {
//   const decoded = jwt.verify(token, SECRET) as PayloadType;

//   return decoded;
// };

export const signToken = (payload: PayloadType): string => {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: `${1000 * 60 * 60 * 24}`
  });

  return token;
};

// export async function getRoleById (id: string) {
//   const role = await prisma.roles.findUnique({
//     where: {
//       id
//     }
//   });
//   return role;
// }
