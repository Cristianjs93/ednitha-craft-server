import { type validatorError } from '../user/user.types'

export const errorHandler = (error: any): string => {
  const values: validatorError[] = Object.values(error.errors)
  const message = values.map((value) => value.message)
  return message.join('\n')
}
