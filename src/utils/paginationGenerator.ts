// import { RestaurantsFiltered } from '../api/restaurants/restaurants.types';
import { type ProductDocument } from '../api/product/product.types';
import { type PaginationResult } from './pagination.types';

export const paginationGenerator = (
  data: ProductDocument[],
  page: number,
  limit: number,
  allData: ProductDocument[]
): PaginationResult => {
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

  results.data = data.slice(startIndex, endIndex);

  results.allProducts = allData;

  return results;
};
