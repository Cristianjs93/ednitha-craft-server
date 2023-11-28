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
exports.ProductSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
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
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    reviews: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'review' }],
        required: false
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.ProductSchema.pre('save', function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const product = this;
        if (this.reviews !== undefined && this.reviews !== null) {
            const totalRating = yield this.populate('reviews').then(() => {
                var _a;
                return (_a = this.reviews) === null || _a === void 0 ? void 0 : _a.reduce((acc, review) => {
                    return acc + review.rating;
                }, 0);
            });
            if (totalRating !== undefined) {
                const averageRating = totalRating / ((_a = this.reviews) === null || _a === void 0 ? void 0 : _a.length);
                product.rating = averageRating;
                next();
            }
        }
    });
});
const ProductModel = (0, mongoose_1.model)('product', exports.ProductSchema);
exports.default = ProductModel;
