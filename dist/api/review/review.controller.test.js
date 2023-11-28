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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const testUtils_1 = require("../../utils/testUtils");
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Review controller', () => {
    describe('POST /api/review/create', () => {
        test('Should return error: Rating is required. Comments are required', () => __awaiter(void 0, void 0, void 0, function* () {
            const { user, product, token } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const review = {
                rating: '',
                title: faker_1.faker.commerce.productAdjective(),
                comments: '',
                user,
                product
            };
            const response = yield request.post('/api/review/create')
                .set('Authorization', `Bearer ${token}`)
                .send(review);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error creating review');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Rating is required. Comments are required');
        }));
        test('Should return error: Comments must be at least 4 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const { user, product, token } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const review = {
                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                title: faker_1.faker.commerce.productAdjective(),
                comments: 'abc',
                user,
                product
            };
            const response = yield request.post('/api/review/create')
                .set('Authorization', `Bearer ${token}`)
                .send(review);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error creating review');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Comments must be at least 4 characters long');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const { user, product, token } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const review = {
                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                title: faker_1.faker.commerce.productAdjective(),
                comments: faker_1.faker.commerce.productDescription(),
                user,
                product
            };
            const response = yield request.post('/api/review/create')
                .set('Authorization', `Bearer ${token}`)
                .send(review);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Review created successfully');
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ title: review.title });
        }));
    });
    describe('GET /api/review', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/review');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Reviews listed');
        }));
    });
    describe('PUT /api/review/update', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { review, token } = yield (0, testUtils_1.reviewGenerator)(request);
            const updatedReview = {
                _id: review._id,
                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                comments: faker_1.faker.commerce.productDescription()
            };
            const response = yield request.put('/api/review/update')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedReview);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Review updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.rating).toEqual(updatedReview.rating);
            expect(response.body.data.comments).toEqual(updatedReview.comments);
        }));
    });
    describe('DELETE /api/review/delete', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { review, user, token } = yield (0, testUtils_1.reviewGenerator)(request);
            const reviewDelete = {
                reviewId: review._id,
                user,
                product: review.product
            };
            const response = yield request.delete('/api/review/delete')
                .set('Authorization', `Bearer ${token}`)
                .send(reviewDelete);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Review deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.title).toEqual(review.title);
            expect(response.body.data.comments).toEqual(review.comments);
        }), 10000);
    });
});
