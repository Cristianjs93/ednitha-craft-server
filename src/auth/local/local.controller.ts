import { type Request, type Response } from 'express';
import { comparePassword } from '../utils/bcrypt';
import UserModel from '../../api/user/user.model';
import { type UserDocument } from '../../api/user/user.types';
import { createAuthResponse } from './local.services';

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }) as UserDocument;

    if (user === null) {
      throw new Error('User is not registered');
    }

    if (!user.active) {
      throw new Error('Verify your account first');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const { token, profile } = createAuthResponse(user);

    res.status(200).json({ message: 'successful login', token, data: profile });
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong when log in', error: error.message });
  }
};

export const verifyAccountHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resetToken } = req.params;
    const updatedUser = {
      resetToken: null,
      active: true
    };

    const user = await UserModel.findOneAndUpdate({ resetToken }, updatedUser, { new: true }) as UserDocument;

    if (user === null) {
      throw new Error('Invalid token');
    }

    const { token, profile } = createAuthResponse(user);

    res.status(200).json({ message: 'Account successfully activated', token, data: profile });
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong verifying your account', error: error.message });
  }
};
