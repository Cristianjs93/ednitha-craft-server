// import { type ProductDocument } from '../api/product/product.types';
// // import { type RestaurantsFiltered } from '../api/restaurants/restaurants.types';

// export const filteredData = (data: ProductDocument[], filter: string) => {
//   if (filter === 'all') {
//     return data;
//   } else if (filter === 'popular') {
//     const popularRestaurants = data.filter(
//       (product) => product.data.rating >= 4
//     );

//     return popularRestaurants;
//   } else if (filter == 'trend') {
//     const trendingRestaurants = data.filter(
//       (restaurant: RestaurantsFiltered) => restaurant.trending
//     );

//     return trendingRestaurants;
//   } else if (filter == 'latest') {
//     const currentTime: Date = new Date();
//     const oneWeekAgo = new Date(
//       currentTime.getTime() - 1000 * 60 * 60 * 24 * 7
//     );

//     const recentRestaurants = data.filter((restaurant: RestaurantsFiltered) => {
//       const createdAtTime = new Date(restaurant.createdAt);
//       return createdAtTime > oneWeekAgo;
//     });
//     return recentRestaurants;
//   }
// };

// export const filteredByObject = (
//   data: RestaurantsFiltered[],
//   cuisine: string,
//   star: string,
//   cost: string,
//   delivery: string
// ) => {
//   let result = [];
//   let filteredByCuisine = [];
//   let filteredByStar = [];
//   let filteredByCost = [];
//   let filteredByDelivery = [];

//   cuisine
//     ? (filteredByCuisine = data.filter(
//         (item: RestaurantsFiltered) => item.cuisines.includes(cuisine) && item
//       ))
//     : (filteredByCuisine = data);

//   star
//     ? (filteredByStar = data.filter(
//         (item: RestaurantsFiltered) => item.rating >= parseInt(star) && item
//       ))
//     : (filteredByStar = data);

//   cost
//     ? (filteredByCost = data.filter(
//         (item: RestaurantsFiltered) => item.cost_two <= parseInt(cost) && item
//       ))
//     : (filteredByCost = data);

//   delivery
//     ? (filteredByDelivery = data.filter(
//         (item: RestaurantsFiltered) =>
//           item.delivery_time <= parseInt(delivery) && item
//       ))
//     : (filteredByDelivery = data);

//   result = commonRestaurants(
//     filteredByCuisine,
//     filteredByStar,
//     filteredByCost,
//     filteredByDelivery
//   );

//   return result;
// };

// const commonRestaurants = (
//   array1: RestaurantsFiltered[],
//   array2: RestaurantsFiltered[],
//   array3: RestaurantsFiltered[],
//   array4: RestaurantsFiltered[]
// ) => {
//   return array1.filter((restaurant1) => {
//     const presentInArray2 = array2.some(
//       (restaurant2) => restaurant2.id === restaurant1.id
//     );
//     const presentInArray3 = array3.some(
//       (restaurant3) => restaurant3.id === restaurant1.id
//     );
//     const presentInArray4 = array4.some(
//       (restaurant4) => restaurant4.id === restaurant1.id
//     );

//     return presentInArray2 && presentInArray3 && presentInArray4;
//   });
// };
