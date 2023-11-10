"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthcheck_1 = __importDefault(require("./api/healthcheck"));
const user_1 = __importDefault(require("./api/user"));
const routes = (app) => {
    app.use('/api/healthcheck', healthcheck_1.default);
    app.use('/api/user', user_1.default);
};
exports.default = routes;
