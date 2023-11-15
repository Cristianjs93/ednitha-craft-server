import { Schema, model } from 'mongoose'

export const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [4, 'Review title must be at least 4 characters long']
    },
    comments: {
      type: String,
      required: [true, 'Comments are required'],
      minlength: [4, 'Comments must be at least 4 characters long']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ReviewModel = model('review', ReviewSchema)

export default ReviewModel
