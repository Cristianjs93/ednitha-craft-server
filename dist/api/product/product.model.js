"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [4, 'Product name must be at least 4 characters long']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    }
}, {
    timestamps: true,
    versionKey: false
});
const ProductModel = (0, mongoose_1.model)('product', exports.ProductSchema);
exports.default = ProductModel;
