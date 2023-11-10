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
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const regex_1 = require("../utils/regex");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [regex_1.nameRegex, 'Name is not valid'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [15, 'Name must be at most 15 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [regex_1.emailRegex, 'Email is not valid'],
        validate: [{
                validator: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    try {
                        const user = (_a = (yield mongoose_1.models.user.findOne({ email: value }))) !== null && _a !== void 0 ? _a : null;
                        return user === null;
                    }
                    catch (error) {
                        return false;
                    }
                }),
                message: 'Email already exists'
            }]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [regex_1.passwordRegex, 'Password is not valid']
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: [true, ' Role is required'],
        enum: { values: ['ADMIN', 'USER'], message: '{VALUE} role is not supported' }
    },
    active: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
const UserModel = (0, mongoose_1.model)('user', exports.userSchema);
exports.default = UserModel;
