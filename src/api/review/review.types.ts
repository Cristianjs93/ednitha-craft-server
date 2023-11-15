import { type Types } from 'mongoose'

export interface Review {
  _id?: Types.ObjectId
  rating: number
  title: string
  comments: string
}

export interface ReviewDocument {
  _id: Types.ObjectId
  rating: number
  title: string
  comments: string
  createdAt: Date
  updatedAt: Date
}
