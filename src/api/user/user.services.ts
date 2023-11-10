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
    return users
  } catch (error: any) {
    return error
  }
}

export const getUserByEmail = async (email: string): Promise<UserDocument> => {
  try {
    const user = await UserModel.findOne({ email }) as UserDocument
    return user
  } catch (error: any) {
    return error
  }
}
