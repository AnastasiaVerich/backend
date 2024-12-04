"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_exist_by_id = exports.registration = void 0;
// src/controllers/userController.ts
const faceapi = __importStar(require("@vladmandic/face-api"));
const embeddingModel_1 = require("../models/embeddingModel");
const photoModel_1 = require("../models/photoModel");
const usersModel_1 = require("../models/usersModel");
const embeddingService_1 = require("../services/embeddingService");
// Загрузка моделей face-api
(0, embeddingService_1.loadModels)().catch(console.error);
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(200).send({ status: 2, text: "Нет изображения" });
        }
        const isHasSomeNumberUser = yield (0, usersModel_1.findUserByNumber)(req.body.userPhone);
        const isHasSomeIdUser = yield (0, usersModel_1.findUserById)(req.body.userId);
        if (isHasSomeNumberUser) {
            return res.status(200).send({ status: 0, text: "user_exist_number" });
        }
        if (isHasSomeIdUser) {
            return res.status(200).send({ status: 0, text: "user_exist_id" });
        }
        const detections = yield (0, embeddingService_1.detectFaces)(req.file.buffer);
        if (detections.length === 0) {
            return res.status(200).send({ status: 2, text: "Лицо не найдено" });
        }
        // Получение всех эмбеддингов из БД
        const embeddingsFromDB = yield (0, embeddingModel_1.getAllEmbedding)();
        const faceEmbedding = detections[0].descriptor;
        const matches = [];
        for (const row of embeddingsFromDB) {
            const distance = faceapi.euclideanDistance(faceEmbedding, row.embedding);
            if (distance < 0.6) {
                matches.push({ id: row.id, name: row.person_name, distance });
            }
        }
        if (matches.length > 0) {
            return res.status(200).send({ status: 0, text: "user_exist_face" });
        }
        // Вставка нового пользователя в таблицу users
        yield (0, usersModel_1.addUser)(req.body.userId, req.body.userPhone);
        // Вставка эмбеддинга в таблицу face_embeddings
        const idEmbedding = yield (0, embeddingModel_1.embeddingSave)(req.body.userId, JSON.stringify(faceEmbedding, null, 2));
        // Сохранение фото, если требуется
        if (req.body.isSavePhoto === "1") {
            yield (0, photoModel_1.savePhoto)(req.body.userId, idEmbedding, req.file.buffer);
        }
        return res.status(200).send({ status: 1, text: "success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Упс" });
    }
});
exports.registration = registration;
const check_exist_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isHasSomeIdUser = yield (0, usersModel_1.findUserById)(req.body.userId);
        if (isHasSomeIdUser) {
            return res.status(200).send({ status: 1, text: "user_exist_id" });
        }
        else {
            return res.status(200).send({ status: 0, text: "new_user_id" });
        }
    }
    catch (error) {
        return res.status(500).send({ status: 2, text: "server_error" });
    }
});
exports.check_exist_by_id = check_exist_by_id;
