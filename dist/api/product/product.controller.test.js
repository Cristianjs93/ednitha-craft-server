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
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Product controller', () => {
    describe('POST /api/product', () => {
        test('Should return error: Product name is required. Product description is required', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                image: 'https://picsum.photos/100/100',
                name: '',
                description: '',
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const response = yield request.post('/api/product/create').send(product);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error creating product');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Product name is required. Product description is required');
        }));
        test('Should return error: Product name must be at least 4 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                image: 'https://picsum.photos/100/100',
                name: 'abc',
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const response = yield request.post('/api/product/create').send(product);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Product name must be at least 4 characters long');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                image: 'https://picsum.photos/100/100',
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const response = yield request.post('/api/product/create').send(product);
            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ name: product.name });
        }));
    });
    describe('GET /api/product', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/product');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Products listed');
        }));
    });
    describe('PUT /api/product/update', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                image: 'https://picsum.photos/100/100',
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const productCreateResponse = yield request.post('/api/product/create').send(product);
            const updatedProduct = {
                _id: productCreateResponse.body.data._id,
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const response = yield request.put('/api/product/update').send(updatedProduct);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.price).toEqual(parseInt(updatedProduct.price));
        }));
    });
    describe('DELETE /api/product/delete', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                image: 'https://picsum.photos/100/100',
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
            };
            const productCreateResponse = yield request.post('/api/product/create').send(product);
            const _id = productCreateResponse.body.data._id;
            const response = yield request.delete('/api/product/delete').send({ _id });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Product deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.name).toEqual(product.name);
            expect(response.body.data.description).toEqual(product.description);
        }));
    });
});
