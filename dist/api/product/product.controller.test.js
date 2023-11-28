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
const app_1 = __importDefault(require("../../app"));
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const testUtils_1 = require("../../utils/testUtils");
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Product controller', () => {
    describe('POST /api/product/create', () => {
        test('Should return error: Product name is required. Product description is required', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const _a = {
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product.jpg'),
                name: '',
                description: '',
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                category: 'doll'
            }, { image } = _a, product = __rest(_a, ["image"]);
            const response = yield request.post('/api/product/create')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, product));
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error creating product');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Product name is required. Product description is required');
        }));
        test('Should return error: Product name must be at least 4 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const _b = {
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product.jpg'),
                name: 'abc',
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                category: 'doll'
            }, { image } = _b, product = __rest(_b, ["image"]);
            const response = yield request.post('/api/product/create')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, product));
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Product name must be at least 4 characters long');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const _c = {
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product.jpg'),
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                category: 'doll'
            }, { image } = _c, product = __rest(_c, ["image"]);
            const response = yield request.post('/api/product/create')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, product));
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product created successfully');
            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ name: product.name });
        }));
    });
    describe('GET /api/product', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/product?page=1&filter=all&limit=10');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Products listed');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('next');
            expect(response.body.data).toHaveProperty('result');
        }));
    });
    describe('PUT /api/product/update', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { product, productImage, token } = yield (0, testUtils_1.adminAndProductGenerator)(request);
            const _a = {
                _id: product,
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
                image: (0, testUtils_1.readBuffer)('../assets/images/fake-product2.jpg')
            }, { image } = _a, updatedProduct = __rest(_a, ["image"]);
            const response = yield request.put('/api/product/update')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', image)
                .field(Object.assign({}, updatedProduct));
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.price).toEqual(parseInt(updatedProduct.price));
            expect(response.body.data.image).not.toEqual(productImage);
        }));
    });
    describe('DELETE /api/product/delete', () => {
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
});
