import { type Types, type Document } from 'mongoose'
export interface User {
  name: string
  email: string
  password: string
  avatar?: string
  role: string
  active: boolean
  reviews?: Types.ObjectId[]
}

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  avatar?: string
  role: string
  active: boolean
  reviews?: Types.ObjectId[]
}

export interface ValidatorError {
  errors: object
  _message: string
  name: string
  message: string
}
export interface ValidatorErrorField {
  name: string
  message: string
  properties: {
    message: string
    type: string
    regexp: object
    path: string
    value: string
  }
  kind: string
  path: string
  value: string
}
