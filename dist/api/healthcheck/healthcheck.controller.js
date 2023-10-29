"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcheckHandler = void 0;
const healthcheckHandler = (_, res) => {
    res.status(200).json({ message: 'Server ok', uptime: process.uptime() });
};
exports.healthcheckHandler = healthcheckHandler;
