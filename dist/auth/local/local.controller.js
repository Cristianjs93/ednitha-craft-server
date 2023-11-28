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
exports.verifyAccountHandler = exports.loginHandler = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const user_model_1 = __importDefault(require("../../api/user/user.model"));
const local_services_1 = require("./local.services");
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (user === null) {
            throw new Error('User is not registered');
        }
        if (!user.active) {
            throw new Error('Verify your account first');
        }
        const isMatch = yield (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }
        const { token, profile } = (0, local_services_1.createAuthResponse)(user);
        res.status(200).json({ message: 'successful login', token, data: profile });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong when log in', error: error.message });
    }
});
exports.loginHandler = loginHandler;
const verifyAccountHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resetToken } = req.params;
        const updatedUser = {
            resetToken: null,
            active: true
        };
        const user = yield user_model_1.default.findOneAndUpdate({ resetToken }, updatedUser, { new: true });
        if (user === null) {
            throw new Error('Invalid token');
        }
        const { token, profile } = (0, local_services_1.createAuthResponse)(user);
        res.status(200).json({ message: 'Account successfully activated', token, data: profile });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong verifying your account', error: error.message });
    }
});
exports.verifyAccountHandler = verifyAccountHandler;
