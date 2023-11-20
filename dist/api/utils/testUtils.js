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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAndProductGenerator = void 0;
const faker_1 = require("@faker-js/faker");
const userAndProductGenerator = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: faker_1.faker.internet.email({ firstName: faker_1.faker.person.firstName(), lastName: faker_1.faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
        name: faker_1.faker.person.firstName(),
        lastname: faker_1.faker.person.lastName(),
        password: 'Mypassword123',
        role: 'USER'
    };
    const product = {
        image: 'https://picsum.photos/100/100',
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        price: faker_1.faker.commerce.price({ min: 10, max: 500, dec: 0 })
    };
    const reviewUser = yield request.post('/api/user/register').send(user);
    const reviewProduct = yield request.post('/api/product/create').send(product);
    return { reviewUser: reviewUser.body.data, reviewProduct: reviewProduct.body.data };
});
exports.userAndProductGenerator = userAndProductGenerator;
