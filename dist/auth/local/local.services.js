"use strict";
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
exports.createAuthResponse = void 0;
const auth_services_1 = require("../auth.services");
const createAuthResponse = (input) => {
    const payload = {
        _id: input._id,
        email: input.email
    };
    const token = (0, auth_services_1.signToken)(payload);
    const _a = input.toObject(), { _id, resetToken, password } = _a, profile = __rest(_a, ["_id", "resetToken", "password"]);
    return { token, profile };
};
exports.createAuthResponse = createAuthResponse;
