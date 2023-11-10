import UserModel from './user.model'
import { type User, type UserDocument } from './user.types'
import { validatorErrorHandler } from '../utils/errorHandler'
import { hashPassword } from '../../auth/utils/bcrypt'

export const createUser = async (input: User): Promise<UserDocument> => {
  try {
    const hashedPassword = await hashPassword(input.password);
    const newUser = {
      ...input,
      password: hashedPassword
    }
    const user = await UserModel.create(newUser);
    return user
  } catch (error: any) {
    const message = validatorErrorHandler(error)
    throw new Error(message)
  }
}

export const getAllUsers = async (): Promise<UserDocument[]> => {
  try {
    const users = await UserModel.find()
    if (users === null) {
      throw new Error('Something went wrong, please try again later')
    }
    return users
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getUserByEmail = async (email: string): Promise<UserDocument> => {
  try {
    const user = await UserModel.findOne({ email }) as UserDocument
    if (user === null) {
      throw new Error('User not found')
    }
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
