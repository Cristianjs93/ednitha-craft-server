import { type Request, type Response } from 'express';
import { comparePassword } from '../utils/bcrypt';
import { signToken } from '../auth.services';
import UserModel from '../../api/user/user.model';
import { type PayloadType } from '../auth.types';
import { type UserDocument } from '../../api/user/user.types';

export async function loginHandler (req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }) as UserDocument;

    if (user === null) {
      throw new Error('User is not registered');
    }

    const isMatch = await comparePassword(password, user.password);

    console.log('LOGIN CONTROLLER USER', user);

    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const payload: PayloadType = {
      _id: user._id as unknown as string,
      email: user.email
    };

    console.log('PAYLOAD TYPE', payload);

    const token = signToken(payload);

    console.log('LOGIN CONTROLLER TOKEN', token);

    const newUser = {
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      role: 'USER'
    };

    console.log('LOGIN CONTROLLER NEWUSER', newUser);

    res.status(200).json({ token, newUser });
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong when log in, please try again', error: error.message });
  }
}
