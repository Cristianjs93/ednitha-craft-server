import { type ProductDocument } from '../api/product/product.types';
// import { type RestaurantsFiltered } from '../api/restaurants/restaurants.types';

export const filteredData = (data: ProductDocument[], filter: string): ProductDocument[] => {
  if (filter === 'all') {
    return data;
  } else if (filter === 'popular') {
    const popularProducts = data.filter(
      (product) => product.rating >= 4
    );
    return popularProducts;
  } else if (filter === 'latest') {
    const currentTime: Date = new Date();
    const oneWeekAgo = new Date(
      currentTime.getTime() - 1000 * 60 * 60 * 24 * 7
    );
    const recentProducts = data.filter((product) => {
      const createdAtTime = new Date(product.createdAt);
      return createdAtTime > oneWeekAgo;
    });
    return recentProducts;
  }
  return data;
};

export const filteredByObject = (
  data: ProductDocument[],
  price: string,
  rating: string,
  category: string
): ProductDocument[] => {
  let result = [];
  let filteredByPrice = [];
  let filteredByRating = [];
  let filteredByCategory = [];

  (price !== undefined)
    ? (filteredByPrice = data.filter(
        (product) => product.price <= parseInt(price) && product
      ))
    : (filteredByPrice = data);

  (rating !== undefined)
    ? (filteredByRating = data.filter(
        (product) => product.rating >= parseInt(rating) && product
      ))
    : (filteredByRating = data);

  (category !== undefined)
    ? (filteredByCategory = data.filter(
        (product) => product.category === category && product
      ))
    : (filteredByCategory = data);

  result = commonRestaurants(
    filteredByPrice,
    filteredByRating,
    filteredByCategory
  );

  return result;
};

const commonRestaurants = (
  array1: ProductDocument[],
  array2: ProductDocument[],
  array3: ProductDocument[]
): ProductDocument[] => {
  return array1.filter((restaurant1) => {
    const presentInArray2 = array2.some(
      (restaurant2) => restaurant2.id === restaurant1.id
    );
    const presentInArray3 = array3.some(
      (restaurant3) => restaurant3.id === restaurant1.id
    );

    return presentInArray2 && presentInArray3;
  });
};
