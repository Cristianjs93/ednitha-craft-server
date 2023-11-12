import ProductModel from './product.model'
import { type Product, type ProductDocument } from './product.types'
import { validatorErrorHandler } from '../utils/errorHandler'

export const createProduct = async (input: Product): Promise<ProductDocument> => {
  try {
    const newProduct = { ...input }
    const product = await ProductModel.create(newProduct) as ProductDocument
    return product
  } catch (error: any) {
    const message = validatorErrorHandler(error)
    throw new Error(message)
  }
}

export const getallProducts = async (): Promise<ProductDocument[]> => {
  try {
    const products = await ProductModel.find()
    if (products === null) {
      throw new Error('Something went wrong when getting all products, please try again later')
    }
    return products as ProductDocument[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const updateProduct = async (data: Product): Promise<ProductDocument> => {
  try {
    const { _id } = data
    const product = await ProductModel.findOneAndUpdate({ _id }, data, { new: true }) as ProductDocument
    return product
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const deleteProduct = async (_id: string): Promise<ProductDocument> => {
  try {
    const product = await ProductModel.findOneAndDelete({ _id }) as ProductDocument
    if (product === null) {
      throw new Error('Product not found')
    }
    return product
  } catch (error: any) {
    throw new Error(error.message)
  }
}
