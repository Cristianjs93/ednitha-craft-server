import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (password: string, factor?: number): Promise<string> => {
  const salt = await bcrypt.genSalt(factor);
  const data = await bcrypt.hash(password, salt);
  return data;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

export const createHashToken = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};
