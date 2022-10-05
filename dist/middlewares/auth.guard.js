"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
async function authGuard(req, res, next) {
    let headers = req.headers;
    if (!('authorization' in headers) || !headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    let token = headers.authorization.slice(7);
    try {
        req.user = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(403).json({ error: err.message });
    }
}
exports.authGuard = authGuard;
