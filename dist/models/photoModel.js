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
exports.savePhoto = void 0;
// src/models/photoModel.ts
const connection_1 = __importDefault(require("./connection")); // Импортируем объект pool
// Функция для сохранения фото
const savePhoto = (userId, id_embedding, photoBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO photos (id_face_embedding, id_user, image) VALUES ($1, $2, $3) RETURNING id_photo';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [id_embedding, userId, photoBuffer]);
    // Возвращаем ID записи
    return result.rows[0].id_photo;
});
exports.savePhoto = savePhoto;
