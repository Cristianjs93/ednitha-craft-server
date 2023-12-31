import UserModel from './user.model';
import { type User, type UserDocument } from './user.types';
import { validatorErrorHandler } from '../utils/errorHandler';
import { createHashToken, hashPassword } from '../../auth/utils/bcrypt';

export const createUser = async (input: User): Promise<UserDocument> => {
  try {
    const hashedPassword = await hashPassword(input.password);
    const hashToken = createHashToken(input.email);

    const newUser = {
      ...input,
      resetToken: hashToken,
      password: hashedPassword
    };

    const user = await UserModel.create(newUser) as UserDocument;

    const { _id, password, ...userWithoutId } = user.toObject();
    return userWithoutId;
  } catch (error: any) {
    const message = validatorErrorHandler(error);
    throw new Error(message);
  }
};

export const getAllUsers = async (): Promise<UserDocument[]> => {
  try {
    const users = await UserModel.find().select('-_id -password  -resetToken').populate('reviews');

    if (users === null) {
      throw new Error('Something went wrong when getting all users, please try again later');
    }
    return users as UserDocument[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email: string): Promise<UserDocument> => {
  try {
    const user = await UserModel.findOne({ email }).select('-_id -password -resetToken').populate('name', 'email') as UserDocument;
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async (data: User): Promise<UserDocument> => {
  try {
    const { email } = data;
    const user = await UserModel.findOneAndUpdate({ email }, data, { new: true }).select('-_id -password -resetToken') as UserDocument;
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (email: string): Promise<UserDocument> => {
  try {
    const user = await UserModel.findOneAndDelete({ email }).select('-_id -password -resetToken') as UserDocument;
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
