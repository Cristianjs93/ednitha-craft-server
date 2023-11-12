import { type Types } from 'mongoose'

export interface Product {
  _id?: Types.ObjectId
  image: string
  name: string
  description: string
  price: number
}

export interface ProductDocument {
  _id: Types.ObjectId
  image: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}
