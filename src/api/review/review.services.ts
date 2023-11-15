import ReviewModel from './review.model'
import { type Review, type ReviewDocument } from './review.types'
import { validatorErrorHandler } from '../utils/errorHandler'

export const createReview = async (input: Review): Promise<ReviewDocument> => {
  try {
    const newReview = { ...input }
    const review = await ReviewModel.create(newReview) as ReviewDocument
    return review
  } catch (error: any) {
    const message = validatorErrorHandler(error)
    throw new Error(message)
  }
}
