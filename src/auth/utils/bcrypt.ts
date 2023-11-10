import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, factor?: number): Promise<string> => {
  const salt = await bcrypt.genSalt(factor);
  const data = await bcrypt.hash(password, salt);
  return data;
};
