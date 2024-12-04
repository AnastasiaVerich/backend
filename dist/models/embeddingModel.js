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
exports.getEmbeddingByUserId = exports.getAllEmbedding = exports.embeddingSave = void 0;
// src/models/embeddingModel.ts
const connection_1 = __importDefault(require("./connection")); // Импортируем объект pool
const embeddingSave = (userId, findFirstFace) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO face_embeddings (id_user, embedding, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id_face_embedding';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [userId, findFirstFace]);
    // Возвращаем ID записи
    return result.rows[0].id_face_embedding;
});
exports.embeddingSave = embeddingSave;
const getAllEmbedding = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM face_embeddings';
    // Выполнение запроса
    const result = yield connection_1.default.query(query);
    // Преобразование результатов запроса и возвращение
    return result.rows.map((el) => ({
        person_name: el.person_name, // Убираем расширение из имени файла
        id: el.id, // Можно заменить на уникальный идентификатор
        embedding: Object.values(el.embedding), // Преобразуем эмбеддинг в массив
    }));
});
exports.getAllEmbedding = getAllEmbedding;
const getEmbeddingByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM face_embeddings WHERE id_user = $1';
    // Выполнение запроса
    const result = yield connection_1.default.query(query, [userId]);
    // Преобразование результатов запроса и возвращение
    return result.rows.map((el) => ({
        person_name: el.person_name, // Убираем расширение из имени файла
        id: el.id, // Можно заменить на уникальный идентификатор
        embedding: Object.values(el.embedding), // Преобразуем эмбеддинг в массив
    }));
});
exports.getEmbeddingByUserId = getEmbeddingByUserId;
