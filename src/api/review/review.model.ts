import { Schema, model } from 'mongoose';

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
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: [true, 'Product for review is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User for review is required']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ReviewModel = model('review', ReviewSchema);

export default ReviewModel;
