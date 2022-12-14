"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../middlewares/auth.guard");
const api_1 = __importDefault(require("./api"));
const router = (0, express_1.Router)();
router.use('/api', auth_guard_1.authGuard, api_1.default);
exports.default = router;
