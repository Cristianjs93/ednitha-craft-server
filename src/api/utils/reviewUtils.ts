import UserModel from '../user/user.model';
import ProductModel from '../product/product.model';
import ReviewModel from '../review/review.model';
import { type UserDocument } from '../user/user.types';
import { type ProductDocument } from '../product/product.types';
import { type ReviewDocument } from '../review/review.types';
import { type Types } from 'mongoose';

interface validatorReturn {
  user: UserDocument
  product: ProductDocument
}

export const reviewValidator = async (userEmail: string, productId: string): Promise<validatorReturn> => {
  try {
    const user = await UserModel.findOne({ email: userEmail }) as UserDocument;
    if (user === null) {
      throw new Error('User for review not found');
    }

    const product = await ProductModel.findById(productId) as ProductDocument;
    if (product === null) {
      throw new Error('Product for review not found');
    }

    const duplicateReview = await ReviewModel.findOne({ user: user._id, product: productId });
    if (duplicateReview !== null) {
      throw new Error('Only one review per user is allowed');
    }

    return { user, product };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const reviewPopulate = async (user: UserDocument, product: ProductDocument, review: ReviewDocument): Promise<void> => {
  try {
    user.reviews?.unshift(review._id);
    await user.save({ validateBeforeSave: false });

    product.reviews?.unshift(review._id);
    await product.save({ validateBeforeSave: false });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const reviewRemove = async (userEmail: string, productId: string, reviewId: Types.ObjectId): Promise<void> => {
  try {
    const user = await UserModel.findOneAndUpdate({ email: userEmail }, {
      $pull: {
        reviews: reviewId
      }
    });
    if (user === null) {
      throw new Error('User for review not found');
    }

    const product = await ProductModel.findByIdAndUpdate(productId, {
      $pull: {
        reviews: reviewId
      }
    });
    if (product === null) {
      throw new Error('Product for review not found');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
