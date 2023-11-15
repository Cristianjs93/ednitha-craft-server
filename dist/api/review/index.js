"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router.post('/create', review_controller_1.createReviewHandler);
router.get('/', review_controller_1.getAllReviewsHandler);
router.put('/update', review_controller_1.updateReviewHandler);
router.delete('/delete', review_controller_1.deleteReviewHandler);
exports.default = router;
