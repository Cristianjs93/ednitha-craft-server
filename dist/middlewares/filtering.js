"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtering = void 0;
const product_services_1 = require("../api/product/product.services");
const filters_1 = require("../utils/filters");
const filtering = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, price, rating, category } = req.query;
        const allProducts = yield (0, product_services_1.getallProducts)();
        let filteredProducts = (0, filters_1.filteredData)(allProducts, filter);
        if ((price !== undefined) || (rating !== undefined) || (category !== undefined)) {
            filteredProducts = (0, filters_1.filteredByObject)(filteredProducts, price, rating, category);
        }
        res.filteredResults = filteredProducts;
        next();
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.filtering = filtering;
