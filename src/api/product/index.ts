import { Router } from 'express'
import {
  createProductHandler,
  getAllProductsHandler,
  updateProductHandler,
  deleteProductHandler
} from './product.controller'
import { hasRole, isAuthenticated } from '../../auth/auth.controller'

const router = Router()
router.post('/create', isAuthenticated, hasRole(['ADMIN']), createProductHandler)
router.get('/', getAllProductsHandler)
router.put('/update', isAuthenticated, hasRole(['ADMIN']), updateProductHandler)
router.delete('/delete', isAuthenticated, hasRole(['ADMIN']), deleteProductHandler)

export default router
