import { type Request, type NextFunction } from 'express';
import {
  type ResponsePaginator
  //  type PaginationQueryParams
} from '../utils/middlewares.types';
import { paginationGenerator } from '../utils/paginationGenerator';
import { type ProductDocument } from '../api/product/product.types';

export const pagination = () => {
  return async (req: Request, res: ResponsePaginator, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      const { filteredResults } = res;

      const pageData = parseInt(page as string);
      const limitData = parseInt(limit as string);

      const results = paginationGenerator(
        filteredResults as ProductDocument[],
        pageData,
        limitData
      );

      res.paginatedResults = results;
      next();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
};
