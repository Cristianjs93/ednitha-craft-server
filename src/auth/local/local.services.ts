import { type UserDocument } from '../../api/user/user.types';
import { signToken } from '../auth.services';
import { type PayloadType } from '../auth.types';
import { type AuthResponse } from './local.types';

export const createAuthResponse = (input: UserDocument): AuthResponse => {
  const payload: PayloadType = {
    _id: input._id as unknown as string,
    email: input.email
  };

  const token = signToken(payload);

  const { _id, resetToken, password, ...profile } = input.toObject();

  return { token, profile };
};
