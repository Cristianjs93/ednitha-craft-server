import ReviewModel from './review.model';
import { type Review, type ReviewDocument } from './review.types';
import { validatorErrorHandler } from '../utils/errorHandler';

export const createReview = async (input: Review): Promise<ReviewDocument> => {
  try {
    const newReview = { ...input };
    const review = await (await ReviewModel.create(newReview)).populate({ path: 'user', select: 'email name avatar reviews -_id' });
    const populatedReview = await review.populate({ path: 'product', select: '-createdAt -updatedAt' });

    return populatedReview;
  } catch (error: any) {
    const message = validatorErrorHandler(error);
    throw new Error(message);
  }
};

export const getAllReviews = async (): Promise<ReviewDocument[]> => {
  try {
    const reviews = await ReviewModel.find()
      .populate({ path: 'product', select: '-createdAt -updatedAt' })
      .populate({ path: 'user', select: 'email name avatar reviews -_id' }) as ReviewDocument[];

    if (reviews === null) {
      throw new Error('Something went wrong when getting all reviews, please try again later');
    }

    return reviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateReview = async (data: Review): Promise<ReviewDocument> => {
  try {
    const { _id } = data;
    const review = await ReviewModel.findOneAndUpdate({ _id }, data, { new: true })
      .populate({ path: 'product', select: '-createdAt -updatedAt' })
      .populate({ path: 'user', select: 'email name avatar reviews -_id' }) as ReviewDocument;

    if (review === null) {
      throw new Error('Review not found');
    }

    return review;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteReview = async (_id: string): Promise<ReviewDocument> => {
  try {
    const review = await ReviewModel.findOneAndDelete({ _id })
      .populate({ path: 'product', select: '-createdAt -updatedAt' })
      .populate({ path: 'user', select: 'email name avatar reviews -_id' }) as ReviewDocument;

    if (review === null) {
      throw new Error('Review not found');
    }
    return review;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
