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

export const getAllReviews = async (): Promise<ReviewDocument[]> => {
  try {
    const reviews = await ReviewModel.find()
    if (reviews === null) {
      throw new Error('Something went wrong when getting all reviews, please try again later')
    }
    return reviews as ReviewDocument[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const updateReview = async (data: Review): Promise<ReviewDocument> => {
  try {
    const { _id } = data
    const review = await ReviewModel.findOneAndUpdate({ _id }, data, { new: true }) as ReviewDocument
    return review
  } catch (error: any) {
    throw new Error(error.message)
  }
}
