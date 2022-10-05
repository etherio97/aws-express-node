"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const config_1 = require("./config");
const pg_1 = require("pg");
exports.db = new pg_1.Client({
    connectionString: config_1.DATABASE_URL,
});
