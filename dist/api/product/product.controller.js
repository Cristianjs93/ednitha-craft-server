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
exports.deleteProductHandler = exports.updateProductHandler = exports.getAllProductsHandler = exports.createProductHandler = void 0;
const product_services_1 = require("./product.services");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const product = yield (0, product_services_1.createProduct)(data);
        res.status(201).json({ message: 'Product created successfully', data: product });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
});
exports.createProductHandler = createProductHandler;
const getAllProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_services_1.getallProducts)();
        res.status(200).json({ message: 'Products listed', data: products });
    }
    catch (error) {
        res.status(400).json({ message: 'Error listing products', error: error.message });
    }
});
exports.getAllProductsHandler = getAllProductsHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedProduct = yield (0, product_services_1.updateProduct)(data);
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const product = yield (0, product_services_1.deleteProduct)(_id);
        res.status(200).json({ message: 'Product deleted successfully', data: product });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
});
exports.deleteProductHandler = deleteProductHandler;
