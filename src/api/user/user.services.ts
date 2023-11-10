import UserModel from './user.model'
import { type User } from './user.types'
import { validatorErrorHandler } from '../utils/errorHandler'
import { hashPassword } from '../../auth/utils/bcrypt'

export const createUser = async (input: User): Promise<any> => {
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

export const getAllUsers = async (): Promise<any> => {
  try {
    const users = await UserModel.find()
    return users
  } catch (error: unknown) {
    return error
  }
}
