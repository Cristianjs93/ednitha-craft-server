"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredByObject = exports.filteredData = void 0;
const filteredData = (data, filter) => {
    try {
        if (filter === 'all') {
            return data;
        }
        else if (filter === 'popular') {
            const popularProducts = data.filter((product) => product.rating >= 4);
            return popularProducts;
        }
        else if (filter === 'latest') {
            const currentTime = new Date();
            const oneWeekAgo = new Date(currentTime.getTime() - 1000 * 60 * 60 * 24 * 7);
            const recentProducts = data.filter((product) => {
                const createdAtTime = new Date(product.createdAt);
                return createdAtTime > oneWeekAgo;
            });
            return recentProducts;
        }
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.filteredData = filteredData;
const filteredByObject = (data, price, rating, category) => {
    let result = [];
    let filteredByPrice = [];
    let filteredByRating = [];
    let filteredByCategory = [];
    (price !== undefined)
        ? (filteredByPrice = data.filter((product) => product.price <= parseInt(price) && product))
        : (filteredByPrice = data);
    (rating !== undefined)
        ? (filteredByRating = data.filter((product) => product.rating >= parseInt(rating) && product))
        : (filteredByRating = data);
    (category !== undefined)
        ? (filteredByCategory = data.filter((product) => product.category === category && product))
        : (filteredByCategory = data);
    result = commonRestaurants(filteredByPrice, filteredByRating, filteredByCategory);
    return result;
};
exports.filteredByObject = filteredByObject;
const commonRestaurants = (array1, array2, array3) => {
    return array1.filter((restaurant1) => {
        const presentInArray2 = array2.some((restaurant2) => restaurant2.id === restaurant1.id);
        const presentInArray3 = array3.some((restaurant3) => restaurant3.id === restaurant1.id);
        return presentInArray2 && presentInArray3;
    });
};
