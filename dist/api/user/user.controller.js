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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getUserByEmailHandler = exports.getAllUsersHandler = exports.createUserHandler = void 0;
const user_services_1 = require("./user.services");
const sendGrid_1 = require("../../config/sendGrid");
const sendEmail_1 = require("../../utils/sendEmail");
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const _a = yield (0, user_services_1.createUser)(data), { resetToken } = _a, user = __rest(_a, ["resetToken"]);
        yield (0, sendGrid_1.sendMailSenGrid)((0, sendEmail_1.welcomeEmail)(user, resetToken));
        res.status(201).json({ message: 'User created successfully', data: user });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});
exports.createUserHandler = createUserHandler;
const getAllUsersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_services_1.getAllUsers)();
        res.status(200).json({ message: 'Users listed', data: users });
    }
    catch (error) {
        res.status(400).json({ message: 'Error listing users', error: error.message });
    }
});
exports.getAllUsersHandler = getAllUsersHandler;
const getUserByEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error('Please enter an email address');
        }
        const user = yield (0, user_services_1.getUserByEmail)(email);
        res.status(200).json({ message: 'User found', data: user });
    }
    catch (error) {
        res.status(400).json({ message: 'Error searching user', error: error.message });
    }
});
exports.getUserByEmailHandler = getUserByEmailHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const updatedUser = yield (0, user_services_1.updateUser)(data);
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
});
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield (0, user_services_1.deleteUser)(email);
        res.status(200).json({ message: 'User deleted successfully', data: user });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
});
exports.deleteUserHandler = deleteUserHandler;
