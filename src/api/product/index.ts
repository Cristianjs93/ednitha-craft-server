import { Router } from 'express'
import {
  createProductHandler,
  getallProductsHandler
} from './product.controller'

const router = Router()
router.post('/create', createProductHandler)
router.get('/', getallProductsHandler)

export default router
