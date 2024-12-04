"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db/dbConnection.ts
const pg_1 = require("pg");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Настройка подключения к базе данных
const pool = new pg_1.Pool(dbConfig_1.default);
// Экспорт объекта pool для использования в других модулях
exports.default = pool;
