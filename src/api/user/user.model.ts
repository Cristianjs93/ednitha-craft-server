/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Document, Schema, model, models } from 'mongoose';
import { type User } from './user.types';
import { nameRegex, emailRegex } from '../utils/regex';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      match: [nameRegex, 'Name is not valid'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [15, 'Name must be at most 15 characters long']
    },
    email: {
      type: String,
      match: [emailRegex, 'Email is not valid'],
      validate: [{
        validator: async (value: string) => {
          try {
            const user = await models.user.findOne({ email: value }) as User ?? null
            return !user
          } catch (error) {
            return false
          }
        },
        message: 'Email already exists'
      }]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model('user', userSchema)

export type UserDocument = User & Document;

export default UserModel
