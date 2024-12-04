"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    user: 'myuser',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: (_a = Number(process.env.PORT_DB)) !== null && _a !== void 0 ? _a : 5432, // Порт может быть строкой, если переменная окружения задана
};
exports.default = dbConfig;
