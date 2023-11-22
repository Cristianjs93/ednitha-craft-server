import { Router } from 'express'
import {
  createReviewHandler,
  getAllReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler
} from './review.controller'
import { hasRole, isAuthenticated } from '../../auth/auth.controller'

const router = Router()

router.post('/create', isAuthenticated, hasRole(['USER', 'ADMIN']), createReviewHandler)
router.get('/', getAllReviewsHandler)
router.put('/update', isAuthenticated, hasRole(['USER', 'ADMIN']), updateReviewHandler)
router.delete('/delete', isAuthenticated, hasRole(['USER', 'ADMIN']), deleteReviewHandler)

export default router
