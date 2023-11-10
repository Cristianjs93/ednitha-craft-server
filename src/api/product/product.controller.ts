import { type Request, type Response } from 'express'
import { createProduct, getallProducts } from './product.services'

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const product = await createProduct(data)
    res.status(201).json({ message: 'Product created successfully', data: product })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating product', error: error.message })
  }
}

export const getallProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getallProducts()
    res.status(200).json({ message: 'Products listed', data: products })
  } catch (error: any) {
    res.status(400).json({ message: 'Error listing products', error: error.message })
  }
}
