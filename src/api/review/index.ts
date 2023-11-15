import { Router } from 'express'
import {
  createReviewHandler,
  getAllReviewsHandler
} from './review.controller'

const router = Router()

router.post('/create', createReviewHandler)
router.get('/', getAllReviewsHandler)

export default router
