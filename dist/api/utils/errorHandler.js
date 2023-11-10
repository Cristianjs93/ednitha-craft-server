"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorErrorHandler = void 0;
const validatorErrorHandler = (error) => {
    const values = Object.values(error.errors);
    const message = values.map((value) => value.message);
    return message.join('. ');
};
exports.validatorErrorHandler = validatorErrorHandler;
