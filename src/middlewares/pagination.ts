import { type Request, type NextFunction } from 'express';
import { type ResponsePaginator, type PaginationQueryParams } from '../utils/pagination.types';
import { filteredData, filteredByObject } from '../utils/filters';
import { paginationGenerator } from '../utils/paginationGenerator';
import { getallProducts } from '../api/product/product.services';

export const pagination = () => {
  return async (req: Request, res: ResponsePaginator, next: NextFunction) => {
    const { page, limit, filter, price, rating, category } =
      req.query as unknown as PaginationQueryParams;

    const pageData = parseInt(page);

    const limitData = parseInt(limit);

    const allProducts = await getallProducts();

    const filteredProducts = filteredData(allProducts, filter);

    if ((price.length > 0) || (rating.length > 0) || (category.length > 0)) {
      const filteredProductsByObject = filteredByObject(
        filteredProducts,
        price,
        rating,
        category
      );

      const results = paginationGenerator(
        filteredProductsByObject,
        pageData,
        limitData,
        allProducts
      );

      res.paginatedResults = results;
      next();
    } else {
      if (filteredProducts !== undefined) {
        const results = paginationGenerator(
          filteredProducts,
          pageData,
          limitData,
          allProducts
        );

        res.paginatedResults = results;
        next();
      }
    }
  };
};
