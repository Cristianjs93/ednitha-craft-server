"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("./config/express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
void (0, database_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
(0, express_2.default)(app);
(0, routes_1.default)(app);
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = server;
