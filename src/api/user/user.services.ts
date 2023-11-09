import UserModel from './user.model'
import { type User } from './user.types'
import { validatorErrorHandler } from '../utils/errorHandler'

export const createUser = async (data: User): Promise<any> => {
  try {
    const user = await UserModel.create(data)
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
    // const message = validatorErrorHandler(error)
    // throw new Error(message)
    return error
  }
}
