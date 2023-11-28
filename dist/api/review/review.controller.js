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
exports.deleteReviewHandler = exports.updateReviewHandler = exports.getAllReviewsHandler = exports.createReviewHandler = void 0;
const review_services_1 = require("./review.services");
const reviewUtils_1 = require("../utils/reviewUtils");
const createReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userEmail, product: productId } = req.body;
        const validator = yield (0, reviewUtils_1.reviewValidator)(userEmail, productId);
        const { user, user: { _id }, product } = validator;
        const data = Object.assign(Object.assign({}, req.body), { user: _id });
        const review = yield (0, review_services_1.createReview)(data);
        if (typeof review._id === 'object') {
            yield (0, reviewUtils_1.reviewPopulate)(user, product, review);
        }
        res.status(201).json({ message: 'Review created successfully', data: review });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating review', error: error.message });
    }
});
exports.createReviewHandler = createReviewHandler;
const getAllReviewsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, review_services_1.getAllReviews)();
        res.status(200).json({ message: 'Reviews listed', data: reviews });
    }
    catch (error) {
        res.status(400).json({ message: 'Error listing reviews', error: error.message });
    }
});
exports.getAllReviewsHandler = getAllReviewsHandler;
const updateReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedReview = yield (0, review_services_1.updateReview)(data);
        res.status(200).json({ message: 'Review updated successfully', data: updatedReview });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating review', error: error.message });
    }
});
exports.updateReviewHandler = updateReviewHandler;
const deleteReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, product, reviewId } = req.body;
        yield (0, reviewUtils_1.reviewRemove)(user, product, reviewId);
        const review = yield (0, review_services_1.deleteReview)(reviewId);
        res.status(200).json({ message: 'Review deleted successfully', data: review });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting review', error: error.message });
    }
});
exports.deleteReviewHandler = deleteReviewHandler;
