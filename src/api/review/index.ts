import { Router } from 'express'
import {
  createReviewHandler,
  getAllReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler
} from './review.controller'

const router = Router()

router.post('/create', createReviewHandler)
router.get('/', getAllReviewsHandler)
router.put('/update', updateReviewHandler)
router.delete('/delete', deleteReviewHandler)

export default router
