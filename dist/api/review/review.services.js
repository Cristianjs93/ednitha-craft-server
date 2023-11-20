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
exports.deleteReview = exports.updateReview = exports.getAllReviews = exports.createReview = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const errorHandler_1 = require("../utils/errorHandler");
const createReview = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = Object.assign({}, input);
        const review = yield (yield review_model_1.default.create(newReview)).populate({ path: 'user', select: 'email name avatar reviews -_id' });
        const populatedReview = yield review.populate({ path: 'product', select: '-createdAt -updatedAt' });
        return populatedReview;
    }
    catch (error) {
        const message = (0, errorHandler_1.validatorErrorHandler)(error);
        throw new Error(message);
    }
});
exports.createReview = createReview;
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_model_1.default.find()
            .populate({ path: 'product', select: '-createdAt -updatedAt' })
            .populate({ path: 'user', select: 'email name avatar reviews -_id' });
        if (reviews === null) {
            throw new Error('Something went wrong when getting all reviews, please try again later');
        }
        return reviews;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getAllReviews = getAllReviews;
const updateReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = data;
        const review = yield review_model_1.default.findOneAndUpdate({ _id }, data, { new: true })
            .populate({ path: 'product', select: '-createdAt -updatedAt' })
            .populate({ path: 'user', select: 'email name avatar reviews -_id' });
        if (review === null) {
            throw new Error('Review not found');
        }
        return review;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateReview = updateReview;
const deleteReview = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_model_1.default.findOneAndDelete({ _id })
            .populate({ path: 'product', select: '-createdAt -updatedAt' })
            .populate({ path: 'user', select: 'email name avatar reviews -_id' });
        if (review === null) {
            throw new Error('Review not found');
        }
        return review;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteReview = deleteReview;
