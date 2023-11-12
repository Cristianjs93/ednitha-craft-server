import { Router } from 'express'
import {
  createProductHandler,
  getAllProductsHandler,
  updateProductHandler,
  deleteProductHandler
} from './product.controller'

const router = Router()
router.post('/create', createProductHandler)
router.get('/', getAllProductsHandler)
router.put('/update', updateProductHandler)
router.delete('/delete', deleteProductHandler)

export default router
