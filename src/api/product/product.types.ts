import { type Types, type Document } from 'mongoose'

export interface Product {
  _id?: Types.ObjectId
  image: string
  name: string
  description: string
  price: number
  reviews?: Types.ObjectId[]
}

export interface ProductDocument extends Document {
  image: string
  name: string
  description: string
  price: number
  reviews?: Types.ObjectId[]
}
