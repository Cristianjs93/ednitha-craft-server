import { type Request, type Response } from 'express'
import { createReview } from './review.services'

export const createReviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const review = await createReview(data)
    res.status(201).json({ message: 'Review created successfully', data: review })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating review', error: error.message })
  }
}
