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
exports.hasRole = exports.isAuthenticated = void 0;
const user_services_1 = require("../api/user/user.services");
const auth_services_1 = require("./auth.services");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (token === undefined) {
            throw new Error('Unauthorized! You have to log in first');
        }
        const decoded = (0, auth_services_1.verifyToken)(token);
        if (decoded === null) {
            throw new Error('Token not decoded');
        }
        const user = yield (0, user_services_1.getUserByEmail)(decoded.email);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong, please try again', error: error.message });
    }
});
exports.isAuthenticated = isAuthenticated;
const hasRole = (rolesAllowed) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { role } = req.user;
            const hasPermission = rolesAllowed.includes(role);
            if (!hasPermission) {
                throw new Error('Invalid credentials');
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: 'Something went wrong, please try again', error: error.message });
        }
    });
};
exports.hasRole = hasRole;
