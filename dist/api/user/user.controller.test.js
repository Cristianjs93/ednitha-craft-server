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
describe('User controller', () => {
    describe('POST /api/user/register', () => {
        test('Should return error: Name must be at least 3 characters long', () => __awaiter(void 0, void 0, void 0, function* () {
            const _a = {
                email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
                name: 'ab',
                lastname: faker_1.faker.person.lastName(),
                password: 'Mypassword123',
                avatar: (0, testUtils_1.readBuffer)('../assets/images/fake-profile.jpg'),
                role: 'USER'
            }, { avatar } = _a, user = __rest(_a, ["avatar"]);
            const response = yield request.post('/api/user/register')
                .set('Content-Type', 'multipart/form-data')
                .attach('avatar', avatar)
                .field(Object.assign({}, user));
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Name must be at least 3 characters long');
        }));
        test('Should return error: Lastname is not valid. Email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const _b = {
                email: 'abc1@test.com',
                name: faker_1.faker.person.firstName(),
                lastname: 'ab@',
                password: 'Mypassword123',
                avatar: (0, testUtils_1.readBuffer)('../assets/images/fake-profile.jpg'),
                role: 'USER'
            }, { avatar } = _b, user = __rest(_b, ["avatar"]);
            const response = yield request.post('/api/user/register')
                .set('Content-Type', 'multipart/form-data')
                .attach('avatar', avatar)
                .field(Object.assign({}, user));
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Lastname is not valid. Email is not valid');
        }));
        test('Should return error: Email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email, name, lastname, role } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            const response = yield request.post('/api/user/register')
                .set('Content-Type', 'multipart/form-data')
                .attach('avatar', (0, testUtils_1.readBuffer)('../assets/images/fake-profile.jpg'))
                .field({
                email,
                name,
                password: 'Mypassword123',
                lastname,
                role
            });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Email already exists');
        }));
        test('Should return status 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
            const _c = {
                email: faker_1.faker.internet.email({
                    firstName: faker_1.faker.person.firstName(),
                    lastName: faker_1.faker.person.lastName(),
                    provider: 'test.com',
                    allowSpecialCharacters: true
                }),
                name: faker_1.faker.person.firstName(),
                lastname: faker_1.faker.person.lastName(),
                password: 'Mypassword123',
                avatar: (0, testUtils_1.readBuffer)('../assets/images/fake-profile.jpg'),
                role: 'USER'
            }, { avatar } = _c, user = __rest(_c, ["avatar"]);
            const response = yield request.post('/api/user/register')
                .set('Content-Type', 'multipart/form-data')
                .attach('avatar', avatar)
                .field(Object.assign({}, user));
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User created successfully');
            expect(response.body.data).toMatchObject({ name: user.name });
        }));
    });
    describe('GET /api/user', () => {
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.get('/api/user')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.message).toEqual('Users listed');
        }));
    });
    describe('GET /api/user/email', () => {
        test('Should return error: User not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const searchEmail = 'example@test.com';
            const response = yield request.get('/api/user/email')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: searchEmail });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('Error searching user');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('User not found');
        }));
        test('Should return status 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'ADMIN');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.get('/api/user/email')
                .set('Authorization', `Bearer ${token}`)
                .send({ email });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User found');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.email).toEqual(email);
        }));
    });
    describe('PUT /api/user/update', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const updatedUser = {
                email,
                name: faker_1.faker.person.firstName(),
                lastname: faker_1.faker.person.lastName(),
                avatar: (0, testUtils_1.readBuffer)('../assets/images/fake-profile2.jpg')
            };
            const response = yield request.put('/api/user/update')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('avatar', updatedUser.avatar)
                .field(Object.assign({}, updatedUser));
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User updated successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.name).toEqual(updatedUser.name);
        }));
    });
    describe('DELETE /api/user/delete', () => {
        test('Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const { token } = yield (0, testUtils_1.loginGenerator)(request, email);
            const response = yield request.delete('/api/user/delete')
                .set('Authorization', `Bearer ${token}`)
                .send({ email });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toEqual('User deleted successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.email).toEqual(email);
        }));
    });
});
