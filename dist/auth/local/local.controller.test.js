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
const mongoose_1 = __importDefault(require("mongoose"));
const testUtils_1 = require("../../utils/testUtils");
const request = (0, supertest_1.default)(app_1.default);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Local controller', () => {
    describe('POST /api/auth/local/login', () => {
        test('Should return error: User is not registered', () => __awaiter(void 0, void 0, void 0, function* () {
            const login = {
                email: 'random@test.com',
                password: 'Mypassword123'
            };
            const response = yield request.post('/api/auth/local/login').send(login);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('User is not registered');
        }));
        test('Should return error: Verify your account first', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield (0, testUtils_1.userGenerator)(request, 'USER');
            const login = {
                email: user.email,
                password: 'RandomPassword123'
            };
            const response = yield request.post('/api/auth/local/login').send(login);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Verify your account first');
        }));
        test('Should return error: Incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const login = {
                email,
                password: 'RandomPassword123'
            };
            const response = yield request.post('/api/auth/local/login').send(login);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual('Incorrect password');
        }));
        test('Should return status 200 Ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = yield (0, testUtils_1.userGenerator)(request, 'USER');
            yield (0, testUtils_1.verifyAccountGenerator)(email);
            const login = {
                email,
                password: 'Mypassword123'
            };
            const response = yield request.post('/api/auth/local/login').send(login);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.email).toEqual(email);
        }));
    });
});
