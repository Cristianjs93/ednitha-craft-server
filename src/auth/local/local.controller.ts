import { type Request, type Response } from 'express';
import { comparePassword } from '../utils/bcrypt';
import { signToken } from '../auth.services';
import UserModel from '../../api/user/user.model';
import { type PayloadType } from '../auth.types';
import { type UserDocument } from '../../api/user/user.types';

export async function loginHandler (req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }) as UserDocument

    if (user === null) {
      res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload: PayloadType = {
      id: user._id as unknown as string,
      email: user.email
    }

    const token = signToken(payload);

    const newUser = {
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      role: 'USER'
    };

    res.status(200).json({ token, newUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
