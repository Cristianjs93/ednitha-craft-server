// import { type Request, type NextFunction } from 'express';
// import { type ResponsePaginator, type PaginationQueryParams } from '../utils/pagination.types';
// import { getAllRestaurants } from '../api/restaurants/restaurants.services';
// import { filteredData, filteredByObject } from '../utils/filters';
// import { paginationGenerator } from '../utils/paginationGenerator';
// import { type RestaurantsFiltered } from '../api/restaurants/restaurants.types';

// export const pagination = () => {
//   return async (req: Request, res: ResponsePaginator, next: NextFunction) => {
//     const { filter, page, limit, cuisine, star, cost, delivery } =
//       req.query as PaginationQueryParams;

//     const pageData = parseInt(page);

//     const limitData = parseInt(limit);

//     const allRestaurants = await getAllRestaurants();

//     const filteredRestaurants = filteredData(allRestaurants, filter);

//     if (cuisine || star || cost || delivery) {
//       const filteredRestaurantsByObject = filteredByObject(
//         filteredRestaurants as RestaurantsFiltered[],
//         cuisine,
//         star,
//         cost,
//         delivery
//       );

//       const results = paginationGenerator(
//         filteredRestaurantsByObject,
//         pageData,
//         limitData,
//         allRestaurants
//       );

//       res.paginatedResults = results;
//       next();
//     } else {
//       if (filteredRestaurants) {
//         const results = paginationGenerator(
//           filteredRestaurants,
//           pageData,
//           limitData,
//           allRestaurants
//         );

//         res.paginatedResults = results;
//         next();
//       }
//     }
//   };
// };
