import { Schema, model, models } from 'mongoose';
import { type User } from './user.types';
import { nameRegex, emailRegex, passwordRegex } from '../../assets/data/regex';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      match: [nameRegex, 'Name is not valid'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [15, 'Name must be at most 15 characters long']
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
      match: [nameRegex, 'Lastname is not valid'],
      minlength: [3, 'Lastname must be at least 3 characters long'],
      maxlength: [20, 'Lastname must be at most 15 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [emailRegex, 'Email is not valid'],
      validate: [{
        validator: async (value: string) => {
          try {
            const user = await models.user.findOne({ email: value }) as User ?? null;
            return user === null;
          } catch (error) {
            return false;
          }
        },
        message: 'Email already exists'
      }]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: [passwordRegex, 'Password is not valid']
    },
    avatar: {
      type: String,
      required: [true, 'Avatar is required']
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: { values: ['ADMIN', 'USER'], message: '{VALUE} role is not supported' }
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: 'review' }],
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = model('user', userSchema);

export default UserModel;
