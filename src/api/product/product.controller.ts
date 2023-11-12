import { type Request, type Response } from 'express'
import {
  createProduct,
  getallProducts,
  updateProduct,
  deleteProduct
} from './product.services'

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const product = await createProduct(data)
    res.status(201).json({ message: 'Product created successfully', data: product })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating product', error: error.message })
  }
}

export const getAllProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getallProducts()
    res.status(200).json({ message: 'Products listed', data: products })
  } catch (error: any) {
    res.status(400).json({ message: 'Error listing products', error: error.message })
  }
}

export const updateProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const updatedProduct = await updateProduct(data)
    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct })
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating product', error: error.message })
  }
}

export const deleteProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.body
    const product = await deleteProduct(_id)
    res.status(200).json({ message: 'Product deleted successfully', data: product })
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting product', error: error.message })
  }
}
