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
describe('User controller', () => {
    describe('POST /api/user', () => {
        test('Should return error: Name must be at least 3 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: 'abc123@test.com',
                name: 'ab',
                password: 'Mypassword123',
                role: 'USER'
            };
            const response = yield request.post('/api/user/register').send(user);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Name must be at least 3 characters long');
        }));
        test('Should return error: Name is not valid. Email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: 'abc1@test.com',
                name: 'ab@',
                password: 'Mypassword123',
                role: 'USER'
            };
            const response = yield request.post('/api/user/register').send(user);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Name is not valid. Email is not valid');
        }));
        test('Should return error: Email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: faker_1.faker.person.firstName(),
                password: 'Mypassword123',
                role: 'USER'
            };
            const anotherUser = Object.assign({}, user);
            yield request.post('/api/user/register').send(user);
            const response = yield request.post('/api/user/register').send(anotherUser);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Email already exists');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: faker_1.faker.person.firstName(),
                password: 'Mypassword123',
                role: 'USER'
            };
            const response = yield request.post('/api/user/register').send(user);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User created successfully');
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data).toMatchObject({ name: user.name });
        }));
    });
    describe('GET /api/user', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/user');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Users listed');
        }));
    });
    describe('GET /api/user/email', () => {
        test('Should return error: User not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const email = 'example@test.com';
            const response = yield request.get('/api/user/email').send({ email });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error searching user');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('User not found');
        }));
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: faker_1.faker.person.firstName(),
                password: 'Mypassword123',
                role: 'USER'
            };
            const { email } = user;
            yield request.post('/api/user/register').send(user);
            const response = yield request.get('/api/user/email').send({ email });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User found');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.email).toEqual(email);
        }));
    });
    describe('PUT /api/user/update', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: faker_1.faker.person.firstName(),
                password: 'Mypassword123',
                role: 'USER'
            };
            const updatedUser = {
                email: user.email,
                name: 'John Doe'
            };
            yield request.post('/api/user/register').send(user);
            const response = yield request.put('/api/user/update').send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.name).toEqual(updatedUser.name);
        }));
    });
    describe('DELETE /api/user/delete', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: faker_1.faker.person.firstName(),
                password: 'Mypassword123',
                role: 'USER'
            };
            const { email } = user;
            yield request.post('/api/user/register').send(user);
            const response = yield request.delete('/api/user/delete').send({ email });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.email).toEqual(email);
        }));
    });
});
