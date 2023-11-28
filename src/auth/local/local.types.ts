import { type UserDocument } from '../../api/user/user.types';

export interface AuthResponse {
  token: string
  profile: UserDocument
}
