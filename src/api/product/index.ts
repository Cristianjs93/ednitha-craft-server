import { Router } from 'express'
import {
  createProductHandler,
  getallProductsHandler,
  updateProductHandler
} from './product.controller'

const router = Router()
router.post('/create', createProductHandler)
router.get('/', getallProductsHandler)
router.put('/update', updateProductHandler)

export default router
