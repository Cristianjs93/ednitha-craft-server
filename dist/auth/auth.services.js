"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.verifyToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
const SECRET = process.env.JWT_SECRET;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.verifyToken = verifyToken;
const signToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, SECRET, {
            expiresIn: `${1000 * 60 * 60 * 24}`
        });
        return token;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.signToken = signToken;
