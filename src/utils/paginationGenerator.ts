import { type ProductDocument } from '../api/product/product.types';
import { type PaginationResult } from './middlewares.types';

export const paginationGenerator = (
  data: ProductDocument[],
  page: number,
  limit: number
): PaginationResult => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {} as unknown as PaginationResult;

    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex >= 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }

    results.length = data.length;

    results.result = data.slice(startIndex, endIndex);

    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
