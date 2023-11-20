"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [4, 'Review title must be at least 4 characters long']
    },
    comments: {
        type: String,
        required: [true, 'Comments are required'],
        minlength: [4, 'Comments must be at least 4 characters long']
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Product for review is required']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User for review is required']
    }
}, {
    timestamps: true,
    versionKey: false
});
const ReviewModel = (0, mongoose_1.model)('review', exports.ReviewSchema);
exports.default = ReviewModel;
