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
exports.sendMailSenGrid = void 0;
const dotenv_1 = require("dotenv");
const mail_1 = __importDefault(require("@sendgrid/mail"));
(0, dotenv_1.config)();
const sendMailSenGrid = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        mail_1.default.setApiKey(SENDGRID_API_KEY);
        yield mail_1.default.send(data);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.sendMailSenGrid = sendMailSenGrid;
