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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const testUtils_1 = require("../utils/testUtils");
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('auth controller', () => {
    describe('GET /api/user', () => {
        test('Should return error: Unauthorized! You have to log in first', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/user');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Unauthorized! You have to log in first');
        }));
        test('Should return error: Invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.get('/api/user').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Invalid credentials');
        }), 10000);
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.get('/api/user').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Users listed');
        }), 10000);
    });
    describe('POST /api/product', () => {
        test('Should return error: Invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const _a = {
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product.jpg'),
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                category: 'doll'
            }, { image } = _a, product = __rest(_a, ["image"]);
            const response = yield request.post('/api/product/create')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, product));
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Invalid credentials');
        }), 10000);
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const _b = {
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product.jpg'),
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                category: 'doll'
            }, { image } = _b, product = __rest(_b, ["image"]);
            const response = yield request.post('/api/product/create')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, product));
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product created successfully');
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ name: product.name });
        }), 10000);
    });
    describe('DELETE /api/product', () => {
        test('Should return error: Invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const { product: _id } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.delete('/api/product/delete')
                .set('Authorization', `Bearer ${token}`)
                .send({ _id });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Invalid credentials');
        }), 10000);
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { product: _id, token } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const response = yield request.delete('/api/product/delete')
                .set('Authorization', `Bearer ${token}`)
                .send({ _id });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data._id).toEqual(_id);
        }), 10000);
    });
    describe('POST /api/review', () => {
        test('Should return error: Unauthorized! You have to log in first', () => __awaiter(void 0, void 0, void 0, function* () {
            const { user, product } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const review = {
                rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                title: faker_1.faker.commerce.productAdjective(),
                comments: faker_1.faker.commerce.productDescription(),
                user,
                product
            };
            const response = yield request.post('/api/review/create').send(review);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Unauthorized! You have to log in first');
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
            const response = yield request.post('/api/review/create').set('Authorization', `Bearer ${token}`).send(review);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Review created successfully');
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ title: review.title });
        }), 10000);
    });
    describe('DELETE /api/review', () => {
        test('Should return error: Unauthorized! You have to log in first', () => __awaiter(void 0, void 0, void 0, function* () {
            const { review, user } = yield (0, testUtils_1.reviewGenerator)(request);
            const reviewDelete = {
                reviewId: review._id,
                user,
                product: review.product
            };
            const response = yield request.delete('/api/review/delete').send(reviewDelete);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Unauthorized! You have to log in first');
        }), 10000);
        test('Should return status 200 Ok', () => __awaiter(void 0, void 0, void 0, function* () {
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
