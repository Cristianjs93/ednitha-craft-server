import ReviewModel from '../review/review.model'
import UserModel from '../user/user.model'

export const productReviewsRemove = async (productId: string): Promise<void> => {
  try {
    const productReviews = await ReviewModel.find({ product: productId }).select('_id')

    if (productReviews.length !== 0) {
      await UserModel.updateMany(
        { reviews: { $in: productReviews } },
        { $pull: { reviews: { $in: productReviews } } }
      )

      await ReviewModel.deleteMany({ product: productId })
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
