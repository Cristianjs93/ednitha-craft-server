import { Router } from 'express'
import {
  createReviewHandler,
  getAllReviewsHandler,
  updateReviewHandler
} from './review.controller'

const router = Router()

router.post('/create', createReviewHandler)
router.get('/', getAllReviewsHandler)
router.put('/update', updateReviewHandler)

export default router
