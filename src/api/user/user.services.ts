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
