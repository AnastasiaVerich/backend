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
exports.findUserById = exports.findUserByNumber = exports.addUser = void 0;
// src/models/usersModel.ts
const connection_1 = __importDefault(require("./connection")); // Импортируем объект pool
// Функция для добавления пользователя
const addUser = (userId, userPhone) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO users (id_user, phone, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id_user';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [userId, userPhone]);
    // Возвращаем ID записи
    return result.rows[0].id_user;
});
exports.addUser = addUser;
// Функция для проверки существования пользователя по номеру телефона
const findUserByNumber = (userPhone) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE phone = $1) AS exists';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [userPhone]);
    // Возвращаем значение поля exists (тип данных boolean)
    return result.rows[0].exists;
});
exports.findUserByNumber = findUserByNumber;
// Функция для проверки существования пользователя по ID
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE id_user = $1) AS exists';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [userId]);
    // Возвращаем значение поля exists (тип данных boolean)
    return result.rows[0].exists;
});
exports.findUserById = findUserById;
