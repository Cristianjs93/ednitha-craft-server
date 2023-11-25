import { type Types, type Document } from 'mongoose';

export interface Review {
  _id?: Types.ObjectId
  rating: number
  title: string
  comments: string
  product: Types.ObjectId
  user: Types.ObjectId
}

export interface ReviewDocument extends Document {
  rating: number
  title: string
  comments: string
  product: Types.ObjectId
  user: Types.ObjectId
}
