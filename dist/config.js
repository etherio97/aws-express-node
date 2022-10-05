"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DATABASE_URL = exports.PORT = void 0;
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000;
exports.DATABASE_URL = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : 'postgresql://postgres:postgres@localhost:5432/postgres';
exports.JWT_SECRET = process.env.JWT_SECRET;
