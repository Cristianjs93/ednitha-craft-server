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
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const errorHandler_1 = require("../utils/errorHandler");
const bcrypt_1 = require("../../auth/utils/bcrypt");
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(input.password);
        const newUser = Object.assign(Object.assign({}, input), { password: hashedPassword });
        const user = yield user_model_1.default.create(newUser);
        return user;
    }
    catch (error) {
        const message = (0, errorHandler_1.validatorErrorHandler)(error);
        throw new Error(message);
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        if (users === null) {
            throw new Error('Something went wrong, please try again later');
        }
        return users;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (user === null) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = data;
        const user = yield user_model_1.default.findOneAndUpdate({ email }, data, { new: true });
        if (user === null) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateUser = updateUser;
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndDelete({ email });
        if (user === null) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteUser = deleteUser;
