"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationGenerator = void 0;
const paginationGenerator = (data, page, limit) => {
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.paginationGenerator = paginationGenerator;
