import { type Types, type Document } from 'mongoose';

export interface Product {
  _id?: Types.ObjectId
  image: string
  name: string
  description: string
  price: number
  category: string
  rating: number
  reviews: Types.ObjectId[]
}

export interface ProductDocument extends Document {
  image: string
  name: string
  description: string
  price: number
  rating: number
  category: string
  reviews: Types.ObjectId[]
  createdAt: string | number | Date
}
