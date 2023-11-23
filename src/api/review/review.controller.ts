import { type Request, type Response } from 'express'
import {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview
} from './review.services'
import { reviewValidator, reviewPopulate, reviewRemove } from '../utils/reviewUtils'

export const createReviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user: userEmail, product: productId } = req.body

    const validator = await reviewValidator(userEmail, productId)

    const { user, user: { _id }, product } = validator

    const data = { ...req.body, user: _id }

    const review = await createReview(data)

    if (typeof review._id === 'object') {
      await reviewPopulate(user, product, review)
    }

    res.status(201).json({ message: 'Review created successfully', data: review })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating review', error: error.message })
  }
}

export const getAllReviewsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await getAllReviews()
    res.status(200).json({ message: 'Reviews listed', data: reviews })
  } catch (error: any) {
    res.status(400).json({ message: 'Error listing reviews', error: error.message })
  }
}

export const updateReviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const updatedReview = await updateReview(data)
    res.status(200).json({ message: 'Review updated successfully', data: updatedReview })
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating review', error: error.message })
  }
}

export const deleteReviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, product, reviewId } = req.body

    await reviewRemove(user, product, reviewId)

    const review = await deleteReview(reviewId)

    res.status(200).json({ message: 'Review deleted successfully', data: review })
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting review', error: error.message })
  }
}
