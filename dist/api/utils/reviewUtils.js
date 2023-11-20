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
exports.reviewRemove = exports.reviewPopulate = exports.reviewValidator = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const review_model_1 = __importDefault(require("../review/review.model"));
const reviewValidator = (userEmail, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: userEmail });
        if (user === null) {
            throw new Error('User for review not found');
        }
        const product = yield product_model_1.default.findById(productId);
        if (product === null) {
            throw new Error('Product for review not found');
        }
        const duplicateReview = yield review_model_1.default.findOne({ user: user._id, product: productId });
        if (duplicateReview !== null) {
            throw new Error('Only one review per user is allowed');
        }
        return { user, product };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.reviewValidator = reviewValidator;
const reviewPopulate = (user, product, review) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        (_a = user.reviews) === null || _a === void 0 ? void 0 : _a.unshift(review._id);
        yield user.save({ validateBeforeSave: false });
        (_b = product.reviews) === null || _b === void 0 ? void 0 : _b.unshift(review._id);
        yield product.save({ validateBeforeSave: false });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.reviewPopulate = reviewPopulate;
const reviewRemove = (userEmail, productId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ email: userEmail }, {
            $pull: {
                reviews: reviewId
            }
        });
        if (user === null) {
            throw new Error('User for review not found');
        }
        const product = yield product_model_1.default.findByIdAndUpdate(productId, {
            $pull: {
                reviews: reviewId
            }
        });
        if (product === null) {
            throw new Error('Product for review not found');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.reviewRemove = reviewRemove;
