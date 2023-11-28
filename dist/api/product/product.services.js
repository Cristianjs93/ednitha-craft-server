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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getallProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const errorHandler_1 = require("../utils/errorHandler");
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = Object.assign({}, input);
        const product = yield product_model_1.default.create(newProduct);
        return product;
    }
    catch (error) {
        const message = (0, errorHandler_1.validatorErrorHandler)(error);
        throw new Error(message);
    }
});
exports.createProduct = createProduct;
const getallProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find().populate({ path: 'reviews', populate: { path: 'user', select: 'name email -_id' } });
        if (products === null) {
            throw new Error('Something went wrong when getting all products, please try again later');
        }
        return products;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getallProducts = getallProducts;
const updateProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = data;
        const product = yield product_model_1.default.findOneAndUpdate({ _id }, data, { new: true });
        if (product === null) {
            throw new Error('Product not found');
        }
        return product;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findOneAndDelete({ _id });
        if (product === null) {
            throw new Error('Product not found');
        }
        return product;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteProduct = deleteProduct;
