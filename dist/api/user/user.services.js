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
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const errorHandler_1 = require("../utils/errorHandler");
const bcrypt_1 = require("../../auth/utils/bcrypt");
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(input.password);
        const hashToken = (0, bcrypt_1.createHashToken)(input.email);
        const newUser = Object.assign(Object.assign({}, input), { resetToken: hashToken, password: hashedPassword });
        const user = yield user_model_1.default.create(newUser);
        const _a = user.toObject(), { _id, password } = _a, userWithoutId = __rest(_a, ["_id", "password"]);
        return userWithoutId;
    }
    catch (error) {
        const message = (0, errorHandler_1.validatorErrorHandler)(error);
        throw new Error(message);
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().select('-_id -password  -resetToken').populate('reviews');
        if (users === null) {
            throw new Error('Something went wrong when getting all users, please try again later');
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
        const user = yield user_model_1.default.findOne({ email }).select('-_id -password -resetToken').populate('name', 'email');
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
        const user = yield user_model_1.default.findOneAndUpdate({ email }, data, { new: true }).select('-_id -password -resetToken');
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
        const user = yield user_model_1.default.findOneAndDelete({ email }).select('-_id -password -resetToken');
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
