"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthcheck_1 = __importDefault(require("./api/healthcheck"));
const user_1 = __importDefault(require("./api/user"));
const product_1 = __importDefault(require("./api/product"));
const review_1 = __importDefault(require("./api/review"));
const local_1 = __importDefault(require("./auth/local"));
const routes = (app) => {
    app.use('/api/healthcheck', healthcheck_1.default);
    app.use('/api/user', user_1.default);
    app.use('/api/product', product_1.default);
    app.use('/api/review', review_1.default);
    app.use('/api/auth/local', local_1.default);
};
exports.default = routes;
