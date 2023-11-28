"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formDataProccesor = void 0;
const busboy_1 = __importDefault(require("busboy"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const formDataProccesor = (req, res, next) => {
    try {
        let uploadingFile = false;
        let countFiles = 0;
        const bb = (0, busboy_1.default)({ headers: req.headers });
        req.body = {};
        const done = () => {
            if (uploadingFile)
                return;
            if (countFiles > 0)
                return;
            next();
        };
        bb.on('field', (key, val) => {
            req.body[key] = val;
        });
        ;
        bb.on('file', (key, stream) => {
            uploadingFile = true;
            countFiles++;
            const cloud = cloudinary_1.default.uploader.upload_stream({
                upload_preset: process.env.NODE_ENV === 'test'
                    ? process.env.CLOUDINARY_PRESET_TEST
                    : process.env.CLOUDINARY_PRESET
            }, (error, res) => {
                if (error !== undefined) {
                    throw new Error(error.message);
                }
                if (res !== undefined) {
                    req.body[key] = res.secure_url;
                }
                uploadingFile = false;
                countFiles--;
                done();
            });
            stream.on('data', (data) => {
                cloud.write(data);
            });
            stream.on('end', () => {
                cloud.end();
            });
        });
        bb.on('finish', () => {
            done();
        });
        req.pipe(bb);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.formDataProccesor = formDataProccesor;
