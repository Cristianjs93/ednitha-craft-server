"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.emailRegex = exports.nameRegex = void 0;
exports.nameRegex = /^[a-zA-Z0-9-']*$/;
exports.emailRegex = /[\S]{5,10}@[a-z]{3,10}.com/;
exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
