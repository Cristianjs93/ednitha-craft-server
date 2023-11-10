"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.createUserHandler);
router.get('/', user_controller_1.getAllUsersHandler);
router.get('/email', user_controller_1.getUserByEmailHandler);
router.put('/update', user_controller_1.updateUserHandler);
router.delete('/delete', user_controller_1.deleteUserHandler);
exports.default = router;
