import { type Request, type NextFunction } from 'express';
import { type ResponseFiltering } from '../utils/middlewares.types';
import { getallProducts } from '../api/product/product.services';
import { filteredData, filteredByObject } from '../utils/filters';

export const filtering = async (req: Request, res: ResponseFiltering, next: NextFunction): Promise<void> => {
  try {
    const { filter, price, rating, category } = req.query;

    const allProducts = await getallProducts();
    let filteredProducts = filteredData(allProducts, filter as string);

    if ((price !== undefined) || (rating !== undefined) || (category !== undefined)) {
      filteredProducts = filteredByObject(filteredProducts, price as string, rating as string, category as string);
    }

    res.filteredResults = filteredProducts;
    next();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
