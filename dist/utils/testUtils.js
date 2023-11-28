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
exports.readBuffer = exports.loginGenerator = exports.verifyAccountGenerator = exports.reviewGenerator = exports.adminAndProductGenerator = exports.userGenerator = void 0;
const faker_1 = require("@faker-js/faker");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const user_model_1 = __importDefault(require("../api/user/user.model"));
const userGenerator = (request, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = {
            email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
            name: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            password: 'Mypassword123',
            avatar: (0, exports.readBuffer)('../assets/images/fake-profile.jpg'),
            role
        }, { avatar } = _a, user = __rest(_a, ["avatar"]);
        const { body: { data: userResponse } } = yield request.post('/api/user/register')
            .set('Content-Type', 'multipart/form-data')
            .attach('avatar', avatar)
            .field(Object.assign({}, user));
        return userResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.userGenerator = userGenerator;
const adminAndProductGenerator = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = yield (0, exports.userGenerator)(request, 'ADMIN');
        yield (0, exports.verifyAccountGenerator)(email);
        const { token } = yield (0, exports.loginGenerator)(request, email);
        const _b = {
            image: (0, exports.readBuffer)('../assets/images/fake-product.jpg'),
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 }),
            category: 'doll'
        }, { image } = _b, product = __rest(_b, ["image"]);
        const { body: { data: productResponse } } = yield request.post('/api/product/create')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .attach('image', image)
            .field(Object.assign({}, product));
        return { user: email, product: productResponse._id, productImage: productResponse.image, token };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.adminAndProductGenerator = adminAndProductGenerator;
const reviewGenerator = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, product, token } = yield (0, exports.adminAndProductGenerator)(request);
        const review = {
            rating: faker_1.faker.number.int({ min: 1, max: 5 }),
            title: faker_1.faker.commerce.productAdjective(),
            comments: faker_1.faker.commerce.productDescription(),
            user,
            product
        };
        const { body: { data: reviewResponse } } = yield request.post('/api/review/create')
            .set('Authorization', `Bearer ${token}`)
            .send(review);
        return { review: reviewResponse, user, token };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.reviewGenerator = reviewGenerator;
const verifyAccountGenerator = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const update = {
        resetToken: null,
        active: true
    };
    yield user_model_1.default.findOneAndUpdate({ email }, update, { new: true });
});
exports.verifyAccountGenerator = verifyAccountGenerator;
const loginGenerator = (request, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = {
            email,
            password: password !== null && password !== void 0 ? password : 'Mypassword123'
        };
        const { body: loginResponse } = yield request.post('/api/auth/local/login').send(login);
        return loginResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.loginGenerator = loginGenerator;
const readBuffer = (relativePath) => {
    try {
        const absolutePath = path_1.default.resolve(__dirname, relativePath);
        const buffer = fs_1.default.readFileSync(absolutePath);
        return buffer;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.readBuffer = readBuffer;
